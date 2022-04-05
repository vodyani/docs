// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VODYANI',
  tagline: '使用 Node.js 构建服务端项目的不二选择。',
  url: 'https://vodyani.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'Vodyani',
  projectName: 'Vodyani',
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn', 'en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // docs: {
        //   sidebarPath: require.resolve('./sidebars.js'),
        //   // Please change this to your repo.
        //   editUrl: 'https://github.com/vodyani/tree/main/packages/create-vodyani/templates/shared/',
        // },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/vodyani/tree/main/packages/create-vodyani/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // themes: ['@docusaurus/theme-search-algolia'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // SEO
      metadata: [
        { name: "Vodyani", content: "Vodyani" },
      ],
      navbar: {
        title: 'Vodyani',
        logo: {
          alt: 'Vodyani Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            label: 'Docs',
            docId: 'intro',
            position: 'left',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },
          {
            type: "dropdown",
            label: "v8.x",
            position: 'right',
            items: [
              {
                label: "v8.x",
                href: "https://vodyani.vercel.app/8",
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: "search",
            position: "right",
          },
          {
            href: 'https://github.com/vodyani',
            position: 'right',
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      // todo: 增加文档页面的配置
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/vodyani',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ChoGathK, Inc. `,
      },
      // todo: 增加引用 https://www.algolia.com/account/api-keys/all?applicationId=7EZHM0IPQ0
      algolia: {
        // The application ID provided by Algolia
        appId: '7EZHM0IPQ0',
        // Public API key: it is safe to commit it
        apiKey: '57d416d2d6ed76a1a71a45912177df30',
        indexName: 'vodyani',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
    }),
};

module.exports = config;
