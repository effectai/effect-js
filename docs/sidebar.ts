import type { Sidebar } from "vocs";

export const sidebar = {
	"/docs/": [
		{
			text: "Introduction",
			items: [
				{ text: "Why Effect AI", link: "/docs/introduction" },
				{ text: "Getting Started", link: "/docs/getting-started" },
				{ text: "Local Development", link: "/docs/local-development" },
			],
		},
		{
			text: "Guides",
			items: [
				{
					text: "Create Your First Campaign",
					link: "/docs/guides/create-a-campaign",
				},
			],
		},
		{
			text: "Token",
			items: [{ text: "getPrice", link: "/docs/token/getPrice" }],
		},
		{
			text: "Tasks",
			items: [{ text: "getCampaigns", link: "/docs/tasks/getCampaigns" }],
		},
	],
} as const satisfies Sidebar;
