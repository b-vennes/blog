"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[782],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),u=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return o.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,g=d["".concat(s,".").concat(m)]||d[m]||p[m]||i;return n?o.createElement(g,l(l({ref:t},c),{},{components:n})):o.createElement(g,l({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:a,l[1]=r;for(var u=2;u<i;u++)l[u]=n[u];return o.createElement.apply(null,l)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2025:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>u});var o=n(7462),a=(n(7294),n(3905));const i={tags:["Scala","SBT","Documentation"],draft:!1},l="Building A Blog With Scala Mdoc And Docusaurus",r={permalink:"/2022/11/07/mdoc-blog",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-11-07-mdoc-blog.md",source:"@site/blog/2022-11-07-mdoc-blog.md",title:"Building A Blog With Scala Mdoc And Docusaurus",description:"This is a blog post showing how I set up this blog using SBT, Mdoc, and Docusaurus.",date:"2022-11-07T00:00:00.000Z",formattedDate:"November 7, 2022",tags:[{label:"Scala",permalink:"/tags/scala"},{label:"SBT",permalink:"/tags/sbt"},{label:"Documentation",permalink:"/tags/documentation"}],readingTime:4.745,hasTruncateMarker:!1,authors:[],frontMatter:{tags:["Scala","SBT","Documentation"],draft:!1},nextItem:{title:"Typeclasses and Ad-Hoc Polymorphism",permalink:"/2021/06/22/typeclass-and-ad-hoc-polymorphism"}},s={authorsImageUrls:[]},u=[{value:"Configuring SBT",id:"configuring-sbt",level:2},{value:"Initializing Docusaurus",id:"initializing-docusaurus",level:2},{value:"Configuring Docusaurus",id:"configuring-docusaurus",level:2},{value:"Creating The Site",id:"creating-the-site",level:2}],c={toc:u};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This is a blog post showing how I set up this blog using SBT, Mdoc, and Docusaurus.\nIt's a bit of a meta post, but I hope it's useful to someone.\nIt wasn't too complex of a task, but it helped me to have some pre-existing knowledge of all the tools."),(0,a.kt)("p",null,"For this post, I will be using the following versions of tools:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"SBT 1.7.2"),(0,a.kt)("li",{parentName:"ul"},"Scala 2.13.10"),(0,a.kt)("li",{parentName:"ul"},"Mdoc 2.3.6"),(0,a.kt)("li",{parentName:"ul"},"Docusaurus 2.2.0"),(0,a.kt)("li",{parentName:"ul"},"Node 18.9.0"),(0,a.kt)("li",{parentName:"ul"},"Yarn 1.22.19")),(0,a.kt)("h2",{id:"configuring-sbt"},"Configuring SBT"),(0,a.kt)("p",null,"If you aren't familiar with SBT, or even Scala, I would recommend trying out a basic Scala project first before diving in here.\nThe Scala site has a good ",(0,a.kt)("a",{parentName:"p",href:"https://docs.scala-lang.org/getting-started/index.html"},"Getting Started")," page with some helpful initial resources."),(0,a.kt)("p",null,"SBT is a modular and extensible build tool, designed for compiling JVM projects (Scala specifically), but suitable for just about any project (even compiling a blog)."),(0,a.kt)("p",null,"I've configured SBT to contain a module containing the tasks to compile my blog posts, and another module to aggregate all modules in the build.\nIn the future, if I want to provide some example code, I can add another module to the root."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sbt"},'lazy val `posts-mdoc` = project\n  .enablePlugins(MdocPlugin, DocusaurusPlugin)\n  .settings(\n    mdocIn := file("posts"),\n    mdocOut := file("website/blog"),\n    libraryDependencies ++= Seq(\n      "org.typelevel" %% "cats-core" % "2.8.0"\n    ),\n    scalaVersion := "2.13.8"\n  )\n\nlazy val root = project\n  .in(file("."))\n  .settings(\n    name := "blog",\n    organization := "org.vennes"\n  )\n  .aggregate(`posts-mdoc`)\n')),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"posts-mdoc")," module is configured to use the ",(0,a.kt)("inlineCode",{parentName:"p"},"MdocPlugin")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"DocusaurusPlugin")," plugins.\nIn order to use these plugins, you need to add the ",(0,a.kt)("inlineCode",{parentName:"p"},"sbt-mdoc")," plugin artifact to the ",(0,a.kt)("inlineCode",{parentName:"p"},"project/plugins.sbt")," file."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sbt"},'addSbtPlugin("org.scalameta" % "sbt-mdoc" % "2.3.6" )\n')),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"MdocPlugin")," plugin is used to compile the Scala code in the markdown files from the ",(0,a.kt)("inlineCode",{parentName:"p"},"posts")," directory into the ",(0,a.kt)("inlineCode",{parentName:"p"},"website/blog")," directory."),(0,a.kt)("p",null,"By default, Mdoc uses the ",(0,a.kt)("inlineCode",{parentName:"p"},"docs")," folder as the input directory, and the ",(0,a.kt)("inlineCode",{parentName:"p"},"target/mdoc")," folder as the output directory.\nHowever, since we are writing a blog and not project documentation, I've changed the input directory to ",(0,a.kt)("inlineCode",{parentName:"p"},"posts")," and the output directory to ",(0,a.kt)("inlineCode",{parentName:"p"},"website/blog"),", which is where Docusaurus will expect blog posts to be located."),(0,a.kt)("p",null,"I've also included ",(0,a.kt)("inlineCode",{parentName:"p"},"cats-core")," as a dependency for the ",(0,a.kt)("inlineCode",{parentName:"p"},"posts-mdoc")," project.\nAny dependencies you want to use in your blog posts should be added to the ",(0,a.kt)("inlineCode",{parentName:"p"},"libraryDependencies")," collection.\nAnd ",(0,a.kt)("a",{parentName:"p",href:"https://typelevel.org/cats"},"Cats")," is a great library, so I use it often."),(0,a.kt)("h2",{id:"initializing-docusaurus"},"Initializing Docusaurus"),(0,a.kt)("p",null,"Before initializing your Docusaurus website, be sure to install the following tools:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://nodejs.org/en/"},"Node.js")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://yarnpkg.com/getting-started/install"},"Yarn"))),(0,a.kt)("p",null,"Docusaurus is a static site generator that can scaffold a blog with some nice-looking default styles.\nBy default, it creates a section for any project documentation and project blog posts.\nBut, it also has a blog-only mode that is perfect for displaying and organizing blog posts."),(0,a.kt)("p",null,"To initialize the Docusaurus project, I ran the following command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx create-docusaurus@latest website classic\n")),(0,a.kt)("p",null,"Npx comes built in with the installation of Node and NPM.\nAnd although I have used Npx to initialize the project. I will be using Yarn to run the Docusaurus commands."),(0,a.kt)("p",null,"After running the initialization command, there will be a new ",(0,a.kt)("inlineCode",{parentName:"p"},"website")," directory within your project."),(0,a.kt)("h2",{id:"configuring-docusaurus"},"Configuring Docusaurus"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"website")," directory will contain multiple sub-directories and configuration files.\nThere are a lot of settings to tweak, but for this example, I'll only change the basics to get to blog-only mode."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"website/docusaurus.config.js")," file contains the complete configuration for the Docusaurus project.\nIt is structured as a JavaScript object, which provides some type-safety of configuration settings.\nMost editors may even provide some auto-completion for the various configurations."),(0,a.kt)("p",null,"We are going to change a couple options in the config.\nI am primarily following the ",(0,a.kt)("a",{parentName:"p",href:"https://docusaurus.io/docs/blog"},"Blog Setup")," instructions from the Docusarus documentation."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"In the themeConfig.navbar.items array, remove the ",(0,a.kt)("inlineCode",{parentName:"li"},"docs")," section and change the ",(0,a.kt)("inlineCode",{parentName:"li"},"to")," field of the ",(0,a.kt)("inlineCode",{parentName:"li"},"blog")," section to ",(0,a.kt)("inlineCode",{parentName:"li"},"/"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"This will remove the ",(0,a.kt)("inlineCode",{parentName:"li"},"Docs")," link from the navbar and change the ",(0,a.kt)("inlineCode",{parentName:"li"},"Blog")," link to point to the root of the website."))),(0,a.kt)("li",{parentName:"ol"},"In ",(0,a.kt)("inlineCode",{parentName:"li"},"presets.docs"),", set the ",(0,a.kt)("inlineCode",{parentName:"li"},"docs")," field to ",(0,a.kt)("inlineCode",{parentName:"li"},"false"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"This will disable the docs section of the website."))),(0,a.kt)("li",{parentName:"ol"},"In ",(0,a.kt)("inlineCode",{parentName:"li"},"presets.blog"),", set the following values:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"routeBasePath")," -> ",(0,a.kt)("inlineCode",{parentName:"li"},"'/'")))),(0,a.kt)("li",{parentName:"ol"},"Remove the ",(0,a.kt)("inlineCode",{parentName:"li"},"index.js")," file from the ",(0,a.kt)("inlineCode",{parentName:"li"},"website/src/pages")," directory.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"This will remove the default index page from the website which has the project documentation intro.")))),(0,a.kt)("p",null,"There will be a couple remaining strings that need to be updated to match your particular style, but I'll leave that up to you."),(0,a.kt)("h2",{id:"creating-the-site"},"Creating The Site"),(0,a.kt)("p",null,"Now that we have configured SBT and the Docusaurus project, we can create the site."),(0,a.kt)("p",null,"The Mdoc plugin provides some helpful utilities for compiling the Scala documentation and generating the Docusaurus site:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"mdoc")," - Compiles the markdown files in the ",(0,a.kt)("inlineCode",{parentName:"li"},"mdocIn")," directory into the ",(0,a.kt)("inlineCode",{parentName:"li"},"mdocOut")," directory."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"docusaurusCreateSite")," - Creates the Docusaurus site in the ",(0,a.kt)("inlineCode",{parentName:"li"},"website/build")," directory."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"docusaurusPublishGhpages")," - Deploys the Docusaurus site to the ",(0,a.kt)("inlineCode",{parentName:"li"},"gh-pages")," branch of the GitHub repository.")),(0,a.kt)("p",null,"But before we start, be sure to add a blog post or two to the ",(0,a.kt)("inlineCode",{parentName:"p"},"posts")," directory.\nIf you need an example containing some Scala code, feel free to copy the content of my ",(0,a.kt)("a",{parentName:"p",href:"https://google.com"},"Typeclasses and Ad Hoc Polymorphism Post"),"."),(0,a.kt)("p",null,"To mark Scala code in your posts for compilation with Mdoc, be sure to use the ",(0,a.kt)("inlineCode",{parentName:"p"},"mdoc")," tag after ",(0,a.kt)("inlineCode",{parentName:"p"},"scala")," in the code block."),(0,a.kt)("p",null,"For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-markdown"},"```scala mdoc\nval x = 1\nx\n```\n")),(0,a.kt)("p",null,"For more info on Mdoc options, take a look at the ",(0,a.kt)("a",{parentName:"p",href:"https://scalameta.org/mdoc/docs/modifiers.html"},"Mdoc Modifiers Documentation"),"."),(0,a.kt)("p",null,"Now that we have some posts, we can create our site and serve it locally:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sbt docusaurusCreateSite\nyarn --cwd website run serve\n")),(0,a.kt)("p",null,"If you want to just compile your docs after creating the site, run ",(0,a.kt)("inlineCode",{parentName:"p"},"sbt mdoc")," instead of ",(0,a.kt)("inlineCode",{parentName:"p"},"sbt docusaurusCreateSite"),"."),(0,a.kt)("p",null,"And that's all there is to it!"))}p.isMDXComponent=!0}}]);