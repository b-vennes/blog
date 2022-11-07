---
title: Typeclasses and Ad-Hoc Polymorphism
tags: ["Functional-Programming", "Scala", "Software-Architecture"]
category: "test"
date: 2021-06-22
draft: false
---

Typeclasses are a construct for declaring categorical behavior on types in the Haskell programming language, however,
the concept is not restricted to just Haskell.  The typeclass is an implementation of ad-hoc polymorphism, which
unlike with interface or class inheritance, allows us to define polymorphic behavior on the fly.

Typeclasses provide an abstraction by defining interfaces and the *values* that implement them.  In most
object-oriented languages, interfaces are defined using direct inheritance from a child type to a parent type.
Instead of operating on the class level, typeclasses define an interface, then instantiate the implementation in the
form of a value.  This allows flexibility with interface implementation, since the typeclass instances can be
interchanged through function parameters and package imports. With typeclasses, library consumers have the ability to
extend the functionality of types without modifying the source.

A typeclass consists of some generic interface and an implementation for a particular type.  The type can be any
representation of a value (ex. `int`, `String`, `Person`, `Vehicle`...) and the value itself can be anything.  The most
important part of a typeclass is that the implementation exists seperately from the implementation of the value itself
and can be used like a value.

### Typeclass Implementations Across Languages

