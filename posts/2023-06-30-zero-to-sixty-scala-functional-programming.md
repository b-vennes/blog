---
tags: ["Functional-Programming", "Scala"]
draft: false
---

# Zero To Sixty: Scala Functional Programming

A quick-start guide to the Scala 3 programming language.

This guide won’t include steps to set-up a Scala build environment locally, so I encourage you to follow along using [Scastie](https://scastie.scala-lang.org/), an online Scala integrated development environment (IDE).  Scastie makes it easy to add library dependencies and get code written and tested quickly.  Scala can be a hassle to install successfully and I’d much prefer to get you right into coding.  If you are interested in setting up a Scala environment then I’ll have some helpful resources at the bottom of the page.

## Functions

Functions let us define re-usable blocks of expressions and statements that can be modified using parameters. We can define functions in two ways: using the `def` or `val` keywords. A function definition contains four components: the name, the parameters, the return type, and the body.

The following snippet contains an example function defined in either style.

```scala mdoc
def myFunction(parameter1: String, parameter2: Int): Boolean =
  parameter1 == "example" || parameter2 == 100

// or
val myFunctionValue: (String, Int) => Boolean = (parameter1, parameter2) =>
  parameter1 == "example" || parameter2 == 100
```

All function parameters must have a provided type like `String` and `Int` for `parameter1` and `parameter2` above.  Although not required, the return type should also be provided, like `Boolean`.

In general, the `def` syntax is preferred because it’s less verbose, but you’ll find reasons to use either one.

The `//` syntax from the snippet means that any comments on the same line and to the right are not compiled as Scala code.

### Higher Order Functions

Functions are also values and can be provided to other functions as parameters and to types as fields.  Function values can be called the same way you would a function defined with `def` or `val`.

```scala mdoc
def combineStrings(myList: List[String]): String =
  myList.mkString(" ")
  
def splitAndApply(input: String, splitOn: String, f: List[String] => String): String =
  f(input.split(splitOn).toList)
    
splitAndApply("hello/world", "/", combineStrings) // "hello world"
```

This example defines a function `combineStrings` that places spaces between each text in the provided list `myList`.  Another function named splitAndApply will split the given `input` text any time the given `splitOn` text appears in `input`.  After splitting, the new list of split phrases is provided to the given function `f` which determines how to re-join the split phrases.  Finally, `splitAndApply` is called with an example text `hello/world`  and the splitting symbol `/`.  The function `combineStrings` is provided as a value to the `splitAndApply` method to combine the split phrases using a space.  Altogether, this example yields the text `hello world`.

## Types

Types can be defined in several ways depending on the use-case.  I'll go over the basic constructs you'll want to use most-often and leave the rest for you to find as you need them.

### Standard Library Types And Collections

The following types are automatically provided by the standard library and can be used without additional imports.  There’s many more than this list available to you, but these are a good place to start.

- `Int` — a number negative or positive
- `Boolean` — `true` or `false`
- `String` — a list of characters representing text, like `“carrots”`
- `Double` — a double-precision floating point number, something like `101.111`
- `Option` — an optional value with two cases `Some(value)` and `None`
- `Either` — a value with two cases `Left` and `Right` with types for each case
- `List` — a collection of items with a provided type, instantiated with the syntax `List(1, 2, 3, 4)`
- `Map` — a collection of one-to-one key and value pairs, instantiated using a special function/syntax `Map("a" -> 1, "b" -> 2")`

### Case Classes

In general, the `case class` should be your go-to type for constructing data. A `case class` can be used to define an immutable type with automatic pattern matching built-in and several other goodies.

```scala mdoc
case class Videogame(title: String, year: Int, platforms: List[String])
```

This snippet creates a new type called `Videogame` with the fields `title`, `year`, and `platforms`.  Each field must have a type assigned to it.  A new instance of `Videogame` can be created with the format of `Videogame(”Mario Kart 8 Deluxe”, 2014, List(”Switch”))`.

Although case classes can contain related functionality in the form of functions and other values, it is best to avoid adding logic beyond it’s basic fields if possible.  In functional programming, types should be independent of the logic that can be used to operate on them.  However, there is sometimes logic that is vital to the domain of the type regardless of context.  When you have a function that will almost always be called on a type when the type is used, place it in the body of the `case class`.

For example, the following code contains another `case class` with a method.

```scala mdoc
case class Car(make: String, model: String) {
  def show: String = s"Car { make: $make, model: $model } "
}
```

The method can then conveniently be called using the code `Car("Toyota”, “GR86”).show` yielding a nice visual representation `“Car { make: Toyota, model: GR86 }”`.  The `s` operator used in the snippet is a little bit of magic called [string interpolation](https://docs.scala-lang.org/overviews/core/string-interpolation.html) that is commonly used for formatting text.

### Opaque Types

Often it’s convenient to use types from the standard library and dependency libraries directly in your code. For example, `String`, `List`, and `Map`.  However, there is a downside.  Your library or app code now has a direct dependency on that type and can’t be changed.  I encourage you instead to try and use the `opaque type`. Opaque types let you mask an existing type with your own symbol, thus allowing you to modify the underlying type implementation without affecting your provided interface.

For example, the following snippet contains an opaque type representing a list of names. The only functions I’ve provided for this new type are `getLastNames`, `getFirstNames`, and `show`. If in the future I decide that I don’t want to use a list of tuples to represent my names, then clients of my library won’t be affected (including my own downstream code).

```scala mdoc
opaque type Names = List[(String, String)]

def firstNames(names: Names): List[String] =
  names.map(_._1)

def lastNames(names: Names): List[String] =
  names.map(_._2)

def show(names: Names): String =
  names
    .map(name => s"${name._2}, ${name._1}")
    .mkString("\n")
```

It may be that in the future I’ve decided to change the type of `Names` from `List[(String, String)]`  to `List[Name]` where `Name` is defined as `case class Name(first: String, second: String)`.  Downstream code will not see any impact from the underlying type change.

### Sealed Traits

Complex union abstract data types can be created using the `sealed trait` syntax.  A sealed trait defines the root of a type tree with a finite number of cases.  An example of a union type common to every programming language is the `Boolean` type. The following code defines a custom `Boolean2` tree.  I've added a `2` post-fix to the type definitions to avoid colliding with the standard library `Boolean` type.

```scala mdoc
sealed trait Boolean2
case class True() extends Boolean2
case class False() extends Boolean2

val trueValue: Boolean2 = True()
val falseValue: Boolean2 = False()
```

Many types you encounter will be defined using the `sealed trait` with `case class` structure.  Here’s another example, a functional linked list.  As in the union example, I've added a `2` post-fix to all the types to avoid type collisions with the `List` type from the standard library.

```scala mdoc
sealed trait List2[A]
case class Empty2[A]() extends List2[A]
case class NonEmpty2[A](head: A, tail: List2[A]) extends List2[A]

val emptyList: List2[Int] = Empty2()
val nonEmptyList: List2[Int] = NonEmpty2(1, NonEmpty2(2, Empty2()))
```

This `List2` snippet defines a list that can have two cases:

- `Empty2` — the list is empty and contains no values
- `NonEmpty2` — the list has at least one item (the head) and may contain more items (the tail)
    - The tail of the `NonEmpty` list can then either be `Empty` or `NonEmpty`. And the pattern repeats itself.

## Enums

Another way to define a union type is as an `enum`. Enums are especially useful when you have a simple union type with no recursion. The `Boolean2` example from earlier can be re-written in a simpler form using `enum`.

```scala mdoc
enum BooleanAsEnum {
  case True()
  case False()
}
```

The only difference between the `enum` and `sealed trait` syntax is that enum types can’t be used to define higher-order types like `List` and are intended only for simple type enumerations.  In general, it’s best practice to use enums unless you need your root type to contain type parameters like `List`.

## Companion Objects

A companion object is a singleton type containing helpful operations to perform on the accompanying type.  The best functions for a companion object are constructors that create new instances of the accompanying type, often with some domain validation.  These constructors can have any name you’d like, but common names are `make` or `create`.  There is also a special companion function `apply` that can be defined and called as if instantiating the type directly.

```scala mdoc
object Videogame {
  def make(title: String, year: Int, platforms: List[String]): Option[Videogame] =
    if title.isEmpty then None
    else Some(Videogame(title, year, platforms))

  def apply(title: String, year: Int): Videogame =
    Videogame(title, year, List.empty[String])
}

// `make` function now available on `Videogame` type
val granTurismo: Option[Videogame] = Videogame.make("Gran Turismo 7", 2022, List("PS5"))

val unreleased: Option[Videogame] = Videogame.make("", 2025, List.empty[String])

// equivalent to Videogame.apply
val diablo: Videogame = Videogame("Diablo", 2023)
```

The above snippet defines two additional constructors to the `Videogame` type, `make` and `apply`.  The `make` constructor performs some additional validation on the provided parameters and returns a `None` value if the input is invalid.  The `apply` method lets callers provide just the `title` and `year` of the videogame and provides a default of `List.empty[String]` for the `platforms` field.  Providing additional `apply` functions in a companion object can be a convenient way to provide common defaults for users.  In general, the `apply` method should always return just the companion type and not any validation-related type like `Option` or `Either`.

## Pattern Matching

Values can be deconstructed and matched using the `match` and `case` syntax.  Matching can be especially helpful for determining the particular union or enumeration sub-case that a value represents.  For example, we can match on our `List2` snippet to perform a different step depending on if the list is empty or contains items.

```scala mdoc
def isEmpty[A](list: List2[A]): Boolean =
  list match {
    case Empty2() => true
    case NonEmpty2(_, _) => false
  }
```

In the above snippet, we use the `_` syntax to ignore particular values of the match.  We can also provide local names for fields of the matched case.

```scala mdoc
def sum(list: List2[Int]): Int =
  list match {
    case Empty2() => 0
    case NonEmpty2(first, remaining) => first + sum(remaining)
  }
```

This snippet uses pattern matching to define a recursive function which calculates the sum of the list.  If the list contains items, we add the value of the first item to the sum of the remaining items.  If the list is empty, then we default to the value `0`.

## Typeclasses

Typeclasses define a set of standard functionality for a category of types. For example, you may want a function that operates on any collection of items without needing duplicated logic for each collection that users need. This example is common in functional programming, but is more in-depth than what we’ve seen so far.

```scala mdoc
trait Collection[F[_]] {
  extension [A](collection: F[A])
    def modifyItems[B](f: A => B): F[B]
}

given Collection[List] with
  extension [A](list: List[A])
    def modifyItems[B](f: A => B): List[B] = list.map(f)

given Collection[Option] with
  extension [A](option: Option[A])
    def modifyItems[B](f: A => B): Option[B] =
      option match {
        case Some(item) => Some(f(item))
        case None => None
      }

extension [F[_]](collection: F[Int])(using Collection[F])
  def addOneToAllItems: F[Int] =
    collection.modifyItems((item: Int) => item + 1)

List(1, 2, 3).addOneToAllItems

extension (option: Option[Int])
  def addOne: Option[Int] = option.addOneToAllItems

Some(1).addOne
None.addOne
```

The `Collection` typeclass above requires that implementations provide the logic for the `modifyItems` function.  The `F[_]` syntax specifies that overriding types must have a single type parameter, where the `_` is a placeholder for the collection’s item type.  The placeholder `F` type can then be used when defining the required functions for `Collection` instances.  The `extension` syntax is used to define functions on types that can be used as if they were defined on the types themselves.  Any type with a `Collection` instance in scope automatically has the `modifyItems` function available.  In the case of the snippet above, we could write `List(1, 2, 3, 4).modifyItems(num ⇒ num + 2)`  to update the list to contain all elements with `2` added.

In order to use the `Collection` syntax on various types, typeclass instances need to be defined using `given … with` syntax.  Instances have been defined in the snippet for `List` and `Option` types.  Although they are very different types with different shapes, they both contain collections of items.  The case of a `List` might be more clear than with `Option`, but an `Option` is a collection of zero or one item.  If the `Option` contains no item (`None`) then the item doesn’t need to be transformed by the `modifyItems` function.  If it contains a single item (`Some`) then it will be modified by the function value provided to `modifyItems`.

Finally, the `addOneToAllItems` function extends any type with a `Collection` instance to include the function as a new method on any values of the collection type.  With `Collection` instances available for both `List` and `Option`, we can call `addOneToAllItems` on both types without needing to explicitly define the extensions for both `List` and `Option`.  I've defined a special extension method `addOne` for the `Option[Int]` type because typeclasses are only available for the specific types that have instances.  The `Collection` typeclass must be invoked with the `Option` trait instead of using the `Some` and `None` sub-types.

Typeclasses are powerful tools for abstracting common and repetitious operations to many different kinds of types.  Even a small typeclass with one function, like `Collection`, can be used as a base to build more complex functions across many types.

## Additional Resources

This post has only begun to scratch the surface of the syntax and structures available in Scala programs, though the ones I’ve gone through provide a strong platform that should allow you to write many types of programs and applications.  I recommend tinkering with the structures discussed here first and then expanding your knowledge using the following resources as you wish to do more in your programs.

### Scala-Lang Docs

The official Scala-Lang documentation site contains everything from this post and more.

- [https://docs.scala-lang.org/getting-started/](https://docs.scala-lang.org/getting-started/)

### SDK-Man

Manages JDK instances on your computer and allows changing JDKs on the fly.  There are many versions and distributions available, but any of the v17 JDKs are good choices for basic programs.

- [https://sdkman.io/](https://sdkman.io/)

### Rock The JVM

Rock The JVM is an amazing set of tutorials and guides to learning pieces of the Scala language. I learned most of my fundamental knowledge on Scala from Daniel Ciocirlan's courses.

- [https://rockthejvm.com/](https://rockthejvm.com/)
- [https://www.youtube.com/@rockthejvm](https://www.youtube.com/@rockthejvm) [https://www.udemy.com/user/daniel-ciocirlan/](https://www.udemy.com/user/daniel-ciocirlan/)

### This Week In Scala

A weekly newsletter rounding up all the new library improvements, releases, and news from the week.  The newsletter is a good way to keep up to date with what’s happening in the community.

- [https://medium.com/tag/thisweekinscala](https://medium.com/tag/thisweekinscala)
