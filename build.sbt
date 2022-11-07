val scala213 = "2.13.8"

lazy val `posts-mdoc` = project
  .in(file("."))
  .enablePlugins(MdocPlugin, DocusaurusPlugin)
  .settings(
    mdocIn := file("posts"),
    mdocOut := file("website/blog"),
    libraryDependencies ++= Seq(
      "org.typelevel" %% "cats-core" % "2.8.0",
    ),
    scalaVersion := scala213
  )

lazy val root = project
  .in(file("."))
  .settings(
    name := "blog"
  )
  .aggregate(`posts-mdoc`)