For the following implementation examples, we will be implementing the
[Semigroup](https://typelevel.org/cats/typeclasses/semigroup.html) typeclass on `int`, `string`, and `list` types.

Semigroup defines a single `combine` function that takes two instances of type `T` as inputs and outputs their combined
value.

For example, calling `combine` with the integers `4` and `6` should return `10` if we are using addition as the
`combine` implementation (we could also implement this for multiplication).

As an example of how typeclasses can be used within a library, I'll also be creating a function `applyTo` that will
combine each value in a list with a given value. For the input `List(1, 2, 3, 4, 5)`, `applyTo` with a value of `8`
would return `List(9, 10, 11, 12, 13)`.

It is an implicit requirement that a `Semigroup`'s combine operation also be associative: combining a
group of values can occur in any order as in `(1 + 2) + 3 = 1 + (2 + 3)`. However, this is not a possible restriction in
most programming languages, so it will not be factored into these examples.

#### Scala

Although there is not first-class support for typeclasses in Scala, there are language constructs to help create them.

We first create a trait representing our `Semigroup` typeclass, then create a typeclass instance representing integer
addition, and finally create a function which implicitly takes a typeclass instance as a parameter.  The `implicit`
keyword in Scala 2 lets us create a value in the implicit scope and summon it when the typeclass is requested.

```scala mdoc
trait Semigroup[T] {
    def combine(a: T, b: T): T
}

implicit val intAdditionSemigroup: Semigroup[Int] = (a: Int, b: Int) => a + b

def applyTo[A](values: List[A], value: A)(implicit semigroup: Semigroup[A]): List[A] =
    values.map(v => semigroup.combine(v, value))

applyTo(List(1, 2, 3, 4, 5), 8)
```

#### C#

Typeclasses in C# require some creativity because anonymous objects aren't a thing.  To access typeclass instances, we
will provide an `instance` static method which returns a singleton typeclass instance.  Although this will make it
difficult to use the `Semigroup<T>` typeclass in a generic context, it makes the code a little bit neater.

```csharp
public interface Semigroup<T>
{
    T Combine(T a, T b);
}

public class IntAdditionSemigroup : Semigroup<int>
{
    public static IntSemigroup instance = new IntSemigroup();

    public int Combine(int a, int b) = a + b;
}

public List<T> ApplyTo<T>(Semigroup<T> instance, List<T> values, T value)
{
    return values.Select(v => instance.combine(v, value));
}

ApplyTo(IntAdditionSemigroup.instance, new List<int> { 1, 2, 3, 4, 5 }, 8);
```

Note that because C# has no equivalent of the implicit scope found in Scala, the semigroup instance must be provided
directly to the `ApplyTo` function.

#### Typescript

Typescript's implementation is a little neater, but also requires passing the semigroup instance directly because an
`implicit` scope doesn't exist. Typescript *does* support instantiating anonymous objects, which makes creating the
typeclass instances simple.

```typescript
interface Semigroup<T> {
    combine(a: T, b: T): T
}

const numberAdditionSemigroup = {
    combine(a: number, b: number): number {
        return a + b
    }
} as Semigroup<number>

function combineAll<T>(instance: Semigroup<T>, values: T[], value: T): T[] {
    return values.map(v => instance.combine(v, value))
}

combineAll(numberAdditionSemigroup, [1, 2, 3, 4, 5], 8)
```

#### Rust

Rust supports Ad-Hoc polymorphism out of the box since the implementation of interfaces for types must be defined
separately from the types themselves.  The `trait` implementations in Rust act just like typeclass definitions with an
accompying `impl` block for instance definitions.

I've made the `Semigroup` typeclass receive the values `a` and `b` by reference so that we don't have to take ownership
of the values, which makes it easier to work with.

```rust
trait Semigroup {
    fn combine(a: &Self, b: &Self) -> Self;
}

impl Semigroup for i32 {
    fn combine(a: &i32, b: &i32) -> i32 {
        a + b
    }
}

fn apply_to<T>(values: Vec<T>, value: T) -> Vec<T> where T: Semigroup {
    values.iter().map(|v| { T::combine(&v, &value) } ).collect()
}

apply_to(vec![1, 2, 3, 4, 5], 8)
```

We do not have the option to provide multiple implementations of `Semigroup` for `i32` within the same scope, so any
additional implementations of `combine` (multiplication) would have to be placed in a separate scope and imported.

### Helpful Typeclasses

There are a number of common typeclasses that can be combined to implement similar behavior across all implementing
types.  `Semigroup`, `Eq`, and `Show` are simple typeclasses, but more complex ones like `Monoid`, `Monad`, and
`Functor` can provide a lot of additional functionality.

I will be implmenting the following examples with Scala, but symmetric implementations can be made for C#, Typescript,
and Rust using the methods outlined in our `Semigroup` example.

#### Eq

`Eq` provides a typesafe equals method `eqv`.  `Eq` should be used when we want to check that the value of two
values with the same type is the same.  Calling `eqv` with two values of different types should fail to compile.

```scala mdoc
trait Eq[T] {
    def eqv(a: T, b: T): Boolean
}
```

Because we provide a function that determines if two values are equal, we also get a function determining if two
values are not equal for free.

```scala mdoc
object Eq {
    def neqv[T](a: T, b: T)(implicit eq: Eq[T]): Boolean = !eq.eqv(a, b)
}
```

For implementing `neqv` I've created a companion class which takes an implicit `Eq` instance. The `neqv` method can
also be defined in the `Eq` trait itself.

Then in our library, we can use our type-safe `Eq` implementation instead of the `==` which can vary in accuracy
depending on type.

```scala mdoc
def combineIfNotEqual[T](a: T, b: T, otherwise: T)(implicit eq: Eq[T], semigroup: Semigroup[T]): T =
    if (Eq.neqv(a, b)) semigroup.combine(a, b)
    else otherwise
```

#### Show

`Show` provides a method to get an explicit function for turning a value into a `String` type.  This is very helpful
when we want to print the state of a complex object to the console without having to override any existing toString
method directly on the type implementation.  Also, when a function wants to print the value of a generic type to the
console, it can use its `Show` implementation instead of relying on the built-in `toString` method to be correct. Often,
the default `toString` method will print out garbage, expecially for complex class instances in the JVM.

```scala mdoc
trait Show[T] {
    def show(value: T): String
}
```

Then, when we want to do some debugging from a function we write, we can require an explicit `Show` implementation
which the function caller provides.

```scala mdoc
implicit val showInt: Show[Int] = (value: Int) => s"Integer($value)" // ex. Integer(5)

def print[T](value: T)(implicit show: Show[T]): Unit = println(show.show(value))

print(500)
```

For a more complex object, this can save us a lot of headache.

```scala mdoc
class PersonWithRandomAge(val first: String, val last: String) {
  private val random = scala.util.Random

  val age = random.nextInt(100)
}

implicit val showPerson: Show[PersonWithRandomAge] = (person: PersonWithRandomAge) =>
  s"Person(name: ${person.last}, ${person.first}, age: ${person.age})"
```

Even better, with some help from the Scala Cats library, we can use this implementation when we have a collection of
people without any extra work. We just have to be sure to implement the `cats.Show` trait instead of our custom `Show` trait.

```scala mdoc
import cats.implicits._

implicit val catsShowPerson: cats.Show[PersonWithRandomAge] = (person: PersonWithRandomAge) =>
  s"Person(name: ${person.last}, ${person.first}, age: ${person.age})"

val people: List[PersonWithRandomAge] = List(new PersonWithRandomAge("Kup", " Quickdew"), new PersonWithRandomAge("Hellweed", "Underhill"))

people.show
```

#### Monoid

The `Monoid` typeclass is an extension of `Semigroup` with an additional method `empty` that returns a value
representing the default state of non-existence.  For integers, this value would be `0` or for strings `""`.

It is often helpful to extend the functionality of one typeclass with that of another.
We can expand on our previous `Semigroup` trait to implement `Monoid`.

```scala mdoc:reset
trait Semigroup[T] {
  def combine(a: T, b: T): T
}

trait Monoid[T] extends Semigroup[T] {
  def empty: T
}
```

Any implementation of `Monoid` can be used where a `Semigroup` is required.
This comes in handy when we want to fold over a collection of values.

```scala mdoc
implicit val intAdditionMonoid: Monoid[Int] = new Monoid[Int] {
    override def combine(a: Int, b: Int): Int = a + b
    override def empty: Int = 0
}

def combineAll[T](values: List[T])(implicit monoid: Monoid[T]) =
    values.foldLeft(monoid.empty)(monoid.combine)

combineAll(List(1, 2, 3, 4, 5)) // 15
```

#### Functor

The `Functor` typeclass defines a `map` method from type `A` to type `B` so that a `Functor[A]` can be mapped to a
`Functor[B]` type.  This is loosely related to the mathematical definition of a `Functor` `F` which defines a
mapping from a set `A` to a set `B` such that `F[idA] -> F[idB]` and `F[g * f] -> F[g] * F[f]`.  In this definition,
the identity element `idA` depends on the identity of the the category (`0` for integer addtion and `1` for integer
multiplication) and `g` and `f` are functions applied to the element contained in `F`.  For example, if `g(x) = x + 1`
and `f(x) = x + 5`, then `F[g(f(3))]` must be equal to `F[g(3)] + F[f(3)]`.

For the typeclass definition of `Functor`, we are going to take advantage of Scala's ability to define generic type
arguments with a number of "holes".  For example, `Functor[F[_]]` defines a `Functor` type for a generic argument named
`F` that itself has a single type argument.  In most languages, this restriction will not be possible, which can make
defining this `Functor` type tricky.

In our example, I will use `Option` as the `Functor` argument.  `Option` in Scala contains a previously defined `map`
method, but I will instead show how the implementation works using just `Some` and `None` case classes.

I'm also adding an additional `Functor` object with a summoner function which pulls the given implicit functor out
of the `implicit` scope.  This will let us call the `Functor` map function directly.

```scala mdoc
trait Functor[F[_]] {
    def map[A, B](functorA: F[A], mapping: A => B): F[B]
}

object Functor {
    // summoner function
    def apply[F[_]](implicit functor: Functor[F]): Functor[F] = functor
}

implicit val optionFunctor: Functor[Option] = new Functor[Option] {
    override def map[A, B](functorA: Option[A], mapping: A => B): Option[B] =
        functorA match {
            case Some(a) => Some(mapping(a))
            case None => None
        }
}

Functor[Option].map[Int, Int](Some(50), x => x * 10)
Functor[Option].map[Int, Int](None, x => x * 10)
```

#### Monad

The `Monad` typeclass is an extension on the `Functor` typeclass which provides a `flatten` function.  The `flatten`
function squashes a value of type `F[F[_]]` into `F[_]`.  Once defined, we can combine `flatten` and `map` to create
`flatMap`, which works like `map` except it takes in a function of type `A => F[B]` instead of `A => B` and returns
the type `F[B]`.

```scala mdoc
trait Monad[F[_]] extends Functor[F] {
  def flatten[A](nestedFunctorA: F[F[A]]): F[A]

  def flatMap[A, B](functorA: F[A], mapping: A => F[B]): F[B] = flatten(map(functorA, mapping))
}

implicit val listMonad: Monad[List] = new Monad[List] {
  override def map[A, B](functorA: List[A], mapping: A => B): List[B] = functorA match {
    case head :: tail => mapping(head) :: map(tail, mapping)
    case _ => List()
  }

  override def flatten[A](nestedFunctorA: List[List[A]]): List[A] = nestedFunctorA match {
    case head :: tail => head ++ flatten(tail)
    case _ => List()
  }
}

object Monad {
  // summoner function
  def apply[F[_]](implicit monad: Monad[F]): Monad[F] = monad
}

Monad[List].map(List(100, 5, 22), (x: Int) => x * 5)

Monad[List].flatten(List(List(1, 3, 4), List(9, 18, 0)))

Monad[List].flatMap(List(1, 2, 3, 4), (x: Int) => List(x % 2, x % 3))
```

## Conclusion

Typeclasses are a flexible and functional approach to abstraction and generic programming.  They are type-safe, modular,
and simple to test and relieve many headaches software developers encounter with common behaviors on types.
