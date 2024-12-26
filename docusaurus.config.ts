import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightLines from "rehype-highlight-code-lines";

import { readFileSync } from 'fs'
import { load } from 'js-yaml';

import indexPeople from './utils/indexPeople';

const config: Config = {
  title: 'Data Semantics Lab',
  favicon: 'logo.svg',
  url: 'https://daselab.cs.ksu.edu',
  baseUrl: '/',
  projectName: 'dase-lab',

  plugins: [
    'docusaurus-plugin-sass',
    'docusaurus-lunr-search'
  ],

  customFields: {
    ...Object.fromEntries(
    ['homepage', 'publications', 'projects'].map(
      resource => [resource,
      load(readFileSync(
        `./static/data/${resource}.yaml`, 'utf8'
      ))]
    )),

    'people': indexPeople()
  },

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  future: { experimental_faster: true },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [
            rehypeMathjax,
            rehypeHighlight,
            rehypeHighlightLines
          ],
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },

          blogSidebarTitle: 'Blog Entries',
          blogSidebarCount: 'ALL',
          
        },

        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },

        theme: { customCss: './static/styles.scss' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Data Semantics Lab',
      logo: {
        alt: 'Site Logo',
        src: 'logo.svg',
        className: 'siteLogo'
      },
      items: ['People', 'Research', 'Blog'].map(
        label => ({
          to: `/${label.toLowerCase()}`,
          label,
          position: 'right'
        })
      )
    },
    footer: {
      copyright: `Unless stated otherwise, written content on this website 
      is licensed under CC-BY 4.0, and software under the MIT License.`
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
