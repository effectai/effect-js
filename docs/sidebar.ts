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
			text: "Collecting Data",
			items: [
				{
					text: "Introduction",
					link: "/docs/collecting-data/introduction",
				},
				{
					text: "Creating a Template",
					link: "/docs/collecting-data/create-a-template",
				},
				{
					text: "Creating a Campaign",
					link: "/docs/collecting-data/create-a-campaign",
				},
				{
					text: "Adding Tasks to a Campaign",
					link: "/docs/collecting-data/adding-tasks",
				},
			],
		},
		{
			text: "Templates",
			items: [{ text: "introduction", link: "/docs/templates/introduction" }],
		},
		{
			text: "SDK API",
			items: [
				{
					text: "Token",
					items: [{ link: "/docs/token/getPrice", text: "getPrice" }],
				},
				{
					text: "Tasks",
					items: [
						{
							text: "getCampaigns",
							link: "/docs/tasks/campaigns/getCampaigns",
						},
					],
				},
			],
		},
		{
			text: "Glossary",
			items: [{ text: "Client Options", link: "/docs/glossary/clientOptions" }],
		},
		{
			text: "FAQ",
			items: [{ text: "FAQ", link: "/docs/faq" }],
		},
	],
} as const satisfies Sidebar;
