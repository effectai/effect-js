import { defineConfig } from 'vocs'
import pkg from '../package.json'
import { sidebar } from './sidebar'

export default defineConfig({
  baseUrl: 'https://effect.ai',
  title: 'Effect JS',
  titleTemplate: '%s · Effect.AI',
  description:
    'Effect-js is a free and open-source library powered by blockchain technology that enables developers to collect and enrich their data-sets in a transparent way.',
  ogImageUrl: {
    '/': '/og-image.png',
  },
  iconUrl: { light: '/favicons/light.png', dark: '/favicons/dark.png' },
  logoUrl: { light: '/effect-logo-black.png', dark: '/effect-logo-black.png' },
  rootDir: '.',
  sidebar,
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/effectai',
    },
    {
      icon: 'discord',
      link: 'https://discord.gg/effectnetwork',
    },
    {
      icon: 'x',
      link: 'https://x.com/effectaix',
    },
  ],
  theme: {
    accentColor: {
      light: '#333',
      dark: '#ffc517',
    },
  },
  topNav: [
    { text: 'Docs', link: '/docs/getting-started', match: '/docs' },
    {
      text: 'Examples',
      link: 'https://github.com/effectai/effect-js/tree/main/examples',
    },
    {
      text: pkg.version,
      items: [
        {
          text: `Migrating to ${toPatchVersionRange(pkg.version)}`,
          link: `/docs/migration-guide#_${toPatchVersionRange(
            pkg.version,
          ).replace(/\./g, '-')}-breaking-changes`,
        },
        {
          text: 'Changelog',
          link: 'https://github.com/effectai/effect-js/blob/main/CHANGELOG.MD',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/effectai/effect-js/blob/main/CONTRIBUTING.MD',
        },
      ],
    },
  ],
})

function toPatchVersionRange(version: string) {
  const [major, minor] = version.split('.').slice(0, 2)
  return `${major}.${minor}.x`
}