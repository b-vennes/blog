"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=r(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return n?a.createElement(h,l(l({ref:t},p),{},{components:n})):a.createElement(h,l({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,l=new Array(i);l[0]=d;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:o,l[1]=r;for(var u=2;u<i;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7962:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>r,toc:()=>u});var a=n(7462),o=(n(7294),n(3905));const i={tags:["Scala","SBT","Documentation"],draft:!1},l="Building A Blog With Scala Mdoc And Docusaurus",r={permalink:"/2022/11/07/building-a-blog",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-11-07-building-a-blog.md",source:"@site/blog/2022-11-07-building-a-blog.md",title:"Building A Blog With Scala Mdoc And Docusaurus",description:"This is a blog post showing how I set up this blog using SBT, Mdoc, and Docusaurus.",date:"2022-11-07T00:00:00.000Z",formattedDate:"November 7, 2022",tags:[{label:"Scala",permalink:"/tags/scala"},{label:"SBT",permalink:"/tags/sbt"},{label:"Documentation",permalink:"/tags/documentation"}],readingTime:5.53,hasTruncateMarker:!1,authors:[],frontMatter:{tags:["Scala","SBT","Documentation"],draft:!1},nextItem:{title:"Typeclasses and Ad-Hoc Polymorphism",permalink:"/2021/06/22/typeclass-and-ad-hoc-polymorphism"}},s={authorsImageUrls:[]},u=[{value:"Configuring SBT",id:"configuring-sbt",level:2},{value:"Initializing Docusaurus",id:"initializing-docusaurus",level:2},{value:"Configuring Docusaurus",id:"configuring-docusaurus",level:2},{value:"Creating The Site",id:"creating-the-site",level:2}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This is a blog post showing how I set up this blog using SBT, Mdoc, and Docusaurus.\nIt's a bit of a meta post, but I hope it's useful to someone.\nIt wasn't too complex of a task, but it helped me to have some pre-existing knowledge of all the tools."),(0,o.kt)("p",null,"For this post, I will be using the following versions of tools:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"SBT 1.7.2"),(0,o.kt)("li",{parentName:"ul"},"Scala 2.13.10"),(0,o.kt)("li",{parentName:"ul"},"Mdoc 2.3.6"),(0,o.kt)("li",{parentName:"ul"},"Docusaurus 2.2.0"),(0,o.kt)("li",{parentName:"ul"},"Node 18.9.0"),(0,o.kt)("li",{parentName:"ul"},"Yarn 1.22.19")),(0,o.kt)("h2",{id:"configuring-sbt"},"Configuring SBT"),(0,o.kt)("p",null,"If you aren't familiar with SBT, or even Scala, I would recommend trying out a basic Scala project first before diving in here.\nThe Scala site has a good ",(0,o.kt)("a",{parentName:"p",href:"https://docs.scala-lang.org/getting-started/index.html"},"Getting Started")," page with some helpful initial resources."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.scala-sbt.org/"},"SBT")," is a modular and extensible build tool, designed for compiling JVM projects (Scala specifically), but suitable for just about any project (even compiling a blog)."),(0,o.kt)("p",null,"I've configured my ",(0,o.kt)("inlineCode",{parentName:"p"},"build.sbt")," to contain a for compiling my blog posts and a root module for project aggregation.\nIn the future, if I want to provide some example code, I can add another module to the root."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sbt"},'lazy val `posts-mdoc` = project // name something other than \'posts\' or \'docs\'\n  .enablePlugins(MdocPlugin, DocusaurusPlugin) // I\'ll explain these in a bit\n  .settings(\n    mdocIn := file("posts"), // The directory containing the blog posts\n    mdocOut := file("website/blog"), // The target directory for the compiled blog posts\n    libraryDependencies ++= Seq(\n      "org.typelevel" %% "cats-core" % "2.8.0" // \ud83d\ude3a\n    ),\n    scalaVersion := "2.13.10" // The Scala version to use when compiling Scala snippets\n  )\n\nlazy val root = project\n  .in(file("."))\n  .settings(\n    name := "blog",\n    organization := "org.vennes"\n  )\n  .aggregate(`posts-mdoc`)\n')),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"posts-mdoc")," module is configured to use the ",(0,o.kt)("inlineCode",{parentName:"p"},"MdocPlugin")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"DocusaurusPlugin")," plugins.\nIn order to use these plugins, you need to add the ",(0,o.kt)("inlineCode",{parentName:"p"},"sbt-mdoc")," plugin artifact to the ",(0,o.kt)("inlineCode",{parentName:"p"},"project/plugins.sbt")," file."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sbt"},'addSbtPlugin("org.scalameta" % "sbt-mdoc" % "2.3.6" )\n')),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"MdocPlugin")," plugin compiles Scala code snippets in markdown files located in the ",(0,o.kt)("inlineCode",{parentName:"p"},"posts")," directory and output into the ",(0,o.kt)("inlineCode",{parentName:"p"},"website/blog")," directory."),(0,o.kt)("p",null,"By default, Mdoc uses the ",(0,o.kt)("inlineCode",{parentName:"p"},"docs")," folder as the input directory, and the ",(0,o.kt)("inlineCode",{parentName:"p"},"target/mdoc")," folder as the output directory.\nI've changed the input directory to ",(0,o.kt)("inlineCode",{parentName:"p"},"posts")," and the output directory to ",(0,o.kt)("inlineCode",{parentName:"p"},"website/blog"),", which is where Docusaurus will expect blog posts to be landed at."),(0,o.kt)("p",null,"I've also included ",(0,o.kt)("inlineCode",{parentName:"p"},"cats-core")," as a dependency for the ",(0,o.kt)("inlineCode",{parentName:"p"},"posts-mdoc")," project.\nAny dependencies you want to use in your Markdown Scala snippets should be added to the ",(0,o.kt)("inlineCode",{parentName:"p"},"libraryDependencies")," collection.\nIf you haven't checked out ",(0,o.kt)("a",{parentName:"p",href:"https://typelevel.org/cats/"},"Cats"),", I highly recommend taking a look once you are done reading!"),(0,o.kt)("h2",{id:"initializing-docusaurus"},"Initializing Docusaurus"),(0,o.kt)("p",null,"Before initializing your Docusaurus website, be sure to install the following tools:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://nodejs.org/en/"},"Node.js")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://yarnpkg.com/getting-started/install"},"Yarn"))),(0,o.kt)("p",null,"Docusaurus is a static site generator that can scaffold a blog with some nice-looking default styles.\nIt comes out of the box with a static site perfect for project documentation and/or a blog.\nFortunately, features can be enabled or disabled.\nFor my blog, I've disabled the documentation features and am only using the blogging options."),(0,o.kt)("p",null,"To initialize the Docusaurus project, run the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npx create-docusaurus@latest website classic\n")),(0,o.kt)("p",null,"Npx comes built-in with an installation of Node and NPM.\nAnd although Npx was used to initialize the project, I will be using Yarn to run the Docusaurus commands and install dependencies."),(0,o.kt)("p",null,"Once the project has finished initializing, there will be a new ",(0,o.kt)("inlineCode",{parentName:"p"},"website")," in the root of your blog project."),(0,o.kt)("h2",{id:"configuring-docusaurus"},"Configuring Docusaurus"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"website")," directory will contain multiple subdirectories and configuration files.\nThere are a lot of settings to tweak, but for this example, I'll only change the basics required for blog-only mode."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"website/docusaurus.config.js")," file contains the complete configuration for the Docusaurus project.\nIt is structured as a JavaScript object, which provides some type-safety of configuration settings.\nMost editors may even provide some auto-completion for the various configurations.\nI've found the auto-completion helpful for feature discovery."),(0,o.kt)("p",null,"For now, we are going to change a couple options in the config.\nFor reference, these steps follow closely with the ",(0,o.kt)("a",{parentName:"p",href:"https://docusaurus.io/docs/blog"},"Blog Setup")," instructions from the Docusaurus documentation.\nIf you'd like more details, I recommend checking out the documentation."),(0,o.kt)("p",null,"I will also be leaving all the default styles and layouts in place.\nDocusaurus provides some documentation on ",(0,o.kt)("a",{parentName:"p",href:"https://docusaurus.io/docs/styling-layout"},"styling"),", ",(0,o.kt)("a",{parentName:"p",href:"https://docusaurus.io/docs/using-plugins#using-themes"},"theming"),", and ",(0,o.kt)("a",{parentName:"p",href:"https://docusaurus.io/docs/swizzling"},"modifying")," the site, but I will not be covering them in this post."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"In the ",(0,o.kt)("inlineCode",{parentName:"li"},"themeConfig.navbar.items")," array, remove the ",(0,o.kt)("inlineCode",{parentName:"li"},"docs")," section and change the ",(0,o.kt)("inlineCode",{parentName:"li"},"to")," field of the ",(0,o.kt)("inlineCode",{parentName:"li"},"blog")," section to ",(0,o.kt)("inlineCode",{parentName:"li"},"/"),".",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Removes the ",(0,o.kt)("inlineCode",{parentName:"li"},"Docs")," link from the navbar and changes the ",(0,o.kt)("inlineCode",{parentName:"li"},"Blog")," link to point to the root of the website."))),(0,o.kt)("li",{parentName:"ol"},"In ",(0,o.kt)("inlineCode",{parentName:"li"},"presets.docs"),", set the ",(0,o.kt)("inlineCode",{parentName:"li"},"docs")," field to ",(0,o.kt)("inlineCode",{parentName:"li"},"false"),".",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Disable the docs section of the website."))),(0,o.kt)("li",{parentName:"ol"},"In ",(0,o.kt)("inlineCode",{parentName:"li"},"presets.blog"),",  set the property ",(0,o.kt)("inlineCode",{parentName:"li"},"routeBasePath")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"'/'"),"."),(0,o.kt)("li",{parentName:"ol"},"Remove the ",(0,o.kt)("inlineCode",{parentName:"li"},"index.js")," file from the ",(0,o.kt)("inlineCode",{parentName:"li"},"website/src/pages")," directory.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Removes the default landing page from the website."),(0,o.kt)("li",{parentName:"ul"},"You may actually enjoy having the landing page, so feel free to skip this step."),(0,o.kt)("li",{parentName:"ul"},"The contents of 'index.js' can also be changed to be more blog-focused.")))),(0,o.kt)("p",null,"There will be a couple remaining text snippets and images that need to be updated to match your particular style, but I'll leave that up to you."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://undraw.co/illustrations"},"Undraw")," has some great icons and illustrations that are free to use to add some flavor to your site.\nAlso, check out ",(0,o.kt)("a",{parentName:"p",href:"https://unsplash.com/"},"Unsplash")," for free stock photos that make great banner images."),(0,o.kt)("h2",{id:"creating-the-site"},"Creating The Site"),(0,o.kt)("p",null,"Now that we have configured SBT and the Docusaurus project, we can create the site."),(0,o.kt)("p",null,"The Mdoc plugin provides some helpful utilities for compiling the Scala documentation and generating the Docusaurus site:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"mdoc")," - Compiles the markdown files in the ",(0,o.kt)("inlineCode",{parentName:"li"},"mdocIn")," directory into the ",(0,o.kt)("inlineCode",{parentName:"li"},"mdocOut")," directory."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"docusaurusCreateSite")," - Creates the Docusaurus site in the ",(0,o.kt)("inlineCode",{parentName:"li"},"website/build")," directory.")),(0,o.kt)("p",null,"But before we start, be sure to add a blog post or two to the ",(0,o.kt)("inlineCode",{parentName:"p"},"posts")," directory.\nIf you need an example containing some Scala code, feel free to copy the content of my ",(0,o.kt)("a",{parentName:"p",href:"https://google.com"},"Typeclasses and Ad Hoc Polymorphism Post"),"."),(0,o.kt)("p",null,"To mark Scala code in your posts for compilation with Mdoc, be sure to use the ",(0,o.kt)("inlineCode",{parentName:"p"},"mdoc")," tag after ",(0,o.kt)("inlineCode",{parentName:"p"},"scala")," in the code block."),(0,o.kt)("p",null,"For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-markdown"},"```scala mdoc\nval x = 1\nx\n```\n")),(0,o.kt)("p",null,"For more info on Mdoc options, take a look at the ",(0,o.kt)("a",{parentName:"p",href:"https://scalameta.org/mdoc/docs/modifiers.html"},"Mdoc Modifiers Documentation"),"."),(0,o.kt)("p",null,"Now that we have some posts, we can create our site and serve it locally:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sbt docusaurusCreateSite\nyarn --cwd website run serve\n")),(0,o.kt)("p",null,"If you want to run the site in a development version instead, run ",(0,o.kt)("inlineCode",{parentName:"p"},"sbt mdoc")," and then ",(0,o.kt)("inlineCode",{parentName:"p"},"yarn --cwd website start"),".\nThis will run a server which reloads the site when changes are made to the markdown files."),(0,o.kt)("p",null,"And that's all there is to it!"))}c.isMDXComponent=!0}}]);