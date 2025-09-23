---
tags: ["JavaScript", "Higher-Kinded-Types", "Demo", "Scala", "Functional-Programming"]
draft: false
---

# Experimenting with higher-kinded types in JavaScript
I’ve spent several years working heavily with Scala.  I’ve particularly liked how it provides type-safe support of higher-kinded types.  These types let you operate on generic shapes containing other shapes.  Lists, asynchronous types, and optional types are all examples of types that can be operated on in a higher abstraction.  I love working with Scala, but it is losing a ton of popularity and now feels like the right time to redirect my focus to another language ecosystem.

JavaScript is a language which I doubt will lose any popularity in the next 20 years.  Everyone **needs** JavaScript (whether they like it or not) to do just about anything on the web and it’s gained a lot of traction for building all sorts of applications beyond just web pages.  A quick tangent, but I’d really like to have more long-term job stability from the languages that I spend a lot of time with.  It’s true that Scala is a great language that helped me build some amazing projects.  It’s also true that I won’t be getting a Scala job anytime in the near future.  Bummer!

In Scala I can write a function which operates on some generic type containing a single type “hole”.  A list of items fits this description nicely.  The list itself is a collection containing items of some other type.  Most strictly-typed languages let you work on types with generic customizations, like lists containing a generic element type.  But Scala takes this idea a step further.  Instead of abstracting over the inner components of a type, you can abstract over the shape of the type itself.  For example, I might want to change the value of every single element of a particular collection.  Like dividing every element by two or appending a newline character to every string.  This functionality can be written without references to the collection types themselves in Scala using the following code:
```scala
import cats.implicits._

def add1ToAll[F[_]](stuff: F[Int])(using Monad[F]): F[Int] =
  stuff.map(_ + 1)

add1ToAll(List(1, 2, 3, 4)) // List(2, 3, 4, 5)
```

Even better, if I want to work on any number type that has the ability to add 1:
```scala
import cats.implicits._

def add1ToAll[F[_], N](stuff: F[N])(using N: Number[N]): F[N] =
  stuff.map(n => N.add(n, 1))

add1ToAll(List(1, 2, 3, 4), _ + _) // List(2, 3, 4, 5)
add1ToAll(List(1L, 2L, 3L, 4L, _ + _) // List(2L, 3L, 4L, 5L)
```

In Scala, this is pretty standard stuff.  You don’t need to be too familiar with any of the code above to understand the general idea of what’s happening: I have a type named “F” which has a characteristic called “Monad” (allows modifying inner elements) and I’m changing every element the “stuff” has access to by increasing the value by one.

This `add1ToAll` function could now be applied to any type which contains number elements: asynchronous processes, lists, dictionaries with string keys, optional values, and much more.

Most languages don’t have support for defining the types that are being used in these functions. As far as I know, Scala and Haskell are the only two with really good support for higher-kinded type programming.  However, there’s nothing stopping us from building this functionality in other languages, especially in JavaScript where well-defined “types” don’t actually exist at all.

