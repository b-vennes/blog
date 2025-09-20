//> using scala "3.3.1"
//> using dep "org.typelevel::cats-effect:3.5.2"
//> using dep "com.lihaoyi::os-lib:0.9.3"
//> using dep "com.lihaoyi::scalatags:0.12.0"
//> using dep "org.http4s::http4s-ember-server:0.23.25"
//> using dep "com.lihaoyi::cask::0.9.1"
import scalatags.Text.all.*
import cats.effect.*
import org.http4s.*
import com.comcast.ip4s.*
import org.http4s.server.staticcontent.*
import org.http4s.ember.server.*
import org.http4s.server.*

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
            name.toLowerCase().replace(", ", "_").replace(" ", "_"),
            "jpg"
        )

case class Gallery(paintings: List[Painting])

object Gallery:
    def apply(paintings: Painting*): Gallery =
        new Gallery(paintings.toList)

def fileName(painting: Painting): String =
    s"${painting.id}.${painting.filetype}"

def renderBasicTag(painting: Painting): Tag =
    div(
        img(src := s"/images/${fileName(painting)}"),
        p(s"Name: ${painting.name}"),
        p(s"Artist: ${painting.artist}"),
        p(s"Year: ${painting.year}")
    )

def renderBasicTag(gallery: Gallery): Tag =
    div(
        h1("Art Gallery"),
        div(gallery.paintings.map(renderBasicTag))
    )

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

object TestCask extends cask.MainRoutes:
    @cask.staticFiles("/")
    def dist() = "dist"
