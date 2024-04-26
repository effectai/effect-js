import { describe, test, expect } from "bun:test";
import { getAccountAssets, IAssetRow } from "./getAccountAssets";
import { destructureEnv, testClientSession } from "../../testHelper";
import { Name } from "@wharfkit/antelope";

describe("getAccountAssets", async () => {
	const accountAssetExample: IAssetRow = {};

	test("getAccountAssets defined", async () => {
		const { actor } = destructureEnv();
		const client = await testClientSession();
		const assets = await getAccountAssets({
			client,
			account: Name.from(actor),
		});

		expect(assets).toBeDefined();
		expect(assets).toBeArray();
	});
});
