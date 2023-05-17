"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[450],{6029:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/2022/11/07/building-a-blog","metadata":{"permalink":"/2022/11/07/building-a-blog","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-11-07-building-a-blog.md","source":"@site/blog/2022-11-07-building-a-blog.md","title":"Building A Blog With Scala Mdoc And Docusaurus","description":"This is my third or fourth iteration of a blog site.","date":"2022-11-07T00:00:00.000Z","formattedDate":"November 7, 2022","tags":[{"label":"Scala","permalink":"/tags/scala"},{"label":"SBT","permalink":"/tags/sbt"},{"label":"Documentation","permalink":"/tags/documentation"}],"readingTime":5.615,"hasTruncateMarker":false,"authors":[],"frontMatter":{"tags":["Scala","SBT","Documentation"],"draft":false},"nextItem":{"title":"Typeclasses and Ad-Hoc Polymorphism","permalink":"/2021/06/22/typeclass-and-ad-hoc-polymorphism"}},"content":"This is my third or fourth iteration of a blog site.\\nI\'ve tried a custom Angular app, Jekyll, Hugo, and now Mdoc + Docusaurus.\\n\\nI\'ve been writing Scala and JS for a few years now, so I\'m a lot more comfortable with the tooling this time around (sorry Ruby) and feel confident enough to explain the project.\\nThere are probably very few people who would choose SBT for building a blog, but maybe this can help out a fellow Scala dev with their own site.\\n\\nFor setting up the blog site, I used the following versions of tools:\\n\\n- SBT 1.7.2\\n- Scala 2.13.10\\n- Mdoc 2.3.6\\n- Docusaurus 2.2.0\\n- Node 18.9.0\\n- Yarn 1.22.19\\n\\n## Configuring SBT\\n\\nIf you aren\'t familiar with SBT, or even Scala, I would recommend trying out a basic Scala project first before diving in here.\\nThe Scala site has a good [Getting Started](https://docs.scala-lang.org/getting-started/index.html) page with some helpful initial resources.\\n\\n[SBT](https://www.scala-sbt.org/) is a modular and extensible build tool, designed for compiling JVM projects (Scala specifically), but suitable for just about any project (even compiling a blog).\\n\\nI\'ve configured my `build.sbt` to contain a module for compiling my blog posts and a root module for project aggregation.\\n\\n```sbt\\nlazy val `posts-mdoc` = project // name something other than \'posts\' or \'docs\'\\n  .enablePlugins(MdocPlugin, DocusaurusPlugin) // I\'ll explain these in a bit\\n  .settings(\\n    mdocIn := file(\\"posts\\"), // The directory containing the blog posts\\n    mdocOut := file(\\"website/blog\\"), // The target directory for the compiled blog posts\\n    libraryDependencies ++= Seq(\\n      \\"org.typelevel\\" %% \\"cats-core\\" % \\"2.8.0\\" // \ud83d\ude3a\\n    ),\\n    scalaVersion := \\"2.13.10\\" // The Scala version to use when compiling Scala snippets\\n  )\\n\\nlazy val root = project\\n  .in(file(\\".\\"))\\n  .settings(\\n    name := \\"blog\\",\\n    organization := \\"org.vennes\\"\\n  )\\n  .aggregate(`posts-mdoc`)\\n```\\n\\nThe `posts-mdoc` module is configured to use the `MdocPlugin` and `DocusaurusPlugin` plugins.\\nIn order to use these plugins, you need to add the `sbt-mdoc` plugin artifact to the `project/plugins.sbt` file.\\n\\n```sbt\\naddSbtPlugin(\\"org.scalameta\\" % \\"sbt-mdoc\\" % \\"2.3.6\\" )\\n``` \\n\\nThe `MdocPlugin` plugin compiles Scala code snippets in markdown files located in the `posts` directory and output into the `website/blog` directory.\\n\\nBy default, Mdoc uses the `docs` folder as the input directory, and the `target/mdoc` folder as the output directory.\\nI\'ve changed the input directory to `posts` and the output directory to `website/blog`, which is where Docusaurus will expect blog posts to be landed at.\\n\\nI\'ve also included `cats-core` as a dependency for the `posts-mdoc` project.\\nAny dependencies you want to use in your Markdown Scala snippets should be added to the `libraryDependencies` collection.\\nIf you haven\'t checked out [Cats](https://typelevel.org/cats/), I highly recommend taking a look once you are done reading!\\n\\n## Initializing Docusaurus\\n\\nBefore initializing your Docusaurus website, be sure to install the following tools:\\n\\n- [Node.js](https://nodejs.org/en/)\\n- [Yarn](https://yarnpkg.com/getting-started/install)\\n\\nDocusaurus is a static site generator that can scaffold a blog with some nice-looking default styles.\\nIt comes out of the box with a static site perfect for project documentation and/or a blog.\\nFortunately, features can be enabled or disabled.\\nFor my blog, I\'ve disabled the documentation features and am only using the blogging options.\\n\\nTo initialize the Docusaurus project, run the following command:\\n\\n```bash\\nnpx create-docusaurus@latest website classic\\n```\\n\\nNpx comes built-in with an installation of Node and NPM.\\nAnd although Npx was used to initialize the project, I will be using Yarn to run the Docusaurus commands and install dependencies.\\n\\nOnce the project has finished initializing, there will be a new `website` in the root of your blog project.\\n\\n## Configuring Docusaurus\\n\\nThe `website` directory will contain multiple subdirectories and configuration files.\\nThere are a lot of settings to tweak, but for this example, I\'ll only change the basics required for blog-only mode.\\n\\nThe `website/docusaurus.config.js` file contains the complete configuration for the Docusaurus project.\\nIt is structured as a JavaScript object, which provides some type-safety of configuration settings.\\nMost editors may even provide some auto-completion for the various configurations.\\nI\'ve found the auto-completion helpful for feature discovery.\\n\\nFor now, we are going to change a couple options in the config.\\nFor reference, these steps follow closely with the [Blog Setup](https://docusaurus.io/docs/blog) instructions from the Docusaurus documentation.\\nIf you\'d like more details, I recommend checking out the documentation.\\n\\nI will also be leaving all the default styles and layouts in place.\\nDocusaurus provides some documentation on [styling](https://docusaurus.io/docs/styling-layout), [theming](https://docusaurus.io/docs/using-plugins#using-themes), and [modifying](https://docusaurus.io/docs/swizzling) the site, but I will not be covering them in this post.\\n\\n1. In the `themeConfig.navbar.items` array, remove the `docs` section and change the `to` field of the `blog` section to `/`.\\n    - Removes the `Docs` link from the navbar and changes the `Blog` link to point to the root of the website.\\n2. In `presets.docs`, set the `docs` field to `false`.\\n    - Disable the docs section of the website.\\n3. In `presets.blog`,  set the property `routeBasePath` to `\'/\'`.\\n4. Remove the `index.js` file from the `website/src/pages` directory.\\n    - Removes the default landing page from the website.\\n    - You may actually enjoy having the landing page, so feel free to skip this step.\\n    - The contents of \'index.js\' can also be changed to be more blog-focused.\\n\\nThere will be a couple remaining text snippets and images that need to be updated to match your particular style, but I\'ll leave that up to you.\\n\\n[Undraw](https://undraw.co/illustrations) has some great icons and illustrations that are free to use to add some flavor to your site.\\nAlso, check out [Unsplash](https://unsplash.com/) for free stock photos that make great banner images.\\n\\n## Creating The Site\\n\\nNow that we have configured SBT and the Docusaurus project, we can create the site.\\n\\nThe Mdoc plugin provides some helpful utilities for compiling the Scala documentation and generating the Docusaurus site:\\n\\n- `mdoc` - Compiles the markdown files in the `mdocIn` directory into the `mdocOut` directory.\\n- `docusaurusCreateSite` - Creates the Docusaurus site in the `website/build` directory.\\n\\nBut before we start, be sure to add a blog post or two to the `posts` directory.\\nIf you need an example containing some Scala code, feel free to copy the content of my [Typeclasses and Ad Hoc Polymorphism Post](https://google.com).\\n\\nTo mark Scala code in your posts for compilation with Mdoc, be sure to use the `mdoc` tag after `scala` in the code block.\\n\\nFor example:\\n\\n````markdown\\n```scala mdoc\\nval x = 1\\nx\\n```\\n````\\n\\nFor more info on Mdoc options, take a look at the [Mdoc Modifiers Documentation](https://scalameta.org/mdoc/docs/modifiers.html).\\n\\nNow that we have some posts, we can create our site and serve it locally:\\n\\n```bash\\nsbt docusaurusCreateSite\\nyarn --cwd website run serve\\n```\\n\\nIf you want to run the site in a development version instead, run `sbt mdoc` and then `yarn --cwd website start`.\\nThis will run a server which reloads the site when changes are made to the markdown files.\\n\\nAnd that\'s all there is to it!"},{"id":"/2021/06/22/typeclass-and-ad-hoc-polymorphism","metadata":{"permalink":"/2021/06/22/typeclass-and-ad-hoc-polymorphism","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-06-22-typeclass-and-ad-hoc-polymorphism.md","source":"@site/blog/2021-06-22-typeclass-and-ad-hoc-polymorphism.md","title":"Typeclasses and Ad-Hoc Polymorphism","description":"Typeclasses are a construct for declaring categorical behavior on types in the Haskell programming language, however,","date":"2021-06-22T00:00:00.000Z","formattedDate":"June 22, 2021","tags":[{"label":"Functional-Programming","permalink":"/tags/functional-programming"},{"label":"Scala","permalink":"/tags/scala"},{"label":"Software-Architecture","permalink":"/tags/software-architecture"}],"readingTime":11.17,"hasTruncateMarker":false,"authors":[],"frontMatter":{"tags":["Functional-Programming","Scala","Software-Architecture"],"draft":false},"prevItem":{"title":"Building A Blog With Scala Mdoc And Docusaurus","permalink":"/2022/11/07/building-a-blog"},"nextItem":{"title":"Building HTML with Python","permalink":"/2020/03/09/building-html-with-python"}},"content":"Typeclasses are a construct for declaring categorical behavior on types in the Haskell programming language, however,\\nthe concept is not restricted to just Haskell.  The typeclass is an implementation of ad-hoc polymorphism, which\\nunlike with interface or class inheritance, allows us to define polymorphic behavior on the fly.\\n\\nTypeclasses provide an abstraction by defining interfaces and the *values* that implement them.  In most\\nobject-oriented languages, interfaces are defined using direct inheritance from a child type to a parent type.\\nInstead of operating on the class level, typeclasses define an interface, then instantiate the implementation in the\\nform of a value.  This allows flexibility with interface implementation, since the typeclass instances can be\\ninterchanged through function parameters and package imports. With typeclasses, library consumers have the ability to\\nextend the functionality of types without modifying the source.\\n\\nA typeclass consists of some generic interface and an implementation for a particular type.  The type can be any\\nrepresentation of a value (ex. `int`, `String`, `Person`, `Vehicle`...) and the value itself can be anything.  The most\\nimportant part of a typeclass is that the implementation exists seperately from the implementation of the value itself\\nand can be used like a value.\\n\\n### Typeclass Implementations Across Languages\\n\\nFor the following implementation examples, we will be implementing the\\n[Semigroup](https://typelevel.org/cats/typeclasses/semigroup.html) typeclass on `int`, `string`, and `list` types.\\n\\nSemigroup defines a single `combine` function that takes two instances of type `T` as inputs and outputs their combined\\nvalue.\\n\\nFor example, calling `combine` with the integers `4` and `6` should return `10` if we are using addition as the\\n`combine` implementation (we could also implement this for multiplication).\\n\\nAs an example of how typeclasses can be used within a library, I\'ll also be creating a function `applyTo` that will\\ncombine each value in a list with a given value. For the input `List(1, 2, 3, 4, 5)`, `applyTo` with a value of `8`\\nwould return `List(9, 10, 11, 12, 13)`.\\n\\nIt is an implicit requirement that a `Semigroup`\'s combine operation also be associative: combining a\\ngroup of values can occur in any order as in `(1 + 2) + 3 = 1 + (2 + 3)`. However, this is not a possible restriction in\\nmost programming languages, so it will not be factored into these examples.\\n\\n#### Scala\\n\\nAlthough there is not first-class support for typeclasses in Scala, there are language constructs to help create them.\\n\\nWe first create a trait representing our `Semigroup` typeclass, then create a typeclass instance representing integer\\naddition, and finally create a function which implicitly takes a typeclass instance as a parameter.  The `implicit`\\nkeyword in Scala 2 lets us create a value in the implicit scope and summon it when the typeclass is requested.\\n\\n```scala\\ntrait Semigroup[T] {\\n    def combine(a: T, b: T): T\\n}\\n\\nimplicit val intAdditionSemigroup: Semigroup[Int] = (a: Int, b: Int) => a + b\\n// intAdditionSemigroup: Semigroup[Int] = repl.MdocSession$MdocApp$$Lambda$8349/1206886047@2e654c44\\n\\ndef applyTo[A](values: List[A], value: A)(implicit semigroup: Semigroup[A]): List[A] =\\n    values.map(v => semigroup.combine(v, value))\\n\\napplyTo(List(1, 2, 3, 4, 5), 8)\\n// res0: List[Int] = List(9, 10, 11, 12, 13)\\n```\\n\\n#### C#\\n\\nTypeclasses in C# require some creativity because anonymous objects aren\'t a thing.  To access typeclass instances, we\\nwill provide an `instance` static method which returns a singleton typeclass instance.  Although this will make it\\ndifficult to use the `Semigroup<T>` typeclass in a generic context, it makes the code a little bit neater.\\n\\n```csharp\\npublic interface Semigroup<T>\\n{\\n    T Combine(T a, T b);\\n}\\n\\npublic class IntAdditionSemigroup : Semigroup<int>\\n{\\n    public static IntSemigroup instance = new IntSemigroup();\\n\\n    public int Combine(int a, int b) = a + b;\\n}\\n\\npublic List<T> ApplyTo<T>(Semigroup<T> instance, List<T> values, T value)\\n{\\n    return values.Select(v => instance.combine(v, value));\\n}\\n\\nApplyTo(IntAdditionSemigroup.instance, new List<int> { 1, 2, 3, 4, 5 }, 8);\\n```\\n\\nNote that because C# has no equivalent of the implicit scope found in Scala, the semigroup instance must be provided\\ndirectly to the `ApplyTo` function.\\n\\n#### Typescript\\n\\nTypescript\'s implementation is a little neater, but also requires passing the semigroup instance directly because an\\n`implicit` scope doesn\'t exist. Typescript *does* support instantiating anonymous objects, which makes creating the\\ntypeclass instances simple.\\n\\n```typescript\\ninterface Semigroup<T> {\\n    combine(a: T, b: T): T\\n}\\n\\nconst numberAdditionSemigroup = {\\n    combine(a: number, b: number): number {\\n        return a + b\\n    }\\n} as Semigroup<number>\\n\\nfunction combineAll<T>(instance: Semigroup<T>, values: T[], value: T): T[] {\\n    return values.map(v => instance.combine(v, value))\\n}\\n\\ncombineAll(numberAdditionSemigroup, [1, 2, 3, 4, 5], 8)\\n```\\n\\n#### Rust\\n\\nRust supports Ad-Hoc polymorphism out of the box since the implementation of interfaces for types must be defined\\nseparately from the types themselves.  The `trait` implementations in Rust act just like typeclass definitions with an\\naccompying `impl` block for instance definitions.\\n\\nI\'ve made the `Semigroup` typeclass receive the values `a` and `b` by reference so that we don\'t have to take ownership\\nof the values, which makes it easier to work with.\\n\\n```rust\\ntrait Semigroup {\\n    fn combine(a: &Self, b: &Self) -> Self;\\n}\\n\\nimpl Semigroup for i32 {\\n    fn combine(a: &i32, b: &i32) -> i32 {\\n        a + b\\n    }\\n}\\n\\nfn apply_to<T>(values: Vec<T>, value: T) -> Vec<T> where T: Semigroup {\\n    values.iter().map(|v| { T::combine(&v, &value) } ).collect()\\n}\\n\\napply_to(vec![1, 2, 3, 4, 5], 8)\\n```\\n\\nWe do not have the option to provide multiple implementations of `Semigroup` for `i32` within the same scope, so any\\nadditional implementations of `combine` (multiplication) would have to be placed in a separate scope and imported.\\n\\n### Helpful Typeclasses\\n\\nThere are a number of common typeclasses that can be combined to implement similar behavior across all implementing\\ntypes.  `Semigroup`, `Eq`, and `Show` are simple typeclasses, but more complex ones like `Monoid`, `Monad`, and\\n`Functor` can provide a lot of additional functionality.\\n\\nI will be implmenting the following examples with Scala, but symmetric implementations can be made for C#, Typescript,\\nand Rust using the methods outlined in our `Semigroup` example.\\n\\n#### Eq\\n\\n`Eq` provides a typesafe equals method `eqv`.  `Eq` should be used when we want to check that the value of two\\nvalues with the same type is the same.  Calling `eqv` with two values of different types should fail to compile.\\n\\n```scala\\ntrait Eq[T] {\\n    def eqv(a: T, b: T): Boolean\\n}\\n```\\n\\nBecause we provide a function that determines if two values are equal, we also get a function determining if two\\nvalues are not equal for free.\\n\\n```scala\\nobject Eq {\\n    def neqv[T](a: T, b: T)(implicit eq: Eq[T]): Boolean = !eq.eqv(a, b)\\n}\\n```\\n\\nFor implementing `neqv` I\'ve created a companion class which takes an implicit `Eq` instance. The `neqv` method can\\nalso be defined in the `Eq` trait itself.\\n\\nThen in our library, we can use our type-safe `Eq` implementation instead of the `==` which can vary in accuracy\\ndepending on type.\\n\\n```scala\\ndef combineIfNotEqual[T](a: T, b: T, otherwise: T)(implicit eq: Eq[T], semigroup: Semigroup[T]): T =\\n    if (Eq.neqv(a, b)) semigroup.combine(a, b)\\n    else otherwise\\n```\\n\\n#### Show\\n\\n`Show` provides a method to get an explicit function for turning a value into a `String` type.  This is very helpful\\nwhen we want to print the state of a complex object to the console without having to override any existing toString\\nmethod directly on the type implementation.  Also, when a function wants to print the value of a generic type to the\\nconsole, it can use its `Show` implementation instead of relying on the built-in `toString` method to be correct. Often,\\nthe default `toString` method will print out garbage, expecially for complex class instances in the JVM.\\n\\n```scala\\ntrait Show[T] {\\n    def show(value: T): String\\n}\\n```\\n\\nThen, when we want to do some debugging from a function we write, we can require an explicit `Show` implementation\\nwhich the function caller provides.\\n\\n```scala\\nimplicit val showInt: Show[Int] = (value: Int) => s\\"Integer($value)\\" // ex. Integer(5)\\n// showInt: Show[Int] = repl.MdocSession$MdocApp$$Lambda$8351/1813663556@6db4e72e // ex. Integer(5)\\n\\ndef print[T](value: T)(implicit show: Show[T]): Unit = println(show.show(value))\\n\\nprint(500)\\n// Integer(500)\\n```\\n\\nFor a more complex object, this can save us a lot of headache.\\n\\n```scala\\nclass PersonWithRandomAge(val first: String, val last: String) {\\n  private val random = scala.util.Random\\n\\n  val age = random.nextInt(100)\\n}\\n\\nimplicit val showPerson: Show[PersonWithRandomAge] = (person: PersonWithRandomAge) =>\\n  s\\"Person(name: ${person.last}, ${person.first}, age: ${person.age})\\"\\n// showPerson: Show[PersonWithRandomAge] = repl.MdocSession$MdocApp$$Lambda$8352/1116844013@65530354\\n```\\n\\nEven better, with some help from the Scala Cats library, we can use this implementation when we have a collection of\\npeople without any extra work. We just have to be sure to implement the `cats.Show` trait instead of our custom `Show` trait.\\n\\n```scala\\nimport cats.implicits._\\n\\nimplicit val catsShowPerson: cats.Show[PersonWithRandomAge] = (person: PersonWithRandomAge) =>\\n  s\\"Person(name: ${person.last}, ${person.first}, age: ${person.age})\\"\\n// catsShowPerson: Show[PersonWithRandomAge] = repl.MdocSession$MdocApp$$Lambda$8353/1743450488@2f140547\\n\\nval people: List[PersonWithRandomAge] = List(new PersonWithRandomAge(\\"Kup\\", \\" Quickdew\\"), new PersonWithRandomAge(\\"Hellweed\\", \\"Underhill\\"))\\n// people: List[PersonWithRandomAge] = List(\\n//   repl.MdocSession$MdocApp$PersonWithRandomAge@c340a3e,\\n//   repl.MdocSession$MdocApp$PersonWithRandomAge@66c11cd4\\n// )\\n\\npeople.show\\n// res2: String = \\"List(Person(name:  Quickdew, Kup, age: 70), Person(name: Underhill, Hellweed, age: 96))\\"\\n```\\n\\n#### Monoid\\n\\nThe `Monoid` typeclass is an extension of `Semigroup` with an additional method `empty` that returns a value\\nrepresenting the default state of non-existence.  For integers, this value would be `0` or for strings `\\"\\"`.\\n\\nIt is often helpful to extend the functionality of one typeclass with that of another.\\nWe can expand on our previous `Semigroup` trait to implement `Monoid`.\\n\\n```scala\\ntrait Semigroup[T] {\\n  def combine(a: T, b: T): T\\n}\\n\\ntrait Monoid[T] extends Semigroup[T] {\\n  def empty: T\\n}\\n```\\n\\nAny implementation of `Monoid` can be used where a `Semigroup` is required.\\nThis comes in handy when we want to fold over a collection of values.\\n\\n```scala\\nimplicit val intAdditionMonoid: Monoid[Int] = new Monoid[Int] {\\n    override def combine(a: Int, b: Int): Int = a + b\\n    override def empty: Int = 0\\n}\\n// intAdditionMonoid: Monoid[Int] = repl.MdocSession$MdocApp3$$anon$9@22734d6\\n\\ndef combineAll[T](values: List[T])(implicit monoid: Monoid[T]) =\\n    values.foldLeft(monoid.empty)(monoid.combine)\\n\\ncombineAll(List(1, 2, 3, 4, 5)) // 15\\n// res4: Int = 15\\n```\\n\\n#### Functor\\n\\nThe `Functor` typeclass defines a `map` method from type `A` to type `B` so that a `Functor[A]` can be mapped to a\\n`Functor[B]` type.  This is loosely related to the mathematical definition of a `Functor` `F` which defines a\\nmapping from a set `A` to a set `B` such that `F[idA] -> F[idB]` and `F[g * f] -> F[g] * F[f]`.  In this definition,\\nthe identity element `idA` depends on the identity of the the category (`0` for integer addtion and `1` for integer\\nmultiplication) and `g` and `f` are functions applied to the element contained in `F`.  For example, if `g(x) = x + 1`\\nand `f(x) = x + 5`, then `F[g(f(3))]` must be equal to `F[g(3)] + F[f(3)]`.\\n\\nFor the typeclass definition of `Functor`, we are going to take advantage of Scala\'s ability to define generic type\\narguments with a number of \\"holes\\".  For example, `Functor[F[_]]` defines a `Functor` type for a generic argument named\\n`F` that itself has a single type argument.  In most languages, this restriction will not be possible, which can make\\ndefining this `Functor` type tricky.\\n\\nIn our example, I will use `Option` as the `Functor` argument.  `Option` in Scala contains a previously defined `map`\\nmethod, but I will instead show how the implementation works using just `Some` and `None` case classes.\\n\\nI\'m also adding an additional `Functor` object with a summoner function which pulls the given implicit functor out\\nof the `implicit` scope.  This will let us call the `Functor` map function directly.\\n\\n```scala\\ntrait Functor[F[_]] {\\n    def map[A, B](functorA: F[A], mapping: A => B): F[B]\\n}\\n\\nobject Functor {\\n    // summoner function\\n    def apply[F[_]](implicit functor: Functor[F]): Functor[F] = functor\\n}\\n\\nimplicit val optionFunctor: Functor[Option] = new Functor[Option] {\\n    override def map[A, B](functorA: Option[A], mapping: A => B): Option[B] =\\n        functorA match {\\n            case Some(a) => Some(mapping(a))\\n            case None => None\\n        }\\n}\\n// optionFunctor: Functor[[A >: Nothing <: Any] => Option[A]] = repl.MdocSession$MdocApp3$$anon$12@52126a08\\n\\nFunctor[Option].map[Int, Int](Some(50), x => x * 10)\\n// res5: Option[Int] = Some(value = 500)\\nFunctor[Option].map[Int, Int](None, x => x * 10)\\n// res6: Option[Int] = None\\n```\\n\\n#### Monad\\n\\nThe `Monad` typeclass is an extension on the `Functor` typeclass which provides a `flatten` function.  The `flatten`\\nfunction squashes a value of type `F[F[_]]` into `F[_]`.  Once defined, we can combine `flatten` and `map` to create\\n`flatMap`, which works like `map` except it takes in a function of type `A => F[B]` instead of `A => B` and returns\\nthe type `F[B]`.\\n\\n```scala\\ntrait Monad[F[_]] extends Functor[F] {\\n  def flatten[A](nestedFunctorA: F[F[A]]): F[A]\\n\\n  def flatMap[A, B](functorA: F[A], mapping: A => F[B]): F[B] = flatten(map(functorA, mapping))\\n}\\n\\nimplicit val listMonad: Monad[List] = new Monad[List] {\\n  override def map[A, B](functorA: List[A], mapping: A => B): List[B] = functorA match {\\n    case head :: tail => mapping(head) :: map(tail, mapping)\\n    case _ => List()\\n  }\\n\\n  override def flatten[A](nestedFunctorA: List[List[A]]): List[A] = nestedFunctorA match {\\n    case head :: tail => head ++ flatten(tail)\\n    case _ => List()\\n  }\\n}\\n// listMonad: Monad[List] = repl.MdocSession$MdocApp3$$anon$16@1f1163a1\\n\\nobject Monad {\\n  // summoner function\\n  def apply[F[_]](implicit monad: Monad[F]): Monad[F] = monad\\n}\\n\\nMonad[List].map(List(100, 5, 22), (x: Int) => x * 5)\\n// res7: List[Int] = List(500, 25, 110)\\n\\nMonad[List].flatten(List(List(1, 3, 4), List(9, 18, 0)))\\n// res8: List[Int] = List(1, 3, 4, 9, 18, 0)\\n\\nMonad[List].flatMap(List(1, 2, 3, 4), (x: Int) => List(x % 2, x % 3))\\n// res9: List[Int] = List(1, 1, 0, 2, 1, 0, 0, 1)\\n```\\n\\n## Conclusion\\n\\nTypeclasses are a flexible and functional approach to abstraction and generic programming.  They are type-safe, modular,\\nand simple to test and relieve many headaches software developers encounter with common behaviors on types."},{"id":"/2020/03/09/building-html-with-python","metadata":{"permalink":"/2020/03/09/building-html-with-python","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2020-03-09-building-html-with-python.md","source":"@site/blog/2020-03-09-building-html-with-python.md","title":"Building HTML with Python","description":"In this tutorial I will be walking through the development of my HTML builder Python package.","date":"2020-03-09T00:00:00.000Z","formattedDate":"March 9, 2020","tags":[{"label":"Python","permalink":"/tags/python"},{"label":"HTML","permalink":"/tags/html"}],"readingTime":6.145,"hasTruncateMarker":false,"authors":[],"frontMatter":{"tags":["Python","HTML"],"draft":false},"prevItem":{"title":"Typeclasses and Ad-Hoc Polymorphism","permalink":"/2021/06/22/typeclass-and-ad-hoc-polymorphism"}},"content":"In this tutorial I will be walking through the development of my HTML builder Python package.\\n\\nThe completed package is available at [bvennes/html_builder](https://github.com/b-vennes/html_builder) on GitHub.\\n\\n## Creating a Clientside Project With Python\\n\\nThe purpose of the HTML builder is to programmatically create an HTML file using Python. In the future, however, I would like to make SCSS and JavaScript builders as well so that the entirety of a web application could be built using Python.\\n\\nHTML is a good place to start because the structure of an HTML file is fairly simple. HTML tags look like `<tag-name class=\\"class-1 class-2\\"></tag-name>` and are nested to build out component hierarchies.\\n\\nAn HTML tag can be broken down into 4 major components:\\n\\n- name of the tag\\n- list of classes for the tag\\n- additional attributes like `onclick` or `style`\\n- child tags or text\\n\\n## Html Python Class\\n\\nTo create an HTML tag in Python, I created a basic object called `Html` holding access to the HTML tag\'s name, class names, and attributes like `onclick: doSomething()`.\\n\\nIt would also be possible for the classes list to be given as an attribute, since `class` is technically just an attribute, but this is a good opportunity to make use of Python\'s `*args` functionality.\\n\\nHere is what the initial code looked like for the Html object:\\n\\n``` python\\nclass Html:\\n    def __init__(self, tag_name, *class_names, **attributes):\\n        \\"\\"\\"Initializes a new html tag.\\"\\"\\"\\n        self.name = tag_name\\n        self.class_names = list(class_names)\\n        self.attributes = attributes\\n        self.children = []\\n```\\n\\n## Render Method\\n\\nIn order to output the Html object as a string, I added a `render` method.\\n\\n``` python\\ndef render(self):\\n        \\"\\"\\"Renders the html tag as a string.\\"\\"\\"\\n        html = f\'<{self.name}\'\\n\\n        if self.class_names.__len__() > 0:\\n            classes_list = \' \'.join(self.class_names)\\n            html += f\' class=\\"{classes_list}\\"\'\\n\\n        for key, value in self.attributes.items():\\n            html += f\' {key}=\\"{value}\\"\'\\n\\n        html += f\'></{self.name}>\'\\n\\n        return html\\n```\\n\\nTo render the HTML tag as a string, we maintain an html element that begins with `<self.name`, add the classes as a list separated by a space, add the sets of attribute key/value pairs, and finally close it off with `></self.name>`.\\n\\nWith both the `__init__` and `render` methods completed, the `Html` class looks like:\\n\\n``` python\\nclass Html:\\n    def __init__(self, tag_name, *class_names, **attributes):\\n        \\"\\"\\"Initializes a new html tag.\\"\\"\\"\\n        self.name = tag_name\\n        self.class_names = list(class_names)\\n        self.attributes = attributes\\n        self.children = []\\n\\n    def render(self):\\n        \\"\\"\\"Renders the html tag as a string.\\"\\"\\"\\n        html = f\'<{self.name}\'\\n\\n        if self.class_names.__len__() > 0:\\n            classes_list = \' \'.join(self.class_names)\\n            html += f\' class=\\"{classes_list}\\"\'\\n\\n        for key, value in self.attributes.items():\\n            html += f\' {key}=\\"{value}\\"\'\\n\\n        html += f\'></{self.name}>\'\\n\\n        return html\\n```\\n\\n## Html Class Testing\\n\\nBefore testing this class out, let\'s setup the full `html_builder` Python package.\\n\\nFirst, create a new directory called _html_builder_.\\n\\nAdd a blank file within this directory called \\\\_\\\\_init\\\\_\\\\_.py\\n\\nAdd a subdirectory to _html_builder_ also called _html_builder_.\\n\\nWithin the _html_builder_ subdirectory, add a file named _html.py_ and copy the `Html` class from above.\\n\\nThen, create a test script in the same folder as the top-level _html_builder_ directory named _html_test.py_.\\n\\n``` python\\n# html_test.py\\nfrom html_builder.html import Html\\n\\nbutton = Html(\'button\', \'class-1\', \'class-2\', onclick=\\"alert(\'Hello world!\')\\")\\n\\nprint(button.render())\\n\\n```\\n\\nThe output of this Python script should be `<button class=\\"class-1 class-2\\" onclick=\\"alert(\'Hello world!\')\\"></button>`. Let\'s copy this to a file named _button.html_ and open it in a web browser. We should see a tiny button with no text. If we click on it, the window alerts us with the message `Hello world!`. That\'s a promising start!\\n\\nBut users will want to be able to add text to their button. In order to do this, we want our button to be able to contain some child elements, like this:\\n\\n``` html\\n<button class=\\"class-1 class-2\\" onclick=\\"alert(\'Hello world!\')\\">\\n    Click me!\\n</button>\\n```\\n\\n## Html Children\\n\\nLet\'s add a child element to our button.\\n\\n``` python\\nbutton = Html(\'button\', onclick=\\"alert(\'Hello world!\')\\")\\nbutton.children += [\'Click me!\']\\n```\\n\\nHowever, our render method isn\'t rendering any of our children, so let\'s fix that by adding a method called `render_children()`. We will make it a private method so that we can encapsulate any additional logic that might occur while rendering the tag\'s children. To make the method private, add `__` before the method name.\\n\\nThis is also a good time to make the HTML format nicely when printed using newline characters and spaces.\\n\\n``` python\\ndef __render_children(self):\\n    \\"\\"\\"Renders the tag\'s children\\"\\"\\"\\n    rendered_children = \'\'\\n\\n    for child in self.children:\\n        rendered_children += \'\\\\n    \'\\n        if type(child) is Html:\\n            rendered_children += child.render().replace(\'\\\\n\',\'\\\\n    \')\\n        else:\\n            rendered_children += child\\n    \\n    rendered_children += \'\\\\n\'\\n    \\n    return rendered_children\\n```\\n\\nLet\'s also modify the `render` to use the new private method.\\n\\n``` python\\ndef render(self):\\n    \\"\\"\\"Renders the html tag as a string.\\"\\"\\"\\n    html = f\'<{self.name}\'\\n\\n    if self.class_names.__len__() > 0:\\n        classes_list = \' \'.join(self.class_names)\\n        html += f\' class=\\"{classes_list}\\"\'\\n        \\n    for key, value in self.attributes.items():\\n        html += f\' {key}=\\"{value}\\"\'\\n\\n    rendered_children = self.__render_children()\\n\\n    html += f\'>{rendered_children}</{self.name}>\'\\n\\n    return html\\n```\\n\\nThe `Html` class should now look like this:\\n\\n``` python\\n# html.py\\nclass Html:\\n    def __init__(self, tag_name, *class_names, **attributes):\\n        \\"\\"\\"Initializes a new html tag.\\"\\"\\"\\n        self.name = tag_name\\n        self.class_names = list(class_names)\\n        self.attributes = attributes\\n        self.children = []\\n\\n    def render(self):\\n        \\"\\"\\"Renders the html tag as a string.\\"\\"\\"\\n        html = f\'<{self.name}\'\\n\\n        if self.class_names.__len__() > 0:\\n            classes_list = \' \'.join(self.class_names)\\n            html += f\' class=\\"{classes_list}\\"\'\\n            \\n        for key, value in self.attributes.items():\\n            html += f\' {key}=\\"{value}\\"\'\\n\\n        rendered_children = self.__render_children()\\n\\n        html += f\'>{rendered_children}</{self.name}>\'\\n\\n        return html\\n\\n    def __render_children(self):\\n        \\"\\"\\"Renders the tag\'s children\\"\\"\\"\\n        rendered_children = \'\'\\n\\n        for child in self.children:\\n            rendered_children += \'\\\\n    \'\\n            if type(child) is Html:\\n                rendered_children += child.render().replace(\'\\\\n\',\'\\\\n    \')\\n            else:\\n                rendered_children += child\\n        \\n        rendered_children += \'\\\\n\'\\n        \\n        return rendered_children\\n```\\n\\nLooks good! Now we\'ll want to update our test script to make use of the new functionality. I\'ve added `div` and `title` elements to test out nested HTML.\\n\\n## Testing Child HTML Tags\\n\\n``` python\\n# html_test.py\\nfrom html_builder.html_builder.html import Html\\n\\ndiv = Html(\'div\')\\n\\ntitle = Html(\'h1\')\\n\\nbutton = Html(\'button\', onclick=\\"alert(\'Hello world!\')\\")\\n\\nbutton.children += [\'Click me!\']\\ntitle.children += [\'HTML Builder Test\']\\ndiv.children += [title, button]\\n\\nprint(div.render())\\n```\\n\\nAfter running the _html_test.py_ script we should see the output\\n\\n``` html\\n<div>\\n    <h1>\\n        HTML Builder Test\\n    </h1>\\n    <button onclick=\\"alert(\'Hello world!\')\\">\\n        Click me!\\n    </button>\\n</div>\\n```\\n\\nAfter copying the output to _test.html_ and reloading the browser, it should show our title and a button that says \'Click me!\'.\\n\\n## Rendering to an HTML File\\n\\nAt this point, our builder is just about done. But it might be helpful for our users to render HTML directly into a file. So I\'ve added an `output_file` parameter to the `render` method so that users can specify a path where the rendered HTML should go. Before returning the HTML as a string, I\'ve also added a section for opening the file if it is given, writing to it, and closing it.\\n\\n``` python\\ndef render(self, output_file_path=None):\\n    \\"\\"\\"Renders the html tag as a string.\\"\\"\\"\\n    html = f\'<{self.name}\'\\n\\n    if self.class_names.__len__() > 0:\\n        classes_list = \' \'.join(self.class_names)\\n        html += f\' class=\\"{classes_list}\\"\'\\n        \\n    for key, value in self.attributes.items():\\n        html += f\' {key}=\\"{value}\\"\'\\n\\n    rendered_children = self.__render_children()\\n\\n    html += f\'>{rendered_children}</{self.name}>\'\\n\\n    if output_file_path != None:\\n        output_file = open(output_file_path, \'w\')\\n        output_file.write(html)\\n        output_file.close()\\n\\n    return html\\n```\\n\\nTo verify this behavior works correctly, I\'ve specified the output file in the test script.\\n\\n``` python\\nfrom html_builder.html_builder.html import Html\\n\\ndiv = Html(\'div\')\\n\\ntitle = Html(\'h1\')\\n\\nbutton = Html(\'button\', onclick=\\"alert(\'Hello world!\')\\")\\n\\nbutton.children += [\'Click me!\']\\ntitle.children += [\'HTML Builder Test\']\\ndiv.children += [title, button]\\n\\nprint(div.render(\'./test.html\'))\\n```\\n\\nNow when we run the script, the HTML is printed to both the output terminal and the _test.html_ file. Neat!"}]}')}}]);