This lead me to writing a small module I named “veggies” (a reference to a blog I read a long time ago [Write code. Not too much. Mostly functions.](https://www.brandons.me/blog/write-code-not-too-much-mostly-functions)).  This module contains some useful tools for writing “generic” code without needing to know specific names or fields for every supported type.

To start, I made some basic helper functions that I knew would come in handy.  Feel free to skip over these:
```javascript
// This is needed for common nullability checks.
function empty(value) {
  return value === null || value === undefined;
}

// I'll need this later on, checks for an array being an array and non-empty
function nonemptyArray(value) {
  return !empty(value) && !empty(value.length) && value.length > 0;
}

// I'll be passing around a lot of functions.  It's always
// nice to know a function is a function before I try to call it.
function isFn(value) {
  return typeof value === "function";
}
```

A tool I always relied on while writing Scala code is the `Either` type.  At its core, `Either` let me define values that can be in one of two different states: `Left` or `Right`.  Most often, I used it to represent a result that could be successful or raise an error.  I want a similar type in JavaScript.  Since JavaScript doesn’t provide a union type in its standard toolbox, I have to rely on the concept of “tagged unions” for defining my `Result` type.
```javascript
function ok(ok) {
  return {
    ok: ok,
  };
}

function isOK(value) {
  return !empty(value) && value.ok !== undefined;
}

function error(error) {
  return {
    error: error,
  };
}

function isError(value) {
  return !empty(value) && value.error !== undefined;
}
```

Now whenever I want to return an error from a function, I can wrap it in an `error` function to allow my upstream user to decide how to handle it later on.  This might seem convoluted compared to using exceptions and try-catch mechanics, but it’s a useful pattern to start using as I’ll begin to compose multiple operations together.  The other important part of this structure is that I’ve now created a type that fills the “single generic hole” characteristic.  I’ll refer to this type going forward as a “monad”.  This is a mathematical and unnecessarily fancy term, but it’s short and easy to reference.  A monad provides two important functionalities: values can be wrapped in the monad’s context (create a list from a single value, for example) and a monad can be operated on using a function which returns another value in the monad context (start with a result type and perform a second step which also returns a result).  Just about every post I have on my site contains me thinking through what monads are and how to explain them in different ways.  Definitely check out my post from a while back talking about type classes and other fun stuff at [Typeclasses and Ad-Hoc Polymorphism](https://www.brandenvennes.com/2021/06/22/typeclass-and-ad-hoc-polymorphism#monad).

The result type I’ve defined above is a monad because values can always become results (wrap the value in `ok()`) and results can be operated on using an additional function (if the first result is `ok` then run another function returning a result by using the `.ok` field as the argument).  These two functions provide a surprising amount of utility and extensibility in our functional code when composed together with other functions.

To add support for using monads, I’ll first write a function which wraps values of any kind in a monad context.  I’m going to call this function `apply` because it “applies” the monad context to the value.
```javascript
// listing all the possible errors that could occur
// these can be referenced by function callers to see what error occurred
const applyErrors = {
  emptyTypeclassInstance:
    "Expected 'monadTypeclass' argument to 'apply' to be non-empty.",
  emptyValue: "Expected 'value' argument for 'apply' to be non-empty.",
  notMonadInstance: (keys) => {
    const keysJson = JSON.stringify(
      keys,
    );
    return `Expected 'monadTypeclass' argument to 'apply' to be a Monad typeclass (needs 'apply' and 'flatMap' functions).  Got an object with keys '${keysJson}'.`;
  },
};

// defines the generic function that can wrap any value into any monad instance
export function apply(monadTypeclass, value) {
  if (empty(monadTypeclass)) {
    throw new Error(applyErrors.emptyTypeclassInstance);
  }

  if (empty(value)) {
    throw new Error(applyErrors.emptyValue);
  }

  const applyFn = monadTypeclass.apply;

  if (empty(applyFn) || !isFn(applyFn)) {
    throw new Error(applyErrors.notMonadInstance(Object.keys(monadTypeclass)));
  }

  return applyFn(value);
}
```

I wrote a lot of validation logic since JavaScript gives me no guarantees on what kind of arguments I might receive when this function is called.  It’s a trade-off of JavaScript, but something I can work with.  Adding all the checks ensures that the actual functionality will be called using the arguments and shapes I’d expect: an instance of a monad type class and a value.

I chose to have each block in the validation steps throw an exception instead of return the `error` type.  This makes it a lot easier to chain together steps that are likely to be successful.  If I returned the `Result` monad from my function instead, I’d end up with a lot of nested types, which leads to a lot of confusion and type errors.

Another common type in Scala is the `Option` type.  An `Option` encodes the behavior of a value existing or not existing.  Basically a type-safe version of `null`.

The implementation in JavaScript using “tagged unions” looks a lot like the `Result` implementation.  I’ll even add a function which converts from `Result` to `Option`.

```javascript
function some(some) {
  return {
    some: some,
  };
}

function isSome(value) {
  return !empty(value) && value.some !== undefined;
}

const none = { none: null };

function isNone(value) {
  return !empty(value) && value.none === null;
}

function option(value) {
  if (empty(value)) {
    return none;
  } else {
    return some(value);
  }
}

function getOrElse(value, alt) {
  if (isSome(value)) {
    return value.some;
  }

  return alt;
}

// converts from a Result type to an option type
// uses Some when the Result is OK
function okOption(value) {
  if (isOK(value)) {
    return some(value.ok);
  }

  return none;
}

// converts from a Result type to an option type
// uses Some when the Result is Error
function errorOption(value) {
  if (isError(value)) {
    return some(value.error);
  }

  return none;
}
```

This type is a more “safe” alternative to using `null` values and provides many of the same usages of `null`.  If a field is optional, it can be referenced using the safe `Option` functions.

With the useful `Option` functions available, I’ll now go back to expanding on my monad functions with two new additions: `flatMap` and `map`.
```javascript
const flatMapErrors = {
  emptyTypeclassInstance:
    "Expected 'monadTypeclass' argument to 'flatMap' to be non-empty.",
  emptyValue: "Expected 'value' argument for 'flatMap' to be non-empty.",
  emptyFunction: "Expected 'fn' argument for 'flatMap' to be non-empty.",
  invalidFunction: "Expected 'fn' argument for 'flatMap' to be a function.",
  notMonadInstance: (keys) => {
    const keysJson = JSON.stringify(
      keys,
    );
    return `Expected 'monadTypeclass' argument to 'flatMap' to be a Monad typeclass (needs 'apply' and 'flatMap' functions).  Got an object with keys '${keysJson}'.`;
  },
};

function flatMap(value, monadTypeclass, fn) {
  if (empty(monadTypeclass)) {
    throw new Error(flatMapErrors.emptyTypeclassInstance);
  }

  if (empty(value)) {
    throw new Error(flatMapErrors.emptyValue);
  }

  if (empty(fn)) {
    throw new Error(flatMapErrors.emptyFunction);
  }

  if (!isFn(fn)) {
    throw new Error(flatMapErrors.invalidFunction);
  }

  const flatMapFn = monadTypeclass.flatMap;

  if (empty(flatMapFn) || !isFn(flatMapFn)) {
    throw new Error(
      flatMapErrors.notMonadInstance(Object.keys(monadTypeclass)),
    );
  }

  return flatMapFn(value, fn);
}

const mapErrors = {
  emptyValue: "Expected 'value' argument for 'map' to be non-empty.",
  emptyTypeclassInstance:
    "Expected 'monadTypeclass' argument to 'map' to be non-empty.",
  emptyFunction: "Expected 'fn' argument for 'map' to be non-empty.",
  notMonadInstance: (keys) => {
    const keysJson = JSON.stringify(
      keys,
    );
    return `Expected 'monadTypeclass' argument to 'map' to be a Monad typeclass (needs 'apply' and 'flatMap' functions).  Got an object with keys '${keysJson}'.`;
  },
};

function map(value, monadTypeclass, fn) {
  if (empty(value)) {
    throw new Error(mapErrors.emptyValue);
  }

  if (empty(monadTypeclass)) {
    throw new Error(mapErrors.emptyTypeclassInstance);
  }

  if (empty(fn)) {
    throw new Error(mapErrors.emptyFunction);
  }

  const applyFn = monadTypeclass.apply;
  const flatMapFn = monadTypeclass.flatMap;

  if (empty(applyFn) || empty(flatMapFn) || !isFn(applyFn) || !isFn(flatMapFn)) {
    throw new Error(mapErrors.notMonadInstance(Object.keys(monadTypeclass)));
  }

  const output = flatMapFn(
    value,
    (x) => applyFn(fn(x)),
  );

  return output;
}
```

The `flatMap` implementation follows the pattern I used when implementing the general `apply` method.  I first do a bunch of validation and eventually call into the `flatMap` defined on the provided monad object.

The `map` implementation is a bit more interesting, not much, but there’s something extra going on.  I’m first calling the function the user provides for modifying the value in the context, then I’m lifting that value into the context itself.  This is all happening inside the monad context by using the monad’s `flatMap` function.  If this function was operating on a list, you could think of it as first separating all the elements, then changing each one, then making a bunch of tiny one-element lists, and finally gluing them all back together.

Finally, I’m going to add two additional composed methods called `flatten` and `foreach`.  The `flatten` function lets me combine nested structures together, like a list of list, or a result containing a result.  The `foreach` function acts a lot like the `foreach` method on JavaScript arrays, but it works on `Result` and `Option` types as well!

```javascript
const flattenErrors = {
  emptyValue: "Expected 'value' argument for 'flatten' to be non-empty.",
  emptyMonadInstance:
    "Expected 'monadTypeclass' argument for 'flatten' to be non-empty.",
  notMonadInstance: (keys) => {
    const keysJson = JSON.stringify(
      keys,
    );
    return `Expected 'monadTypeclass' argument to 'flatten' to be a Monad typeclass (needs 'apply' and 'flatMap' functions).  Got an object with keys '${keysJson}'.`;
  },
};

function flatten(value, monadTypeclass) {
  if (empty(value)) {
    throw new Error(flattenErrors.emptyValue);
  }

  if (empty(monadTypeclass)) {
    throw new Error(flattenErrors.emptyMonadInstance);
  }

  const flatMapFn = monadTypeclass.flatMap;

  if (empty(flatMapFn) || !isFn(flatMapFn)) {
    throw new Error(
      flattenErrors.notMonadInstance(Object.keys(monadTypeclass)),
    );
  }

  return flatMapFn(value, (x) => x);
}

const foreachErrors = {
  emptyValue:
    "Expected 'value' argument to 'foreach' function to be non-empty.",
  emptyMonadInstance:
    "Expected 'monadTypeclass' argument to 'foreach' function to be non-empty.",
  emptyFunction:
    "Expected 'fn' argument to 'foreach' function to be non-empty.",
  invalidFunction: (got) => {
    const gotText = JSON.stringify(got);
    return `Expected 'fn' argument to 'foreach' function to be a function type.  Got '${gotText}'.`;
  },
  invalidMonadTypeclass: (keys) => {
    const keysText = JSON.stringify(keys);

    return `Expected Monad typeclass instance argument for 'foreach' function to have function keys 'apply' and 'flatMap'.  Got object with '${keysText}'.`;
  },
};

function foreach(value, monadTypeclass, fn) {
  if (empty(value)) {
    throw new Error(foreachErrors.emptyValue);
  }

  if (empty(monadTypeclass)) {
    throw new Error(foreachErrors.emptyMonadInstance);
  }

  if (empty(fn)) {
    throw new Error(foreachErrors.emptyFunction);
  }

  if (!isFn(fn)) {
    throw new Error(foreachErrors.invalidFunction);
  }

  const flatMapFn = monadTypeclass.flatMap;
  const applyFn = monadTypeclass.apply;

  if (
    empty(flatMapFn) || empty(applyFn) || !isFn(flatMapFn) || !isFn(applyFn)
  ) {
    throw new Error(
      foreachErrors.invalidMonadTypeclass(Object.keys(monadTypeclass)),
    );
  }

  return flatMapFn(
    value,
    (x) => {
      fn(x);
      return applyFn({});
    },
  );
}
```

The `flatten` function only needs access to the Monad’s `flatMap` function, and instead of changing the inner elements using `flatMap`, we are just returning the initial value.  Using our list example once more, this would be like separating the list out into individual elements and gluing these individual elements all together.  Since the individual elements are all lists themselves, they can be glued together without any additional changes.

The `foreach` function operates a lot like `map`, but the result of executing the provided function is discarded instead of returned.  This function is particularly nice when the current state should only be logged if a value in an `Option` type exists.

Now this is all neat and fun, but how can these functions actually improve my code?  Well first off, I’ll need to make Monad instances for the types I’m interested in: `Result` and `Option`.
```javascript
// list possible errors that could happen when trying to flatMap a result
const resultFlatMapErrors = {
  invalidResultInput: (x) => {
    const inputJSON = JSON.stringify(x);
    return `Expected 'value' argument for Result 'flatMap' function to be a Result type (ok or error keys).  Got '${inputJSON}'.`;
  },
};

const resultMonad = {
  apply: (x) => ok(x),
  flatMap: (x, fn) => {
    if (isOK(x)) {
      const output = fn(x.ok);
      return output;
    } else if (isError(x)) {
      return x;
    } else {
      return error(resultFlatMapErrors.invalidResultInput(x));
    }
  },
};

const optionMonad = {
  apply: (x) => some(x),
  flatMap: (x, fn) => {
    if (isSome(x)) {
      return fn(x.some);
    } else {
      return none;
    }
  },
};
```

These two instances define the logic I talked about a little earlier: general values need to be able to be pulled into a context and a mechanism must be available for changing the elements in the context.

With these two instances available, I can put together an example project!  I’ll use a contrived example of a spaceship launch system.  The launch system has two state validation steps.  Both of these steps returns a `Result` and the launch is successful only when there are no errors with the validations.

```javascript
function validateFuel(ship) {
  if (empty(ship)) {
    return error("No ship information provided!");
  }

  if (empty(ship.fuel)) {
    return error("No ship fuel information provided!");
  }

  if (ship.fuel < 20) {
    return error("Ship fuel is critically low!");
  }

  return ok(ship.fuel);
}

function validateCrew(ship, needs) {
  if (empty(ship)) {
    return error("No ship information provided!");
  }

  if (empty(ship.crew)) {
    return error("No ship crew information provided!");
  }

  const needsOption = option(needs);

  const neededCrew = getOrElse(needsOption, 0);

  if (ship.crew < neededCrew) {
    return error(
      `Not enough crew! Need ${neededCrew} members. Only have ${ship.crew}.`,
    );
  }

  return ok(ship.crew);
}

const ship = {
  fuel: 100,
  crew: 50,
};

const neededCrew = 30;

const fuelValid = validateFuel(ship);
const fuelError = errorOption(fuelValid);
const crewValid = validateCrew(ship, neededCrew);
const crewError = errorOption(crewValid);

foreach(
  fuelError,
  optionMonad,
  (error) => {
    console.log("Invalid fuel. Can't launch. " + error);
  },
);

foreach(
  crewError,
  optionMonad,
  (error) => {
    console.log("Invalid crew! Can't launch. " + error);
  },
);

if (isSome(fuelError) || isSome(crewError)) {
  console.log("Aborting launch!");
} else {
  flatMap(
    fuelValid,
    resultMonad,
    (fuel) =>
      flatMap(
        crewValid,
        resultMonad,
        (crew) => {
          console.log(`Fuel at ${fuel}%.`);
          console.log(`${crew} crew members on board.`);
          console.log("Go for launch!");
          return ok({});
        },
      ),
  );
}

```

Tweaking the `ship` state and `neededCrew` number alters the results and logging messages.  With the current values, the following will be logged:
```text
Fuel at 100%.
50 crew members on board.
Go for launch!
```
When the fuel level is changed to `10%`:
```text
Invalid fuel. Can't launch. Ship fuel is critically low!
Aborting launch!
```
And finally, when the needed crew is set to 100:
```text
Invalid fuel. Can't launch. Ship fuel is critically low!
Invalid crew! Can't launch. Not enough crew! Need 100 members. Only have 50.
Aborting launch!
```

It works!  It’s alive!

This is a really great start and there’s even more that I could do with this foundation.  I could add a function `combine` which takes two monad values of the same type and combines them together into a list within the same monad context.  This would allow composing two different values together before performing a step.  I could also add a function `ifElse` which performs one of two branches based on a `boolean` value stored in a monad context.  The sky is really the limit from here!  I might even explore adding additional type-classes, like `Traverse`, `Semigroup`, or `Recursion` which could be combined with `Monad` to implement even more behaviors.  And of course, nesting `flatMap` operations gets pretty ugly.  It would be nice to be able to chain them together somehow!

As always, thanks for reading and I’ll see you next time!
