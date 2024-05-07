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
				{ text: "Introduction", link: "/docs/collecting-data/introduction" },
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
					text: "vAccount",
					items: [
						{ text: "TODO: claim", link: "/docs/tasks/vaccount/claim" },
						{
							text: "TODO: createAccount",
							link: "/docs/tasks/vaccount/createAccount",
						},
						{ text: "TODO: deposit", link: "/docs/tasks/vaccount/deposit" },
						{
							text: "TODO: getAccounts",
							link: "/docs/tasks/vaccount/getAccounts",
						},
						{ text: "TODO: getAvatar", link: "/docs/tasks/vaccount/getAvatar" },
						{
							text: "TODO: getOrCreate",
							link: "/docs/tasks/vaccount/getOrCreate",
						},
						{
							text: "TODO: getPendingPayments",
							link: "/docs/tasks/vaccount/getPendingPayments",
						},
						{ text: "TODO: payout", link: "/docs/tasks/vaccount/payout" },
						{ text: "TODO: transfer", link: "/docs/tasks/vaccount/transfer" },
						{ text: "TODO: withdraw", link: "/docs/tasks/vaccount/withdraw" },
					],
				},
				{
					text: "Token",
					items: [
						{ text: "TODO: getPrice", link: "/docs/tasks/token/getPrice" },
						{ text: "TODO: getBalance", link: "/docs/tasks/token/getBalance" },
						{ text: "TODO: swap", link: "/docs/tasks/token/swap" },
					],
				},
				{
					text: "Tasks",
					items: [
						{
							text: "TODO: createCampaign",
							link: "/docs/tasks/campaigns/createCampaign",
						},
						{
							text: "getCampaigns",
							link: "/docs/tasks/campaigns/getCampaigns",
						},
						{
							text: "getCampaignById",
							link: "/docs/tasks/campaigns/getCampaignById",
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
