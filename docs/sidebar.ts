import type { Sidebar } from "vocs";

export const sidebar = {
	"/docs/": [
		{
			text: "Introduction",
			items: [
				{ text: "Why Effect AI", link: "/docs/introduction" },
				{ text: "Getting Started", link: "/docs/getting-started" },
				{ text: "Authentication", link: "/docs/authentication" },
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
				{
					text: "Collecting results",
					link: "/docs/collecting-data/collecting-results",
				},
			],
		},
		{
			text: "Templates",
			items: [
				{ text: "Introduction", link: "/docs/templates/introduction" },
				{ text: "Label-Studio", link: "/docs/templates/labelstudio" },
			],
		},

		{
			text: "SDK API",
			collapsed: true,
			items: [
				{
					text: "Tasks",
					items: [
						{
							text: "createCampaign",
							link: "/docs/tasks/campaigns/create-campaign",
						},
						{
							text: "getCampaigns",
							link: "/docs/tasks/campaigns/get-campaigns",
						},
						{
							text: "getCampaignById",
							link: "/docs/tasks/campaigns/get-campaign-by-id",
						},
					],
				},
				{
					text: "Token",
					items: [
						{ text: "getPrice", link: "/docs/token/get-price" },
						{ text: "getBalance", link: "/docs/token/get-balance" },
						{ text: "transfer", link: "/docs/token/transfer" },
						{ text: "swap", link: "/docs/token/swap" },
					],
				},
				{
					text: "vAccount",
					items: [
						{ text: "claim", link: "/docs/vaccount/claim" },
						{
							text: "createAccount",
							link: "/docs/vaccount/create-account",
						},
						{ text: "deposit", link: "/docs/vaccount/deposit" },
						{
							text: "getVAccounts",
							link: "/docs/vaccount/get-accounts",
						},
						// {
						// 	text: "TODO: getAvatar",
						// 	link: "/docs/vaccount/get-avatar",
						// },
						{
							text: "getPendingPayments",
							link: "/docs/vaccount/get-pending-payments",
						},
						{ text: "payout", link: "/docs/vaccount/payout" },
						{ text: "withdraw", link: "/docs/vaccount/withdraw" },
					],
				},
				// {
				// 	text: "DAO",
				// 	items: [
				// 		{
				// 			text: "TODO: getAccountAssets",
				// 			link: "/docs/tasks/dao/get-account-assets",
				// 		},
				// 	],
				// },
			],
		},
		{
			text: "Glossary",
			items: [
				{ text: "Terminology", link: "/docs/glossary/terminology" },
				{ text: "Types", link: "/docs/glossary/types" },
			],
		},
		{
			text: "FAQ",
			items: [{ text: "FAQ", link: "/docs/faq" }],
		},
	],
} as const satisfies Sidebar;
