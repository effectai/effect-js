import { test, expect, describe } from "bun:test";
import { getAccountAssets, type IAssetRow } from "./getAccountAssets";
import { Name } from "@wharfkit/antelope";
import { createClient, eos } from "../../exports";

describe("getAccountAssets", async () => {
	const accountAssetExample: IAssetRow = {
		asset_id: "2199024546793",
		collection_name: "pomelo",
		schema_name: "astronauts",
		template_id: 7022,
		ram_payer: "pomelo",
		backed_tokens: [],
		immutable_serialized_data: [
			5, 46, 81, 109, 90, 57, 102, 105, 106, 75, 54, 100, 109, 113, 66, 121, 66,
			81, 117, 105, 57, 66, 71, 74, 111, 68, 77, 83, 122, 84, 76, 90, 104, 70,
			55, 69, 70, 53, 90, 88, 78, 112, 57, 67, 111, 78, 102, 71, 9, 6, 67, 121,
			98, 111, 114, 103, 10, 8, 65, 113, 117, 97, 114, 105, 117, 109, 11, 5, 67,
			108, 111, 119, 110, 12, 6, 77, 111, 100, 101, 114, 110, 13, 4, 78, 111,
			110, 101, 14, 4, 66, 97, 108, 100, 15, 4, 78, 111, 110, 101, 16, 16, 68,
			97, 114, 107, 32, 66, 114, 97, 115, 115, 32, 83, 116, 117, 100, 115, 17,
			11, 70, 108, 111, 119, 101, 114, 32, 69, 121, 101, 115, 18, 6, 78, 111,
			114, 109, 97, 108, 19, 4, 78, 111, 110, 101, 20, 4, 78, 111, 110, 101,
		],
		mutable_serialized_data: [],
	};

	test("getAccountAssets() returns IAssetRow", async () => {
		// const account = Name.from("cryptonode42");
		// const client = createClient({ network: eos });
		// const assets = await getAccountAssets({ client, account });
		// expect(assets).toBeDefined();
		// expect(assets).toBeArray();
		// expect(assets[0]).toMatchObject(accountAssetExample);
	});

	test("getAccountAssets() should throw return empty array when no assets are found", async () => {
		// const account = Name.from("cryptonode99");
		// const client = await createClient({ network: eos });
		// const assets = await getAccountAssets({ client, account });
		// expect(assets).toBeDefined();
		// expect(assets).toBeArray();
		// expect(assets).toBeEmpty();
	});
});
