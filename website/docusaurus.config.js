// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Branden Vennes',
  tagline: 'Guides and Thoughts on Functional Programming and Scala',
  url: 'https://www.brandenvennes.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'b-vennes', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.

  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          blogTitle: 'Branden Vennes',
          blogDescription: 'Functional Programming, Scala, and AWS',
          postsPerPage: 10,
          blogSidebarTitle: 'Posts',
          routeBasePath: '/',
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Branden Vennes',
        logo: {
          alt: 'Blog Logo',
          src: 'img/ai-logo.svg',
        },
        items: [
          { to: '/', label: 'Blog', position: 'left' },
          {
            to: '/about',
            label: 'About',
            position: 'right'
          },
          {
            href: 'https://github.com/b-vennes/',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.linkedin.com/in/branden-vennes-a70355145/',
            label: 'LinkedIn',
            position: 'right',
          }
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['java', 'scala', 'csharp', 'python', 'rust'],
      },
    }),
};

module.exports = config;
