# Zero To Functional Scala

A quickstart guide to the Scala 3 language.

## Defining Functions

Functions let us define re-usable sections of functionality that can be modified using parameters.

We can define functions in two ways in Scala: using `def` or using `val`.

A function definition contains four components: the name, the parameters, the return type, and the body.

The following function definition uses `def` to define a function named `myFunction` that takes two parameters,
`firstParam` and `secondParam`, and returns a `Bool` when `firstParam` is `"hello"` and `secondParam` is `0`.

```scala
def myFunction(firstParam: String, secondParam: Int): Bool =
  firstParam == "hello" && secondParam > 0
```

## Types

Types can be defined in several ways depending on use-case.
I'll go over the basic types you'll want to use most-often and leave the rest for you to find.

### Case Class

In general, `case class` should be your go-to type.
A `case class` can be used to define an immutable type with automatic pattern matching built in and
several other goodies.

```scala mdoc
case class MyType(myString: String, myInt: Int, myBool: Boolean)
```

Although case classes can contain related functionality, it is best to avoid adding logic if possible.
In functional programming, types should be independent of the logic that can be used to operate on them.

Where should the logic go then for a `case class`?

#### Companion Objects and Extensions

A companion object is a singleton type containing helpful operations to perform on the accompanying type.

```scala mdoc
object MyType:
  def make(s: String, i: Int, b: Boolean): Option[MyType] =
    if s.isEmpty then None
    else Some(MyType(s, i, b))
```

## Higher Order Functions

Functions are values and can be provided to other functions as parameters and to types as properties.

```scala mdoc
def combineStrings(myList: List[String]): String =
  myList.mkString(" ")
  
def splitAndApply(input: String, splitOn: String, f: List[String] => String): String =
    f(input.split(splitOn).toList)
    
splitAndApply("hello/world", "/", combineStrings) // "hello world"
```

## Additional Resources

The official Scala-Lang documentation site contains everything from this post and more.

https://docs.scala-lang.org/getting-started/index.html

Rock The JVM is an amazing set of tutorials and guides to learning pieces of the Scala language.
I learned most of my fundamental knowledge on Scala from Daniel Ciocirlan's courses.

https://rockthejvm.com/
https://www.youtube.com/@rockthejvm
https://www.udemy.com/user/daniel-ciocirlan/
