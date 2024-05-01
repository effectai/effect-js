// vocs.config.tsx
import { defineConfig } from "file:///home/jeffrey/Projects/effect-js/docs/node_modules/vocs/_lib/index.js";

// ../package.json
var package_default = {
  name: "@effectai/effect-js",
  version: "2.0.0",
  description: "Effect Network Javscript/Typescript SDK (for [https://effect.network](https://effect.network))",
  main: "./dist/exports/index.js",
  module: "./dist/exports/index.js",
  browser: "dist/exports/index.js",
  types: "./dist/exports/index.d.ts",
  files: ["dist"],
  scripts: {
    test: "bun --env-file=.env test",
    "test:watch": "bun --env-file=.env test --watch",
    "test:coverage": "bun --env-file=.env test --coverage",
    "test:mainnet": "bun --env-file=.env.mainnet test",
    dev: "tsc -w",
    build: "tsc --module es2020",
    lint: "bun biome lint --apply .",
    format: "biome format --write .",
    check: "bun biome check --apply .",
    changeset: "changeset",
    "changeset:public": "bun scripts/updateVersion.ts && bun build && changeset publish",
    "changeset:version": "changeset version && bun install --frozen-lockfile && bun scripts/updateVersion.ts",
    "docs:dev": "cd docs && bun run dev",
    "docs:build": "cd docs && bun run build",
    "docs:preview": "cd docs && bun run preview"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/effectai/effect-js.git"
  },
  keywords: ["efx", "AI", "blockchain", "microtasks"],
  author: {
    name: "Effect-AI",
    url: "https://effect.network",
    email: "hello@effect.ai"
  },
  publishConfig: {
    access: "public"
  },
  license: "MIT",
  bugs: {
    url: "https://github.com/effectai/effect-js/issues"
  },
  homepage: "https://github.com/effectai/effect-js#readme",
  devDependencies: {
    "@biomejs/biome": "1.7.0",
    "@changesets/changelog-github": "^0.4.5",
    "@changesets/cli": "^2.23.2",
    "@size-limit/preset-big-lib": "^11.1.2",
    "@greymass/abi2core": "^2.0.1",
    typescript: "^5.4.3"
  },
  dependencies: {
    "@wharfkit/antelope": "^1.0.7",
    "@wharfkit/session": "^1.2.8",
    "@wharfkit/wallet-plugin-privatekey": "^1.0.0",
    ajv: "^8.12.0",
    atomicassets: "^1.5.1",
    "idb-keyval": "^6.2.1",
    "node-localstorage": "^3.0.5"
  },
  trustedDependencies: ["@biomejs/biome"]
};

// sidebar.ts
var sidebar = {
  "/docs/": [
    {
      text: "Introduction",
      items: [
        { text: "Why Effect AI", link: "/docs/introduction" },
        { text: "Getting Started", link: "/docs/getting-started" },
        { text: "Local Development", link: "/docs/localDevelopment" }
      ]
    },
    {
      text: "Collecting Data with Effect",
      items: [
        {
          text: "Introduction",
          link: "/docs/collecting-data/introduction"
        },
        {
          text: "Data Collection",
          link: "/docs/collecting-data/creatingACampaign"
        }
      ]
    },
    {
      text: "SDK API",
      items: [
        {
          text: "Token",
          items: [{ link: "/docs/token/getPrice", text: "getPrice" }]
        },
        {
          text: "Tasks",
          items: [
            {
              text: "getCampaigns",
              link: "/docs/tasks/campaigns/getCampaigns"
            }
          ]
        }
      ]
    },
    {
      text: "Glossary",
      items: [{ text: "Client Options", link: "/docs/glossary/clientOptions" }]
    },
    {
      text: "FAQ",
      items: [{ text: "FAQ", link: "/docs/faq" }]
    }
  ]
};

