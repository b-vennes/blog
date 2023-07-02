"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[829],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var r=a.createContext({}),p=function(e){var t=a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(r.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,r=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(n),u=i,h=c["".concat(r,".").concat(u)]||c[u]||m[u]||o;return n?a.createElement(h,l(l({ref:t},d),{},{components:n})):a.createElement(h,l({ref:t},d))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=c;var s={};for(var r in t)hasOwnProperty.call(t,r)&&(s[r]=t[r]);s.originalType=e,s.mdxType="string"==typeof e?e:i,l[1]=s;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5965:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const o={tags:["Functional-Programming","Scala"],draft:!1},l="Zero To Sixty: Scala Functional Programming",s={permalink:"/2023/06/30/zero-to-sixty-scala-functional-programming",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-06-30-zero-to-sixty-scala-functional-programming.md",source:"@site/blog/2023-06-30-zero-to-sixty-scala-functional-programming.md",title:"Zero To Sixty: Scala Functional Programming",description:"A quick-start guide to the Scala 3 programming language.",date:"2023-06-30T00:00:00.000Z",formattedDate:"June 30, 2023",tags:[{label:"Functional-Programming",permalink:"/tags/functional-programming"},{label:"Scala",permalink:"/tags/scala"}],readingTime:13.26,hasTruncateMarker:!1,authors:[],frontMatter:{tags:["Functional-Programming","Scala"],draft:!1},nextItem:{title:"Building A Blog With Scala Mdoc And Docusaurus",permalink:"/2022/11/07/building-a-blog"}},r={authorsImageUrls:[]},p=[{value:"Functions",id:"functions",level:2},{value:"Higher Order Functions",id:"higher-order-functions",level:3},{value:"Types",id:"types",level:2},{value:"Standard Library Types And Collections",id:"standard-library-types-and-collections",level:3},{value:"Case Classes",id:"case-classes",level:3},{value:"Opaque Types",id:"opaque-types",level:3},{value:"Sealed Traits",id:"sealed-traits",level:3},{value:"Enums",id:"enums",level:2},{value:"Companion Objects",id:"companion-objects",level:2},{value:"Pattern Matching",id:"pattern-matching",level:2},{value:"Typeclasses",id:"typeclasses",level:2},{value:"Additional Resources",id:"additional-resources",level:2},{value:"Scala-Lang Docs",id:"scala-lang-docs",level:3},{value:"SDK-Man",id:"sdk-man",level:3},{value:"Rock The JVM",id:"rock-the-jvm",level:3},{value:"This Week In Scala",id:"this-week-in-scala",level:3}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A quick-start guide to the Scala 3 programming language."),(0,i.kt)("p",null,"This guide won\u2019t include steps to set-up a Scala build environment locally, so I encourage you to follow along using ",(0,i.kt)("a",{parentName:"p",href:"https://scastie.scala-lang.org/"},"Scastie"),", an online Scala integrated development environment (IDE).  Scastie makes it easy to add library dependencies and get code written and tested quickly.  Scala can be a hassle to install successfully and I\u2019d much prefer to get you right into coding.  If you are interested in setting up a Scala environment then I\u2019ll have some helpful resources at the bottom of the page."),(0,i.kt)("h2",{id:"functions"},"Functions"),(0,i.kt)("p",null,"Functions let us define re-usable blocks of expressions and statements that can be modified using parameters. We can define functions in two ways: using\xa0the ",(0,i.kt)("inlineCode",{parentName:"p"},"def"),"\xa0or\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"val")," keywords. A function definition contains four components: the name, the parameters, the return type, and the body."),(0,i.kt)("p",null,"The following snippet contains an example function defined in either style."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'def myFunction(parameter1: String, parameter2: Int): Boolean =\n  parameter1 == "example" || parameter2 == 100\n\n// or\nval myFunctionValue: (String, Int) => Boolean = (parameter1, parameter2) =>\n  parameter1 == "example" || parameter2 == 100\n// myFunctionValue: Function2[String, Int, Boolean] = repl.MdocSession$MdocApp$$Lambda$8656/703235573@7f793c8\n')),(0,i.kt)("p",null,"All function parameters must have a provided type like ",(0,i.kt)("inlineCode",{parentName:"p"},"String")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Int")," for ",(0,i.kt)("inlineCode",{parentName:"p"},"parameter1")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"parameter2")," above.  Although not required, the return type should also be provided, like ",(0,i.kt)("inlineCode",{parentName:"p"},"Boolean"),"."),(0,i.kt)("p",null,"In general, the ",(0,i.kt)("inlineCode",{parentName:"p"},"def")," syntax is preferred because it\u2019s less verbose, but you\u2019ll find reasons to use either one."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"//")," syntax from the snippet means that any comments on the same line and to the right are not compiled as Scala code."),(0,i.kt)("h3",{id:"higher-order-functions"},"Higher Order Functions"),(0,i.kt)("p",null,"Functions are also values and can be provided to other functions as parameters and to types as fields.  Function values can be called the same way you would a function defined with ",(0,i.kt)("inlineCode",{parentName:"p"},"def")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"val"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'def combineStrings(myList: List[String]): String =\n  myList.mkString(" ")\n  \ndef splitAndApply(input: String, splitOn: String, f: List[String] => String): String =\n  f(input.split(splitOn).toList)\n    \nsplitAndApply("hello/world", "/", combineStrings) // "hello world"\n// res0: String = "hello world"\n')),(0,i.kt)("p",null,"This example defines a function ",(0,i.kt)("inlineCode",{parentName:"p"},"combineStrings")," that places spaces between each text in the provided list ",(0,i.kt)("inlineCode",{parentName:"p"},"myList"),".  Another function named splitAndApply will split the given ",(0,i.kt)("inlineCode",{parentName:"p"},"input")," text any time the given ",(0,i.kt)("inlineCode",{parentName:"p"},"splitOn")," text appears in ",(0,i.kt)("inlineCode",{parentName:"p"},"input"),".  After splitting, the new list of split phrases is provided to the given function ",(0,i.kt)("inlineCode",{parentName:"p"},"f")," which determines how to re-join the split phrases.  Finally, ",(0,i.kt)("inlineCode",{parentName:"p"},"splitAndApply")," is called with an example text ",(0,i.kt)("inlineCode",{parentName:"p"},"hello/world"),"  and the splitting symbol ",(0,i.kt)("inlineCode",{parentName:"p"},"/"),".  The function ",(0,i.kt)("inlineCode",{parentName:"p"},"combineStrings")," is provided as a value to the ",(0,i.kt)("inlineCode",{parentName:"p"},"splitAndApply")," method to combine the split phrases using a space.  Altogether, this example yields the text ",(0,i.kt)("inlineCode",{parentName:"p"},"hello world"),"."),(0,i.kt)("h2",{id:"types"},"Types"),(0,i.kt)("p",null,"Types can be defined in several ways depending on the use-case.  I'll go over the basic constructs you'll want to use most-often and leave the rest for you to find as you need them."),(0,i.kt)("h3",{id:"standard-library-types-and-collections"},"Standard Library Types And Collections"),(0,i.kt)("p",null,"The following types are automatically provided by the standard library and can be used without additional imports.  There\u2019s many more than this list available to you, but these are a good place to start."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Int")," \u2014 a number negative or positive"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Boolean")," \u2014 ",(0,i.kt)("inlineCode",{parentName:"li"},"true")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"false")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"String")," \u2014 a list of characters representing text, like ",(0,i.kt)("inlineCode",{parentName:"li"},"\u201ccarrots\u201d")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Double")," \u2014 a double-precision floating point number, something like ",(0,i.kt)("inlineCode",{parentName:"li"},"101.111")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Option")," \u2014 an optional value with two cases ",(0,i.kt)("inlineCode",{parentName:"li"},"Some(value)")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"None")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Either")," \u2014 a value with two cases ",(0,i.kt)("inlineCode",{parentName:"li"},"Left")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"Right")," with types for each case"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"List")," \u2014 a collection of items with a provided type, instantiated with the syntax ",(0,i.kt)("inlineCode",{parentName:"li"},"List(1, 2, 3, 4)")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Map")," \u2014 a collection of one-to-one key and value pairs, instantiated using a special function/syntax ",(0,i.kt)("inlineCode",{parentName:"li"},'Map("a" -> 1, "b" -> 2")'))),(0,i.kt)("h3",{id:"case-classes"},"Case Classes"),(0,i.kt)("p",null,"In general, the\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"case class"),"\xa0should be your go-to type for constructing data. A\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"case class"),"\xa0can be used to define an immutable type with automatic pattern matching built-in and several other goodies."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"case class Videogame(title: String, year: Int, platforms: List[String])\n")),(0,i.kt)("p",null,"This snippet creates a new type called ",(0,i.kt)("inlineCode",{parentName:"p"},"Videogame")," with the fields ",(0,i.kt)("inlineCode",{parentName:"p"},"title"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"year"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"platforms"),".  Each field must have a type assigned to it.  A new instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"Videogame")," can be created with the format of ",(0,i.kt)("inlineCode",{parentName:"p"},"Videogame(\u201dMario Kart 8 Deluxe\u201d, 2014, List(\u201dSwitch\u201d))"),"."),(0,i.kt)("p",null,"Although case classes can contain related functionality in the form of functions and other values, it is best to avoid adding logic beyond it\u2019s basic fields if possible.  In functional programming, types should be independent of the logic that can be used to operate on them.  However, there is sometimes logic that is vital to the domain of the type regardless of context.  When you have a function that will almost always be called on a type when the type is used, place it in the body of the ",(0,i.kt)("inlineCode",{parentName:"p"},"case class"),"."),(0,i.kt)("p",null,"For example, the following code contains another ",(0,i.kt)("inlineCode",{parentName:"p"},"case class")," with a method."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'case class Car(make: String, model: String) {\n  def show: String = s"Car { make: $make, model: $model } "\n}\n')),(0,i.kt)("p",null,"The method can then conveniently be called using the code ",(0,i.kt)("inlineCode",{parentName:"p"},'Car("Toyota\u201d, \u201cGR86\u201d).show')," yielding a nice visual representation ",(0,i.kt)("inlineCode",{parentName:"p"},"\u201cCar { make: Toyota, model: GR86 }\u201d"),".  The ",(0,i.kt)("inlineCode",{parentName:"p"},"s")," operator used in the snippet is a little bit of magic called ",(0,i.kt)("a",{parentName:"p",href:"https://docs.scala-lang.org/overviews/core/string-interpolation.html"},"string interpolation")," that is commonly used for formatting text."),(0,i.kt)("h3",{id:"opaque-types"},"Opaque Types"),(0,i.kt)("p",null,"Often it\u2019s convenient to use types from the standard library and dependency libraries directly in your code. For example, ",(0,i.kt)("inlineCode",{parentName:"p"},"String"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"List"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"Map"),".  However, there is a downside.  Your library or app code now has a direct dependency on that type and can\u2019t be changed.  I encourage you instead to try and use the ",(0,i.kt)("inlineCode",{parentName:"p"},"opaque type"),". Opaque types let you mask an existing type with your own symbol, thus allowing you to modify the underlying type implementation without affecting your provided interface."),(0,i.kt)("p",null,"For example, the following snippet contains an opaque type representing a list of names. The only functions I\u2019ve provided for this new type are ",(0,i.kt)("inlineCode",{parentName:"p"},"getLastNames"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"getFirstNames"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"show"),". If in the future I decide that I don\u2019t want to use a list of tuples to represent my names, then clients of my library won\u2019t be affected (including my own downstream code)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'opaque type Names = List[(String, String)]\n\ndef firstNames(names: Names): List[String] =\n  names.map(_._1)\n\ndef lastNames(names: Names): List[String] =\n  names.map(_._2)\n\ndef show(names: Names): String =\n  names\n    .map(name => s"${name._2}, ${name._1}")\n    .mkString("\\n")\n')),(0,i.kt)("p",null,"It may be that in the future I\u2019ve decided to change the type of ",(0,i.kt)("inlineCode",{parentName:"p"},"Names")," from ",(0,i.kt)("inlineCode",{parentName:"p"},"List[(String, String)]"),"  to ",(0,i.kt)("inlineCode",{parentName:"p"},"List[Name]")," where ",(0,i.kt)("inlineCode",{parentName:"p"},"Name")," is defined as ",(0,i.kt)("inlineCode",{parentName:"p"},"case class Name(first: String, second: String)"),".  Downstream code will not see any impact from the underlying type change."),(0,i.kt)("h3",{id:"sealed-traits"},"Sealed Traits"),(0,i.kt)("p",null,"Complex union abstract data types can be created using the ",(0,i.kt)("inlineCode",{parentName:"p"},"sealed trait")," syntax.  A sealed trait defines the root of a type tree with a finite number of cases.  An example of a union type common to every programming language is the ",(0,i.kt)("inlineCode",{parentName:"p"},"Boolean")," type. The following code defines a custom ",(0,i.kt)("inlineCode",{parentName:"p"},"Boolean2")," tree.  I've added a ",(0,i.kt)("inlineCode",{parentName:"p"},"2")," post-fix to the type definitions to avoid colliding with the standard library ",(0,i.kt)("inlineCode",{parentName:"p"},"Boolean")," type."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"sealed trait Boolean2\ncase class True() extends Boolean2\ncase class False() extends Boolean2\n\nval trueValue: Boolean2 = True()\n// trueValue: Boolean2 = True()\nval falseValue: Boolean2 = False()\n// falseValue: Boolean2 = False()\n")),(0,i.kt)("p",null,"Many types you encounter will be defined using the ",(0,i.kt)("inlineCode",{parentName:"p"},"sealed trait")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"case class")," structure.  Here\u2019s another example, a functional linked list.  As in the union example, I've added a ",(0,i.kt)("inlineCode",{parentName:"p"},"2")," post-fix to all the types to avoid type collisions with the ",(0,i.kt)("inlineCode",{parentName:"p"},"List")," type from the standard library."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"sealed trait List2[A]\ncase class Empty2[A]() extends List2[A]\ncase class NonEmpty2[A](head: A, tail: List2[A]) extends List2[A]\n\nval emptyList: List2[Int] = Empty2()\n// emptyList: List2[Int] = Empty2()\nval nonEmptyList: List2[Int] = NonEmpty2(1, NonEmpty2(2, Empty2()))\n// nonEmptyList: List2[Int] = NonEmpty2(\n//   head = 1,\n//   tail = NonEmpty2(head = 2, tail = Empty2())\n// )\n")),(0,i.kt)("p",null,"This ",(0,i.kt)("inlineCode",{parentName:"p"},"List2")," snippet defines a list that can have two cases:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Empty2")," \u2014 the list is empty and contains no values"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"NonEmpty2")," \u2014 the list has at least one item (the head) and may contain more items (the tail)",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The tail of the ",(0,i.kt)("inlineCode",{parentName:"li"},"NonEmpty")," list can then either be ",(0,i.kt)("inlineCode",{parentName:"li"},"Empty")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"NonEmpty"),". And the pattern repeats itself.")))),(0,i.kt)("h2",{id:"enums"},"Enums"),(0,i.kt)("p",null,"Another way to define a union type is as an ",(0,i.kt)("inlineCode",{parentName:"p"},"enum"),". Enums are especially useful when you have a simple union type with no recursion. The ",(0,i.kt)("inlineCode",{parentName:"p"},"Boolean2")," example from earlier can be re-written in a simpler form using ",(0,i.kt)("inlineCode",{parentName:"p"},"enum"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"enum BooleanAsEnum {\n  case True()\n  case False()\n}\n")),(0,i.kt)("p",null,"The only difference between the ",(0,i.kt)("inlineCode",{parentName:"p"},"enum")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"sealed trait")," syntax is that enum types can\u2019t be used to define higher-order types like ",(0,i.kt)("inlineCode",{parentName:"p"},"List")," and are intended only for simple type enumerations.  In general, it\u2019s best practice to use enums unless you need your root type to contain type parameters like ",(0,i.kt)("inlineCode",{parentName:"p"},"List"),"."),(0,i.kt)("h2",{id:"companion-objects"},"Companion Objects"),(0,i.kt)("p",null,"A companion object is a singleton type containing helpful operations to perform on the accompanying type.  The best functions for a companion object are constructors that create new instances of the accompanying type, often with some domain validation.  These constructors can have any name you\u2019d like, but common names are ",(0,i.kt)("inlineCode",{parentName:"p"},"make")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"create"),".  There is also a special companion function ",(0,i.kt)("inlineCode",{parentName:"p"},"apply")," that can be defined and called as if instantiating the type directly."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'object Videogame {\n  def make(title: String, year: Int, platforms: List[String]): Option[Videogame] =\n    if title.isEmpty then None\n    else Some(Videogame(title, year, platforms))\n\n  def apply(title: String, year: Int): Videogame =\n    Videogame(title, year, List.empty[String])\n}\n\n// `make` function now available on `Videogame` type\nval granTurismo: Option[Videogame] = Videogame.make("Gran Turismo 7", 2022, List("PS5"))\n// granTurismo: Option[Videogame] = Some(\n//   value = Videogame(\n//     title = "Gran Turismo 7",\n//     year = 2022,\n//     platforms = List("PS5")\n//   )\n// )\n\nval unreleased: Option[Videogame] = Videogame.make("", 2025, List.empty[String])\n// unreleased: Option[Videogame] = None\n\n// equivalent to Videogame.apply\nval diablo: Videogame = Videogame("Diablo", 2023)\n// diablo: Videogame = Videogame(\n//   title = "Diablo",\n//   year = 2023,\n//   platforms = List()\n// )\n')),(0,i.kt)("p",null,"The above snippet defines two additional constructors to the ",(0,i.kt)("inlineCode",{parentName:"p"},"Videogame")," type, ",(0,i.kt)("inlineCode",{parentName:"p"},"make")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"apply"),".  The ",(0,i.kt)("inlineCode",{parentName:"p"},"make")," constructor performs some additional validation on the provided parameters and returns a ",(0,i.kt)("inlineCode",{parentName:"p"},"None")," value if the input is invalid.  The ",(0,i.kt)("inlineCode",{parentName:"p"},"apply")," method lets callers provide just the ",(0,i.kt)("inlineCode",{parentName:"p"},"title")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"year")," of the videogame and provides a default of ",(0,i.kt)("inlineCode",{parentName:"p"},"List.empty[String]")," for the ",(0,i.kt)("inlineCode",{parentName:"p"},"platforms")," field.  Providing additional ",(0,i.kt)("inlineCode",{parentName:"p"},"apply")," functions in a companion object can be a convenient way to provide common defaults for users.  In general, the ",(0,i.kt)("inlineCode",{parentName:"p"},"apply")," method should always return just the companion type and not any validation-related type like ",(0,i.kt)("inlineCode",{parentName:"p"},"Option")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"Either"),"."),(0,i.kt)("h2",{id:"pattern-matching"},"Pattern Matching"),(0,i.kt)("p",null,"Values can be deconstructed and matched using the ",(0,i.kt)("inlineCode",{parentName:"p"},"match")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"case")," syntax.  Matching can be especially helpful for determining the particular union or enumeration sub-case that a value represents.  For example, we can match on our ",(0,i.kt)("inlineCode",{parentName:"p"},"List2")," snippet to perform a different step depending on if the list is empty or contains items."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"def isEmpty[A](list: List2[A]): Boolean =\n  list match {\n    case Empty2() => true\n    case NonEmpty2(_, _) => false\n  }\n")),(0,i.kt)("p",null,"In the above snippet, we use the ",(0,i.kt)("inlineCode",{parentName:"p"},"_")," syntax to ignore particular values of the match.  We can also provide local names for fields of the matched case."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"def sum(list: List2[Int]): Int =\n  list match {\n    case Empty2() => 0\n    case NonEmpty2(first, remaining) => first + sum(remaining)\n  }\n")),(0,i.kt)("p",null,"This snippet uses pattern matching to define a recursive function which calculates the sum of the list.  If the list contains items, we add the value of the first item to the sum of the remaining items.  If the list is empty, then we default to the value ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),"."),(0,i.kt)("h2",{id:"typeclasses"},"Typeclasses"),(0,i.kt)("p",null,"Typeclasses define a set of standard functionality for a category of types. For example, you may want a function that operates on any collection of items without needing duplicated logic for each collection that users need. This example is common in functional programming, but is more in-depth than what we\u2019ve seen so far."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"trait Collection[F[_]] {\n  extension [A](collection: F[A])\n    def modifyItems[B](f: A => B): F[B]\n}\n\ngiven Collection[List] with\n  extension [A](list: List[A])\n    def modifyItems[B](f: A => B): List[B] = list.map(f)\n\ngiven Collection[Option] with\n  extension [A](option: Option[A])\n    def modifyItems[B](f: A => B): Option[B] =\n      option match {\n        case Some(item) => Some(f(item))\n        case None => None\n      }\n\nextension [F[_]](collection: F[Int])(using Collection[F])\n  def addOneToAllItems: F[Int] =\n    collection.modifyItems((item: Int) => item + 1)\n\nList(1, 2, 3).addOneToAllItems\n// res1: List[Int] = List(2, 3, 4)\n\nextension (option: Option[Int])\n  def addOne: Option[Int] = option.addOneToAllItems\n\nSome(1).addOne\n// res2: Option[Int] = Some(value = 2)\nNone.addOne\n// res3: Option[Int] = None\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Collection")," typeclass above requires that implementations provide the logic for the ",(0,i.kt)("inlineCode",{parentName:"p"},"modifyItems")," function.  The ",(0,i.kt)("inlineCode",{parentName:"p"},"F[_]")," syntax specifies that overriding types must have a single type parameter, where the ",(0,i.kt)("inlineCode",{parentName:"p"},"_")," is a placeholder for the collection\u2019s item type.  The placeholder ",(0,i.kt)("inlineCode",{parentName:"p"},"F")," type can then be used when defining the required functions for ",(0,i.kt)("inlineCode",{parentName:"p"},"Collection")," instances.  The ",(0,i.kt)("inlineCode",{parentName:"p"},"extension")," syntax is used to define functions on types that can be used as if they were defined on the types themselves.  Any type with a ",(0,i.kt)("inlineCode",{parentName:"p"},"Collection")," instance in scope automatically has the ",(0,i.kt)("inlineCode",{parentName:"p"},"modifyItems")," function available.  In the case of the snippet above, we could write ",(0,i.kt)("inlineCode",{parentName:"p"},"List(1, 2, 3, 4).modifyItems(num \u21d2 num + 2)"),"  to update the list to contain all elements with ",(0,i.kt)("inlineCode",{parentName:"p"},"2")," added."),(0,i.kt)("p",null,"In order to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"Collection")," syntax on various types, typeclass instances need to be defined using ",(0,i.kt)("inlineCode",{parentName:"p"},"given \u2026 with")," syntax.  Instances have been defined in the snippet for ",(0,i.kt)("inlineCode",{parentName:"p"},"List")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Option")," types.  Although they are very different types with different shapes, they both contain collections of items.  The case of a ",(0,i.kt)("inlineCode",{parentName:"p"},"List")," might be more clear than with ",(0,i.kt)("inlineCode",{parentName:"p"},"Option"),", but an ",(0,i.kt)("inlineCode",{parentName:"p"},"Option")," is a collection of zero or one item.  If the ",(0,i.kt)("inlineCode",{parentName:"p"},"Option")," contains no item (",(0,i.kt)("inlineCode",{parentName:"p"},"None"),") then the item doesn\u2019t need to be transformed by the ",(0,i.kt)("inlineCode",{parentName:"p"},"modifyItems")," function.  If it contains a single item (",(0,i.kt)("inlineCode",{parentName:"p"},"Some"),") then it will be modified by the function value provided to ",(0,i.kt)("inlineCode",{parentName:"p"},"modifyItems"),"."),(0,i.kt)("p",null,"Finally, the ",(0,i.kt)("inlineCode",{parentName:"p"},"addOneToAllItems")," function extends any type with a ",(0,i.kt)("inlineCode",{parentName:"p"},"Collection")," instance to include the function as a new method on any values of the collection type.  With ",(0,i.kt)("inlineCode",{parentName:"p"},"Collection")," instances available for both ",(0,i.kt)("inlineCode",{parentName:"p"},"List")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Option"),", we can call ",(0,i.kt)("inlineCode",{parentName:"p"},"addOneToAllItems")," on both types without needing to explicitly define the extensions for both ",(0,i.kt)("inlineCode",{parentName:"p"},"List")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Option"),".  I've defined a special extension method ",(0,i.kt)("inlineCode",{parentName:"p"},"addOne")," for the ",(0,i.kt)("inlineCode",{parentName:"p"},"Option[Int]")," type because typeclasses are only available for the specific types that have instances.  The ",(0,i.kt)("inlineCode",{parentName:"p"},"Collection")," typeclass must be invoked with the ",(0,i.kt)("inlineCode",{parentName:"p"},"Option")," trait instead of using the ",(0,i.kt)("inlineCode",{parentName:"p"},"Some")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"None")," sub-types."),(0,i.kt)("p",null,"Typeclasses are powerful tools for abstracting common and repetitious operations to many different kinds of types.  Even a small typeclass with one function, like ",(0,i.kt)("inlineCode",{parentName:"p"},"Collection"),", can be used as a base to build more complex functions across many types."),(0,i.kt)("h2",{id:"additional-resources"},"Additional Resources"),(0,i.kt)("p",null,"This post has only begun to scratch the surface of the syntax and structures available in Scala programs, though the ones I\u2019ve gone through provide a strong platform that should allow you to write many types of programs and applications.  I recommend tinkering with the structures discussed here first and then expanding your knowledge using the following resources as you wish to do more in your programs."),(0,i.kt)("h3",{id:"scala-lang-docs"},"Scala-Lang Docs"),(0,i.kt)("p",null,"The official Scala-Lang documentation site contains everything from this post and more."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://docs.scala-lang.org/getting-started/"},"https://docs.scala-lang.org/getting-started/"))),(0,i.kt)("h3",{id:"sdk-man"},"SDK-Man"),(0,i.kt)("p",null,"Manages JDK instances on your computer and allows changing JDKs on the fly.  There are many versions and distributions available, but any of the v17 JDKs are good choices for basic programs."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://sdkman.io/"},"https://sdkman.io/"))),(0,i.kt)("h3",{id:"rock-the-jvm"},"Rock The JVM"),(0,i.kt)("p",null,"Rock The JVM is an amazing set of tutorials and guides to learning pieces of the Scala language. I learned most of my fundamental knowledge on Scala from Daniel Ciocirlan's courses."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://rockthejvm.com/"},"https://rockthejvm.com/")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.youtube.com/@rockthejvm"},"https://www.youtube.com/@rockthejvm"),"\xa0",(0,i.kt)("a",{parentName:"li",href:"https://www.udemy.com/user/daniel-ciocirlan/"},"https://www.udemy.com/user/daniel-ciocirlan/"))),(0,i.kt)("h3",{id:"this-week-in-scala"},"This Week In Scala"),(0,i.kt)("p",null,"A weekly newsletter rounding up all the new library improvements, releases, and news from the week.  The newsletter is a good way to keep up to date with what\u2019s happening in the community."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://medium.com/tag/thisweekinscala"},"https://medium.com/tag/thisweekinscala"))))}m.isMDXComponent=!0}}]);