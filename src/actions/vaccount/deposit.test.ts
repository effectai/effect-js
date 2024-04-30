import { describe, test, expect } from "bun:test";
import { deposit } from "./deposit";
import { destructureEnv, testClientSession } from "../../testHelper";
import { eos, jungle4 } from "../../exports";
import { getOrCreateVAccount } from "./getOrCreate";
import { Name } from "@wharfkit/antelope";

describe("deposit", async () => {
	test.todo("Should throw an error when Session is not set on Client.", () => {
		// TODO: implement test
	});

	test.skip("Check that deposit is functioning correctly", async () => {
		const { network, actor } = destructureEnv(jungle4);
		const client = await testClientSession({ testEnvNetwork: network });
		console.debug(client.network);
		const acc = Name.from(actor);
		const vAccount = await getOrCreateVAccount({ client, actor: acc });
		const vAccId = Number(vAccount.id);
		const result = await deposit({ client, vAccountId: vAccId, amount: 0.1 });
		console.debug(result);
	});
});
