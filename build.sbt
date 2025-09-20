val scala3 = "3.3.1"

lazy val `blog-posts` = project
  .enablePlugins(MdocPlugin, DocusaurusPlugin)
  .settings(
    mdocIn := file("posts"),
    mdocOut := file("website/blog"),
    libraryDependencies ++= Seq(
      "org.typelevel" %% "cats-core" % "2.9.0",
      "com.lihaoyi" %% "scalatags" % "0.12.0",
      "com.lihaoyi" %% "os-lib" % "0.9.1",
    ),
    scalaVersion := scala3,
  )

lazy val root = project
  .in(file("."))
  .settings(
    organization := "com.brandenvennes"
  )
  .aggregate(`blog-posts`)
