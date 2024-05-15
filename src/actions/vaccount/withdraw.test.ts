import { expect, test, describe } from "bun:test";
import { testClientSession } from "../../../test/src/utils";
import { withdraw } from "../../exports";
import type { ExtendedAssetType } from "@wharfkit/antelope";

describe("withdraw", async () => {
	test.skip("Should withdraw vaccount EFX to wallet.", async () => {
		const client = await testClientSession();
		const quantity: ExtendedAssetType = {
			quantity: "0.0001 EFX",
			contract: client.network.config.efx.contracts.token,
		};
		const result = await withdraw({ client, quantity });
		console.log(result);
		expect(result).toBeDefined();
	});

	test.todo("Should fail when no EFX is in vAccount", async () => {
		// TODO: Should fail when no EFX is in the vAccount
		// Figure out flow to test this
	});
});
