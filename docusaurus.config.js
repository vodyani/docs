// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vodyani',
  tagline: '构建企业级 web 框架的不二之选 ✨',
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
            label: '指南',
            docId: 'intro',
            position: 'left',
          },
          // todo: 增加版本控制
          // {
          //   type: "dropdown",
          //   label: "v8.x",
          //   position: 'right',
          //   items: [
          //     {
          //       label: "v8.x",
          //       href: "https://vodyani.vercel.app/8",
          //     },
          //   ],
          // },
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
      // todo: 增加页脚内容
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
    }),
    themes: [
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        {
          hashed: true,
          language: ["en", "zh"],
          translations: {
            "search_placeholder": "Search",
            "see_all_results": "See all results",
            "no_results": "No results.",
            "search_results_for": "Search results for \"{{ keyword }}\"",
            "search_the_documentation": "Search the documentation",
            "count_documents_found": "{{ count }} document found",
            "count_documents_found_plural": "{{ count }} documents found",
            "no_documents_were_found": "No documents were found"
          }
        },
      ],
    ],
};

module.exports = config;