// vocs.config.tsx
var vocs_config_default = defineConfig({
  baseUrl: "https://effect.ai",
  title: "Effect JS",
  titleTemplate: "%s \xB7 Effect.AI",
  description: "Effect-js is a free and open-source library powered by blockchain technology that enables developers to collect and enrich their data-sets in a transparent way.",
  ogImageUrl: {
    "/": "/og-image.png"
  },
  iconUrl: { light: "/favicons/light.png", dark: "/favicons/dark.png" },
  logoUrl: { light: "/effect-logo-black.png", dark: "/effect-logo-black.png" },
  rootDir: ".",
  sidebar,
  socials: [
    {
      icon: "github",
      link: "https://github.com/effectai"
    },
    {
      icon: "discord",
      link: "https://discord.gg/effectnetwork"
    },
    {
      icon: "x",
      link: "https://x.com/effectaix"
    }
  ],
  theme: {
    accentColor: {
      light: "#333",
      dark: "#ffc517"
    }
  },
  topNav: [
    { text: "Docs", link: "/docs/getting-started", match: "/docs" },
    {
      text: "Examples",
      link: "https://github.com/effectai/effect-js/tree/main/examples"
    },
    {
      text: package_default.version,
      items: [
        {
          text: `Migrating to ${toPatchVersionRange(package_default.version)}`,
          link: `/docs/migration-guide#_${toPatchVersionRange(
            package_default.version
          ).replace(/\./g, "-")}-breaking-changes`
        },
        {
          text: "Changelog",
          link: "https://github.com/effectai/effect-js/blob/main/CHANGELOG.MD"
        },
        {
          text: "Contributing",
          link: "https://github.com/effectai/effect-js/blob/main/CONTRIBUTING.MD"
        }
      ]
    }
  ]
});
function toPatchVersionRange(version) {
  const [major, minor] = version.split(".").slice(0, 2);
  return `${major}.${minor}.x`;
}
export {
  vocs_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHN4IiwgIi4uL3BhY2thZ2UuanNvbiIsICJzaWRlYmFyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidm9jc1wiO1xuaW1wb3J0IHBrZyBmcm9tIFwiLi4vcGFja2FnZS5qc29uXCI7XG5pbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSBcIi4vc2lkZWJhclwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRiYXNlVXJsOiBcImh0dHBzOi8vZWZmZWN0LmFpXCIsXG5cdHRpdGxlOiBcIkVmZmVjdCBKU1wiLFxuXHR0aXRsZVRlbXBsYXRlOiBcIiVzIFx1MDBCNyBFZmZlY3QuQUlcIixcblx0ZGVzY3JpcHRpb246XG5cdFx0XCJFZmZlY3QtanMgaXMgYSBmcmVlIGFuZCBvcGVuLXNvdXJjZSBsaWJyYXJ5IHBvd2VyZWQgYnkgYmxvY2tjaGFpbiB0ZWNobm9sb2d5IHRoYXQgZW5hYmxlcyBkZXZlbG9wZXJzIHRvIGNvbGxlY3QgYW5kIGVucmljaCB0aGVpciBkYXRhLXNldHMgaW4gYSB0cmFuc3BhcmVudCB3YXkuXCIsXG5cdG9nSW1hZ2VVcmw6IHtcblx0XHRcIi9cIjogXCIvb2ctaW1hZ2UucG5nXCIsXG5cdH0sXG5cdGljb25Vcmw6IHsgbGlnaHQ6IFwiL2Zhdmljb25zL2xpZ2h0LnBuZ1wiLCBkYXJrOiBcIi9mYXZpY29ucy9kYXJrLnBuZ1wiIH0sXG5cdGxvZ29Vcmw6IHsgbGlnaHQ6IFwiL2VmZmVjdC1sb2dvLWJsYWNrLnBuZ1wiLCBkYXJrOiBcIi9lZmZlY3QtbG9nby1ibGFjay5wbmdcIiB9LFxuXHRyb290RGlyOiBcIi5cIixcblx0c2lkZWJhcixcblx0c29jaWFsczogW1xuXHRcdHtcblx0XHRcdGljb246IFwiZ2l0aHViXCIsXG5cdFx0XHRsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9lZmZlY3RhaVwiLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0aWNvbjogXCJkaXNjb3JkXCIsXG5cdFx0XHRsaW5rOiBcImh0dHBzOi8vZGlzY29yZC5nZy9lZmZlY3RuZXR3b3JrXCIsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpY29uOiBcInhcIixcblx0XHRcdGxpbms6IFwiaHR0cHM6Ly94LmNvbS9lZmZlY3RhaXhcIixcblx0XHR9LFxuXHRdLFxuXHR0aGVtZToge1xuXHRcdGFjY2VudENvbG9yOiB7XG5cdFx0XHRsaWdodDogXCIjMzMzXCIsXG5cdFx0XHRkYXJrOiBcIiNmZmM1MTdcIixcblx0XHR9LFxuXHR9LFxuXHR0b3BOYXY6IFtcblx0XHR7IHRleHQ6IFwiRG9jc1wiLCBsaW5rOiBcIi9kb2NzL2dldHRpbmctc3RhcnRlZFwiLCBtYXRjaDogXCIvZG9jc1wiIH0sXG5cdFx0e1xuXHRcdFx0dGV4dDogXCJFeGFtcGxlc1wiLFxuXHRcdFx0bGluazogXCJodHRwczovL2dpdGh1Yi5jb20vZWZmZWN0YWkvZWZmZWN0LWpzL3RyZWUvbWFpbi9leGFtcGxlc1wiLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dGV4dDogcGtnLnZlcnNpb24sXG5cdFx0XHRpdGVtczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGV4dDogYE1pZ3JhdGluZyB0byAke3RvUGF0Y2hWZXJzaW9uUmFuZ2UocGtnLnZlcnNpb24pfWAsXG5cdFx0XHRcdFx0bGluazogYC9kb2NzL21pZ3JhdGlvbi1ndWlkZSNfJHt0b1BhdGNoVmVyc2lvblJhbmdlKFxuXHRcdFx0XHRcdFx0cGtnLnZlcnNpb24sXG5cdFx0XHRcdFx0KS5yZXBsYWNlKC9cXC4vZywgXCItXCIpfS1icmVha2luZy1jaGFuZ2VzYCxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6IFwiQ2hhbmdlbG9nXCIsXG5cdFx0XHRcdFx0bGluazogXCJodHRwczovL2dpdGh1Yi5jb20vZWZmZWN0YWkvZWZmZWN0LWpzL2Jsb2IvbWFpbi9DSEFOR0VMT0cuTURcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6IFwiQ29udHJpYnV0aW5nXCIsXG5cdFx0XHRcdFx0bGluazogXCJodHRwczovL2dpdGh1Yi5jb20vZWZmZWN0YWkvZWZmZWN0LWpzL2Jsb2IvbWFpbi9DT05UUklCVVRJTkcuTURcIixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0fSxcblx0XSxcbn0pO1xuXG5mdW5jdGlvbiB0b1BhdGNoVmVyc2lvblJhbmdlKHZlcnNpb246IHN0cmluZykge1xuXHRjb25zdCBbbWFqb3IsIG1pbm9yXSA9IHZlcnNpb24uc3BsaXQoXCIuXCIpLnNsaWNlKDAsIDIpO1xuXHRyZXR1cm4gYCR7bWFqb3J9LiR7bWlub3J9LnhgO1xufVxuIiwgIntcblx0XCJuYW1lXCI6IFwiQGVmZmVjdGFpL2VmZmVjdC1qc1wiLFxuXHRcInZlcnNpb25cIjogXCIyLjAuMFwiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwiRWZmZWN0IE5ldHdvcmsgSmF2c2NyaXB0L1R5cGVzY3JpcHQgU0RLIChmb3IgW2h0dHBzOi8vZWZmZWN0Lm5ldHdvcmtdKGh0dHBzOi8vZWZmZWN0Lm5ldHdvcmspKVwiLFxuXHRcIm1haW5cIjogXCIuL2Rpc3QvZXhwb3J0cy9pbmRleC5qc1wiLFxuXHRcIm1vZHVsZVwiOiBcIi4vZGlzdC9leHBvcnRzL2luZGV4LmpzXCIsXG5cdFwiYnJvd3NlclwiOiBcImRpc3QvZXhwb3J0cy9pbmRleC5qc1wiLFxuXHRcInR5cGVzXCI6IFwiLi9kaXN0L2V4cG9ydHMvaW5kZXguZC50c1wiLFxuXHRcImZpbGVzXCI6IFtcImRpc3RcIl0sXG5cdFwic2NyaXB0c1wiOiB7XG5cdFx0XCJ0ZXN0XCI6IFwiYnVuIC0tZW52LWZpbGU9LmVudiB0ZXN0XCIsXG5cdFx0XCJ0ZXN0OndhdGNoXCI6IFwiYnVuIC0tZW52LWZpbGU9LmVudiB0ZXN0IC0td2F0Y2hcIixcblx0XHRcInRlc3Q6Y292ZXJhZ2VcIjogXCJidW4gLS1lbnYtZmlsZT0uZW52IHRlc3QgLS1jb3ZlcmFnZVwiLFxuXHRcdFwidGVzdDptYWlubmV0XCI6IFwiYnVuIC0tZW52LWZpbGU9LmVudi5tYWlubmV0IHRlc3RcIixcblx0XHRcImRldlwiOiBcInRzYyAtd1wiLFxuXHRcdFwiYnVpbGRcIjogXCJ0c2MgLS1tb2R1bGUgZXMyMDIwXCIsXG5cdFx0XCJsaW50XCI6IFwiYnVuIGJpb21lIGxpbnQgLS1hcHBseSAuXCIsXG5cdFx0XCJmb3JtYXRcIjogXCJiaW9tZSBmb3JtYXQgLS13cml0ZSAuXCIsXG5cdFx0XCJjaGVja1wiOiBcImJ1biBiaW9tZSBjaGVjayAtLWFwcGx5IC5cIixcblx0XHRcImNoYW5nZXNldFwiOiBcImNoYW5nZXNldFwiLFxuXHRcdFwiY2hhbmdlc2V0OnB1YmxpY1wiOiBcImJ1biBzY3JpcHRzL3VwZGF0ZVZlcnNpb24udHMgJiYgYnVuIGJ1aWxkICYmIGNoYW5nZXNldCBwdWJsaXNoXCIsXG5cdFx0XCJjaGFuZ2VzZXQ6dmVyc2lvblwiOiBcImNoYW5nZXNldCB2ZXJzaW9uICYmIGJ1biBpbnN0YWxsIC0tZnJvemVuLWxvY2tmaWxlICYmIGJ1biBzY3JpcHRzL3VwZGF0ZVZlcnNpb24udHNcIixcblx0XHRcImRvY3M6ZGV2XCI6IFwiY2QgZG9jcyAmJiBidW4gcnVuIGRldlwiLFxuXHRcdFwiZG9jczpidWlsZFwiOiBcImNkIGRvY3MgJiYgYnVuIHJ1biBidWlsZFwiLFxuXHRcdFwiZG9jczpwcmV2aWV3XCI6IFwiY2QgZG9jcyAmJiBidW4gcnVuIHByZXZpZXdcIlxuXHR9LFxuXHRcInJlcG9zaXRvcnlcIjoge1xuXHRcdFwidHlwZVwiOiBcImdpdFwiLFxuXHRcdFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9lZmZlY3RhaS9lZmZlY3QtanMuZ2l0XCJcblx0fSxcblx0XCJrZXl3b3Jkc1wiOiBbXCJlZnhcIiwgXCJBSVwiLCBcImJsb2NrY2hhaW5cIiwgXCJtaWNyb3Rhc2tzXCJdLFxuXHRcImF1dGhvclwiOiB7XG5cdFx0XCJuYW1lXCI6IFwiRWZmZWN0LUFJXCIsXG5cdFx0XCJ1cmxcIjogXCJodHRwczovL2VmZmVjdC5uZXR3b3JrXCIsXG5cdFx0XCJlbWFpbFwiOiBcImhlbGxvQGVmZmVjdC5haVwiXG5cdH0sXG5cdFwicHVibGlzaENvbmZpZ1wiOiB7XG5cdFx0XCJhY2Nlc3NcIjogXCJwdWJsaWNcIlxuXHR9LFxuXHRcImxpY2Vuc2VcIjogXCJNSVRcIixcblx0XCJidWdzXCI6IHtcblx0XHRcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9lZmZlY3RhaS9lZmZlY3QtanMvaXNzdWVzXCJcblx0fSxcblx0XCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9lZmZlY3RhaS9lZmZlY3QtanMjcmVhZG1lXCIsXG5cdFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcIkBiaW9tZWpzL2Jpb21lXCI6IFwiMS43LjBcIixcblx0XHRcIkBjaGFuZ2VzZXRzL2NoYW5nZWxvZy1naXRodWJcIjogXCJeMC40LjVcIixcblx0XHRcIkBjaGFuZ2VzZXRzL2NsaVwiOiBcIl4yLjIzLjJcIixcblx0XHRcIkBzaXplLWxpbWl0L3ByZXNldC1iaWctbGliXCI6IFwiXjExLjEuMlwiLFxuXHRcdFwiQGdyZXltYXNzL2FiaTJjb3JlXCI6IFwiXjIuMC4xXCIsXG5cdFx0XCJ0eXBlc2NyaXB0XCI6IFwiXjUuNC4zXCJcblx0fSxcblx0XCJkZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiQHdoYXJma2l0L2FudGVsb3BlXCI6IFwiXjEuMC43XCIsXG5cdFx0XCJAd2hhcmZraXQvc2Vzc2lvblwiOiBcIl4xLjIuOFwiLFxuXHRcdFwiQHdoYXJma2l0L3dhbGxldC1wbHVnaW4tcHJpdmF0ZWtleVwiOiBcIl4xLjAuMFwiLFxuXHRcdFwiYWp2XCI6IFwiXjguMTIuMFwiLFxuXHRcdFwiYXRvbWljYXNzZXRzXCI6IFwiXjEuNS4xXCIsXG5cdFx0XCJpZGIta2V5dmFsXCI6IFwiXjYuMi4xXCIsXG5cdFx0XCJub2RlLWxvY2Fsc3RvcmFnZVwiOiBcIl4zLjAuNVwiXG5cdH0sXG5cdFwidHJ1c3RlZERlcGVuZGVuY2llc1wiOiBbXCJAYmlvbWVqcy9iaW9tZVwiXVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qZWZmcmV5L1Byb2plY3RzL2VmZmVjdC1qcy9kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9qZWZmcmV5L1Byb2plY3RzL2VmZmVjdC1qcy9kb2NzL3NpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvamVmZnJleS9Qcm9qZWN0cy9lZmZlY3QtanMvZG9jcy9zaWRlYmFyLnRzXCI7aW1wb3J0IHR5cGUgeyBTaWRlYmFyIH0gZnJvbSBcInZvY3NcIjtcblxuZXhwb3J0IGNvbnN0IHNpZGViYXIgPSB7XG5cdFwiL2RvY3MvXCI6IFtcblx0XHR7XG5cdFx0XHR0ZXh0OiBcIkludHJvZHVjdGlvblwiLFxuXHRcdFx0aXRlbXM6IFtcblx0XHRcdFx0eyB0ZXh0OiBcIldoeSBFZmZlY3QgQUlcIiwgbGluazogXCIvZG9jcy9pbnRyb2R1Y3Rpb25cIiB9LFxuXHRcdFx0XHR7IHRleHQ6IFwiR2V0dGluZyBTdGFydGVkXCIsIGxpbms6IFwiL2RvY3MvZ2V0dGluZ1N0YXJ0ZWRcIiB9LFxuXHRcdFx0XHR7IHRleHQ6IFwiTG9jYWwgRGV2ZWxvcG1lbnRcIiwgbGluazogXCIvZG9jcy9sb2NhbERldmVsb3BtZW50XCIgfSxcblx0XHRcdF0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR0ZXh0OiBcIkNvbGxlY3RpbmcgRGF0YSB3aXRoIEVmZmVjdFwiLFxuXHRcdFx0aXRlbXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6IFwiSW50cm9kdWN0aW9uXCIsXG5cdFx0XHRcdFx0bGluazogXCIvZG9jcy9jb2xsZWN0aW5nLWRhdGEvaW50cm9kdWN0aW9uXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZXh0OiBcIkRhdGEgQ29sbGVjdGlvblwiLFxuXHRcdFx0XHRcdGxpbms6IFwiL2RvY3MvY29sbGVjdGluZy1kYXRhL2NyZWF0aW5nQUNhbXBhaWduXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dGV4dDogXCJTREsgQVBJXCIsXG5cdFx0XHRpdGVtczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGV4dDogXCJUb2tlblwiLFxuXHRcdFx0XHRcdGl0ZW1zOiBbeyBsaW5rOiBcIi9kb2NzL3Rva2VuL2dldFByaWNlXCIsIHRleHQ6IFwiZ2V0UHJpY2VcIiB9XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6IFwiVGFza3NcIixcblx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0ZXh0OiBcImdldENhbXBhaWduc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOiBcIi9kb2NzL3Rhc2tzL2NhbXBhaWducy9nZXRDYW1wYWlnbnNcIixcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR0ZXh0OiBcIkdsb3NzYXJ5XCIsXG5cdFx0XHRpdGVtczogW3sgdGV4dDogXCJDbGllbnQgT3B0aW9uc1wiLCBsaW5rOiBcIi9kb2NzL2dsb3NzYXJ5L2NsaWVudE9wdGlvbnNcIiB9XSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdHRleHQ6IFwiRkFRXCIsXG5cdFx0XHRpdGVtczogW3sgdGV4dDogXCJGQVFcIiwgbGluazogXCIvZG9jcy9mYXFcIiB9XSxcblx0XHR9LFxuXHRdLFxufSBhcyBjb25zdCBzYXRpc2ZpZXMgU2lkZWJhcjtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjs7O0FDQTdCO0FBQUEsRUFDQyxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEs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
