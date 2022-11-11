---
tags: ["Scala", "SBT", "Documentation"]
draft: false
---

# Building A Blog With Scala Mdoc And Docusaurus

This is my third or fourth iteration of a blog site.
I've tried a custom Angular app, Jekyll, Hugo, and now Mdoc + Docusaurus.

I've been writing Scala and JS for a few years now, so I'm a lot more comfortable with the tooling this time around (sorry Ruby) and feel confident enough to explain the project.
There are probably very few people who would choose SBT for building a blog, but maybe this can help out a fellow Scala dev with their own site.

For setting up the blog site, I used the following versions of tools:

- SBT 1.7.2
- Scala 2.13.10
- Mdoc 2.3.6
- Docusaurus 2.2.0
- Node 18.9.0
- Yarn 1.22.19

## Configuring SBT

If you aren't familiar with SBT, or even Scala, I would recommend trying out a basic Scala project first before diving in here.
The Scala site has a good [Getting Started](https://docs.scala-lang.org/getting-started/index.html) page with some helpful initial resources.

[SBT](https://www.scala-sbt.org/) is a modular and extensible build tool, designed for compiling JVM projects (Scala specifically), but suitable for just about any project (even compiling a blog).

I've configured my `build.sbt` to contain a module for compiling my blog posts and a root module for project aggregation.

```sbt
lazy val `posts-mdoc` = project // name something other than 'posts' or 'docs'
  .enablePlugins(MdocPlugin, DocusaurusPlugin) // I'll explain these in a bit
  .settings(
    mdocIn := file("posts"), // The directory containing the blog posts
    mdocOut := file("website/blog"), // The target directory for the compiled blog posts
    libraryDependencies ++= Seq(
      "org.typelevel" %% "cats-core" % "2.8.0" // 😺
    ),
    scalaVersion := "2.13.10" // The Scala version to use when compiling Scala snippets
  )

lazy val root = project
  .in(file("."))
  .settings(
    name := "blog",
    organization := "org.vennes"
  )
  .aggregate(`posts-mdoc`)
```

The `posts-mdoc` module is configured to use the `MdocPlugin` and `DocusaurusPlugin` plugins.
In order to use these plugins, you need to add the `sbt-mdoc` plugin artifact to the `project/plugins.sbt` file.

```sbt
addSbtPlugin("org.scalameta" % "sbt-mdoc" % "2.3.6" )
``` 

The `MdocPlugin` plugin compiles Scala code snippets in markdown files located in the `posts` directory and output into the `website/blog` directory.

By default, Mdoc uses the `docs` folder as the input directory, and the `target/mdoc` folder as the output directory.
I've changed the input directory to `posts` and the output directory to `website/blog`, which is where Docusaurus will expect blog posts to be landed at.

I've also included `cats-core` as a dependency for the `posts-mdoc` project.
Any dependencies you want to use in your Markdown Scala snippets should be added to the `libraryDependencies` collection.
If you haven't checked out [Cats](https://typelevel.org/cats/), I highly recommend taking a look once you are done reading!

## Initializing Docusaurus

Before initializing your Docusaurus website, be sure to install the following tools:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)

Docusaurus is a static site generator that can scaffold a blog with some nice-looking default styles.
It comes out of the box with a static site perfect for project documentation and/or a blog.
Fortunately, features can be enabled or disabled.
For my blog, I've disabled the documentation features and am only using the blogging options.

To initialize the Docusaurus project, run the following command:

```bash
npx create-docusaurus@latest website classic
```

Npx comes built-in with an installation of Node and NPM.
And although Npx was used to initialize the project, I will be using Yarn to run the Docusaurus commands and install dependencies.

Once the project has finished initializing, there will be a new `website` in the root of your blog project.

## Configuring Docusaurus

The `website` directory will contain multiple subdirectories and configuration files.
There are a lot of settings to tweak, but for this example, I'll only change the basics required for blog-only mode.

The `website/docusaurus.config.js` file contains the complete configuration for the Docusaurus project.
It is structured as a JavaScript object, which provides some type-safety of configuration settings.
Most editors may even provide some auto-completion for the various configurations.
I've found the auto-completion helpful for feature discovery.

For now, we are going to change a couple options in the config.
For reference, these steps follow closely with the [Blog Setup](https://docusaurus.io/docs/blog) instructions from the Docusaurus documentation.
If you'd like more details, I recommend checking out the documentation.

I will also be leaving all the default styles and layouts in place.
Docusaurus provides some documentation on [styling](https://docusaurus.io/docs/styling-layout), [theming](https://docusaurus.io/docs/using-plugins#using-themes), and [modifying](https://docusaurus.io/docs/swizzling) the site, but I will not be covering them in this post.

1. In the `themeConfig.navbar.items` array, remove the `docs` section and change the `to` field of the `blog` section to `/`.
    - Removes the `Docs` link from the navbar and changes the `Blog` link to point to the root of the website.
2. In `presets.docs`, set the `docs` field to `false`.
    - Disable the docs section of the website.
3. In `presets.blog`,  set the property `routeBasePath` to `'/'`.
4. Remove the `index.js` file from the `website/src/pages` directory.
    - Removes the default landing page from the website.
    - You may actually enjoy having the landing page, so feel free to skip this step.
    - The contents of 'index.js' can also be changed to be more blog-focused.

There will be a couple remaining text snippets and images that need to be updated to match your particular style, but I'll leave that up to you.

[Undraw](https://undraw.co/illustrations) has some great icons and illustrations that are free to use to add some flavor to your site.
Also, check out [Unsplash](https://unsplash.com/) for free stock photos that make great banner images.

## Creating The Site

Now that we have configured SBT and the Docusaurus project, we can create the site.

The Mdoc plugin provides some helpful utilities for compiling the Scala documentation and generating the Docusaurus site:

- `mdoc` - Compiles the markdown files in the `mdocIn` directory into the `mdocOut` directory.
- `docusaurusCreateSite` - Creates the Docusaurus site in the `website/build` directory.

But before we start, be sure to add a blog post or two to the `posts` directory.
If you need an example containing some Scala code, feel free to copy the content of my [Typeclasses and Ad Hoc Polymorphism Post](https://google.com).

To mark Scala code in your posts for compilation with Mdoc, be sure to use the `mdoc` tag after `scala` in the code block.

For example:

````markdown
```scala mdoc
val x = 1
x
```
````

For more info on Mdoc options, take a look at the [Mdoc Modifiers Documentation](https://scalameta.org/mdoc/docs/modifiers.html).

Now that we have some posts, we can create our site and serve it locally:

```bash
sbt docusaurusCreateSite
yarn --cwd website run serve
```

If you want to run the site in a development version instead, run `sbt mdoc` and then `yarn --cwd website start`.
This will run a server which reloads the site when changes are made to the markdown files.

And that's all there is to it!
