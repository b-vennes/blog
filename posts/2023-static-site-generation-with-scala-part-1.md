# Static Site Generation With Scala

I'm interested in new and unique methods for web development with Scala and in
doing so came across the Scalatags library and gained some more familiarity with
ScalaJS. My goal with this project is to encourage readers to reach for some
different tools when building web applications, instead of the standard
frameworks like React. Especailly for smaller websites and apps, there are
simpler tools which can do just as good a job.

This first post in the series is going to step through generating a static web
site using a Scala application.  The sample site that I’ll be building is an art
gallery for showing off some art pieces that I have access to.  I pulled some
lovely paintings from the public domain to display in my digital gallery since I
don’t have any art of my own to display.

## Start a Scala project with Scala CLI

Scala CLI is a fairly new tool, but has quickly become commonplace on my
toolbelt.  It makes it really easy to start writing Scala code right away and
has come a long way over the last couple of years.

Normally, for a project like a full web-server with build tasks running
beforehand to set up a website, I'd rely on a build tool like SBT or Mill.  In
fact, I got through writing most of this guide with SBT before realizing Scala
CLI was the better tool.

One reason for choosing Scala CLI is that it makes things way simpler.  In fact,
I have the entire working application from this guide available on my GitHub in
a single file.  And all you need to run it is Scala CLI.  It's a phenomenal
project.

So, instead of showing you what my build.sbt or build.sc file looks like, I'll
get things started with what the top of my `app.scala` file looks like.
Everything else that follows in this article can just be tacked on or overwrite
something I'd previously added.  In general I'll try to make sure that new code
can be appended and will be explicit about when I've gone back to re-write
something.  Oftentimes it can be hard to write something perfectly and
fully-featured the first time, and as such needs a second or third pass.

```scala

//> using scala "3.3.1"
//> using dep "org.typelevel::cats-effect:3.5.2"
//> using dep "com.lihaoyi::os-lib:0.9.3"
//> using dep "com.lihaoyi::scalatags:0.12.0"
//> using dep "org.http4s::http4s-ember-server:0.23.25"

```

For this project I'm pulling in a couple libraries that I really like:

- Cats Effect
- OS Lib
- Scalatags
- http4s

## Create an SBT module for the static site

The first step to setting up a new Scala project is adding the modules to the
build.sbt file.  If you are unfamiliar, a build.sbt defines the project
structure of a Scala repository including the project modules and scripted tasks
that can be performed from the SBT shell.

The initial SBT file for our static site project will look as follows:

```scala

val scala3 = "3.3.0"

lazy val `art-gallery-site` =
  project
    .settings(
      libraryDependencies ++= Seq(
        "org.typelevel" %% "cats-core" % "2.9.0",
        "org.typelevel" %% "cats-effect" % "3.5.1",
        "com.lihaoyi" %% "os-lib" % "0.9.1",
        "com.lihaoyi" %% "scalatags" % "0.12.0"
      ),
      scalaVersion := scala3,
    )

lazy val root = project.in(file(".")).aggregate(`art-gallery-site`)

```

The `art-gallery-site` value defines a new Scala module in the sub-folder
`/art-gallery-site/`.  Our Scala code for this file will go in
`/art-gallery-site/src/main/scala/gallery/`, where the package name for the
project is `gallery`.

We've also defined a `root` project value.  The `root` project is the default
project that SBT will use when starting the SBT shell.  Tasks run against the
root project, like `compile`, will also automatically be run against the
`art-gallery-site` project because `art-gallery-site` is provided as a value to
the `aggregate` function.  We will add more modules to the aggregate function as
we add them to the project.

I also set up the project with the dependencies I'll need to operate on files
and generate HTML.

