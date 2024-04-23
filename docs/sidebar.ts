import type { Sidebar } from "vocs";

export const sidebar = {
  "/docs/": [
    {
      text: "Introduction",
      items: [
        { text: "Why Effect AI", link: "/docs/introduction" },
        { text: "Getting Started", link: "/docs/gettingStarted" },
        { text: "Local Development", link: "/docs/localDevelopment" },
      ],
    },
    {
      text: "Guides",
      items: [
        {
          text: "Create Your First Campaign",
          link: "/docs/guides/createACampaign",
        },
      ],
    },
    {
      text: "Token",
      items: [{ text: "getPrice", link: "/docs/token/getPrice" }],
    },
    {
      text: "Tasks",
      items: [{ text: "getCampaigns", link: "/docs/tasks/campaigns/getCampaigns" }],
    },
    {
      text: "Local Development",
      items: [{ text: "localDevelopment", link: "/docs/localDevelopment" }],
    },
    {
      text: "Glossary",
      items: [
        { text: "Client Options", link: "/docs/glossary/clientOptions" }
      ]
    },
    {
      text: "FAQ",
      items: [
        { text: "FAQ", link: "/docs/faq" }
      ]
    }

  ],
} as const satisfies Sidebar;
