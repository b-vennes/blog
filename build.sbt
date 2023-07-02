lazy val blog = project
  .in(file("."))
  .enablePlugins(MdocPlugin, DocusaurusPlugin)
  .settings(
    organization := "org.vennes",
    mdocIn := file("posts"),
    mdocOut := file("website/blog"),
    libraryDependencies ++= Seq(
      "org.typelevel" %% "cats-core" % "2.9.0"
    ),
    scalaVersion := "3.2.2",
  )