There are a few options for performing os-level operations like copying files,
but I always fall back to using `os-lib` because it's so simple.  An excellent
alternative is [fs2](https://fs2.io), which provides support for creating and
operating on data streams (including files) with support for asynchronous ops,
but it's overkill for this scale of project.

Scalatags provides an excellent DSL (domain specific language) for defining
HTML.  Of course, I could always just write the HTML manually (and there's often
reasons to do it), but in this case, I want to be able to generate HTML with
similar structures including duplicated elements.  Scalatags makes this easy.
Another alternative I considered was a templating engine like
[Scalate](https://scalate.github.io/scalate/index.html) which has the benefit of
being able to move existing templates to other languages, but for now I think
Scalatags will be the more enjoyable development experience.  In the future I
may test out Scalate or another templating system.

## Add the Painting and Gallery Types

To start, I want to define the types that model how I think the art gallery
should look.  I want the gallery to be made up of paintings, with each painting
having a name, an image, an artist's name, and the date it was completed.

I can model this general structure as the following:

```scala mdoc

case class Painting(
    name: String,
    artist: String,
    year: Int,
    id: String,
    filetype: String
)

object Painting:
    def jpg(name: String, artist: String, year: Int): Painting =
        Painting(
            name,
            artist,
            year,
            name.toLowerCase().replace(" ", "_").replace(", ", "_"),
            "jpg"
        )

case class Gallery(paintings: List[Painting])

object Gallery:
    def apply(paintings: Painting*): Gallery =
        new Gallery(paintings.toList)


```

I've chosen to represent the painting image using a combination of an `id` and a
`filetype`.  I'll keep painting images stored in a local `images` folder with
image files having the naming structure `s"$id.$filetype"`.  I can make this
representation explicit by adding a `fileName` function.

For the `Painting` type I've also decided to add a `jpg` function to the
companion object since all the files I have for this project are JPEGs.  And
having a function which performs some conversions for me will make loading
images a lot more convenient.

And for the `Gallery` type, I've also added an additional constructor so that I
don't have to wrap a list of defined paintings in a `List`.  This will provide a
nice shorthand syntax:

```scala mdoc

Gallery(
  Painting.jpg("name", "artist", 2001)
)

```

```scala mdoc

def fileName(painting: Painting): String =
  s"${painting.id}.${painting.filetype}" }

// test the "fileName" function
fileName(Painting("example", "me", 2022, "example", "jpg"))

```

## Render HTML tags

After completing our basic types, I'll define the HTML we want to render for our
gallery.  Since I know that I want all the paintings to have the same general
visual structure, I will start by defining a `render` method for `Painting`
values.  The `render` method will convert any `Painting` into an HTML tag of
type `Tag` from the [scalatags](https://com-lihaoyi.github.io/scalatags/)
library.

```scala

import scalatags.Text.all.*

def renderBasic(painting: Painting): Tag =
    div(
        img(src := s"/images/${fileName(painting)}"),
        p(s"Name: ${painting.name}"),
        p(s"Artist: ${painting.artist}"),
        p(s"Year: ${painting.year}")
    )

```

In the resulting website, I want an `/images/` directory to contain all the
hosted image files. Therefore, I need a link to `/images/${fileName(painting)}`
in order for the painting's image to be correctly displayed in the gallery page.

Below the image, I've added separated paragraph sections for the painting's
name, artist, and year.

At the moment, I don't care how the resulting site looks (it doesn't look very
pretty, also hence the `renderBasic`, stay tuned for `renderPretty`), as I just
want to make sure all the data is organized how I want it to be.

With the `renderBasic` function complete, I'll add an overloaded `renderBasic` function for the
`Gallery` type.

```scala mdoc

def renderBasic(gallery: Gallery): Tag =
    div(
        h1("Art Gallery"),
        div(gallery.paintings.map(renderBasic))
    )

```

The gallery should have a big title with the text **Art Gallery** above all the
images.  Since I'm writing the HTML in Scala and not directly as HTML tags, I
can re-use the `renderBasic` function I wrote for each painting in the gallery.

To ensure that the HTML is rendering how I expect it to, I can run the
`renderBasic` and function followed by the `render` function from scalatags on
an example Gallery and confirm the outputs looks correct.

```scala mdoc

val example = Gallery(
  List(
    Painting(
      "example-1",
      "me",
      2022,
      "example-1",
      "jpg"),
    Painting(
      "example-2",
      "me",
      2023,
      "example-2",
      "jpg"
    ),
  )
)

renderBasic(example).render

```

Eureka!

## Generate a distribution folder

With the ability to generate an ugly website, it's time to move onto creating
the website directory that represents our hosted site.  Here's an example of how
the structure should look:

```

- dist (dir)
  - images (dir)
    - example-1.jpg (file)
    - example-2.jpg (file)
  - index.html (file)

```

When started, I want the art-gallery Scala app to create the distribution directory and copy the
images folder to it.

Here's an initial approach using Scala's `App` trait to run:

```scala mdoc:compile-only

object ArtGalleryApp extends App:
    val gallery = Gallery(
        Painting.jpg("The Seine", "Henry Ossawa Tanner", 1902),
        Painting.jpg("Chateau Noir", "Paul Cezanne", 1904),
        Painting.jpg("The Gardener Vallier", "Paul Cezanne", 1906),
        Painting.jpg("Waterloo Bridge, London, at Sunset", "Claude Monet", 1904)
    )

    val imagesPath = os.pwd / "images"
    val distPath = os.pwd / "dist"
    val distImagesPath = distPath / "images"

    println(s"Generating art gallery site at $distPath")

    os.remove.all(distPath)

    println(s"Copying images from $imagesPath to $distImagesPath")

    os.copy(imagesPath, distImagesPath, createFolders = true)

```

I've started by defining the locations of my images and distribution (aka
`dist`) directories using the os-lib library.  The `os.pwd` value from os-lib
will be the root of my Scala repository when I run the application. The images
folder can be anywhere, but I'd like it to be a top-level folder in the project
repository.

Then, I clear out an existing site folder using the `os.remove.all` function.
This will recursively delete all the files in the directory including the
directory itself.  This ensures we start from a clean distribution state.

Finally, I copy the images directory from the given `imagesPath` value to the
`distPath` value using the `os.copy` function (again from os-lib).  I need to
set `createFolders` to `true` so that the `/dist/images/` directory is
automatically created before image files are copied to it.

To test, I can generate the site using the `art-gallery-site/run` SBT task.  The
`/dist/images/` directory will now be generated.

Now that the images have been copied, I can finally get to generating the
index.html page.  This page will contain the HTML we generated for the `Gallery`
type wrapped in a `<html>` and `<body>` tag.

I've updated my `ArtGallerySite` app to the following:

```scala mdoc:compile-only

object ArtGalleryApp extends App:
    val gallery = Gallery(
        Painting.jpg("The Seine", "Henry Ossawa Tanner", 1902),
        Painting.jpg("Chateau Noir", "Paul Cezanne", 1904),
        Painting.jpg("The Gardener Vallier", "Paul Cezanne", 1906),
        Painting.jpg("Waterloo Bridge, London, at Sunset", "Claude Monet", 1904)
    )

    val imagesPath = os.pwd / "images"
    val distPath = os.pwd / "dist"
    val distImagesPath = distPath / "images"
    val indexPath = distPath / "index.html"

    println(s"Generating art gallery site at $distPath")

    os.remove.all(distPath)

    println(s"Copying images from $imagesPath to $distImagesPath")

    os.copy(imagesPath, distImagesPath, createFolders = true)

    println(s"Generating the index.html page at $indexPath")

    val htmlTag: Tag =
      html(
        body(
          renderBasicTag(gallery)
        )
      )
  
    os.write(indexPath, htmlTag.render)

```

To write the gallery HTML to the `/dist/index.html` page, I've generated the
tag for my example gallery, wrapped it in standard `html` and `body` tags,
rendered the HTML text, and written the contents to the index file with
`os.write`.

And with this step complete, I have a site that I can easily deploy bundled into
a single directory.

## Start a static web server

There are lots of ways to view HTML.  Many OSes will now just load local HTML
files as if they were a website.  But I want to see it running as if it was a
regular website on a standard web server.

To do this, I'm going to create a static file server using http4s.  Now, http4s
is one of the more complicated Scala libraries available, so I'll be keeping
things very simple for this project.  In the future I may write a guide on
http4s for power users.

I could add another app in my `art-gallery-site` Scala module for starting the
file server, but then I'd have to select which app I want to run each time I
generate a site or run the file server.  Instead, I'm going to create the file
server as its own Scala module with its dependencies in its own directory.

To do this, I've added another module named `static-server` to my build.sbt
file:

```scala val scala3 = "3.3.0"

lazy val `art-gallery-site` = project .settings( libraryDependencies ++= Seq(
"com.lihaoyi" %% "os-lib" % "0.9.1", "com.lihaoyi" %% "scalatags" % "0.12.0"),
scalaVersion := scala3)

lazy val `static-server` = project .settings( libraryDependencies ++= Seq(
"org.http4s" %% "http4s-ember-server" % "0.23.22", "com.lihaoyi" %% "os-lib" %
"0.9.1"), scalaVersion := scala3)

lazy val root = project .in(file(".")) .aggregate( `art-gallery-site`,
`static-server`)

```

I've create a new project value `static-server` which will be located in the
`/static-server/` sub-directory of my repository and contain Scala code at
`/static-server/src/main/scala/server/` where `server` is the package name.

I've then created a Scala file which contains my `StaticServerApp` class at
`/static-server/src/main/scala/server/StaticServerApp.scala` with the following
code:

```scala mdoc:compile-only

import scalatags.Text.all.*
import cats.effect.*
import org.http4s.*
import com.comcast.ip4s.*
import org.http4s.server.staticcontent.*
import org.http4s.ember.server.*
import org.http4s.server.*

object ArtGalleryApp extends ResourceApp.Forever:

    val imagesPath = os.pwd / "images"
    val distPath = os.pwd / "dist"
    val distImagesPath = distPath / "images"
    val indexPath = distPath / "index.html"

    val gallery = Gallery(
        Painting.jpg("The Seine", "Henry Ossawa Tanner", 1902),
        Painting.jpg("Chateau Noir", "Paul Cezanne", 1904),
        Painting.jpg("The Gardener Vallier", "Paul Cezanne", 1906),
        Painting.jpg("Waterloo Bridge, London, at Sunset", "Claude Monet", 1904)
    )

    def setupGallery: Unit =
        println(s"Generating art gallery site at $distPath")

        os.remove.all(distPath)

        println(s"Copying images from $imagesPath to $distImagesPath")

        os.copy(imagesPath, distImagesPath, createFolders = true)

        println(s"Generating the index.html page at $indexPath")

        val htmlTag: Tag =
            html(
                body(
                    renderBasicTag(gallery)
                )
            )

        os.write(indexPath, htmlTag.render)

    def startServer: ResourceIO[Server] =
        EmberServerBuilder
            .default[IO]
            .withHost(ipv4"0.0.0.0")
            .withPort(port"8080")
            .withHttpApp(
                fileService[IO](
                    FileService.Config(distPath.toString())
                ).orNotFound
            )
            .build

    override def run(args: List[String]): ResourceIO[Unit] =
        Resource
            .pure(setupGallery)
            .flatMap(_ => startServer)
            .flatMap(server =>
                Resource.eval(IO.println(s"Started server '${server.baseUri}'"))
            )
```

The static server app creates a new http4s web server running on port 8080 of
the local machine.  We've defined the web server to handle all requests using
the static content `fileService` router, which serves all files located in the
local `/dist/` directory.

The static server can be run using the sbt command `static-server / run`.  When
started, http4s will output a message notifying us that the server is started.
The site can then be viewed on your local machine at `http://localhost:8080`.
