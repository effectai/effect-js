import { describe, test, expect } from "bun:test";
import { deposit } from "./deposit";
import { destructureEnv, testClientSession } from "../../testHelper";
import { eos } from "../../exports";
import { getOrCreateVAccount } from "./getOrCreate";
import { Name } from "@wharfkit/antelope";

describe("deposit", async () => {
	test("Check that deposit is functioning correctly", async () => {
		const { network, actor } = destructureEnv(eos);
		const client = await testClientSession({ testEnvNetwork: network });
		console.debug(client.network);
		const acc = Name.from(actor);
		const vAccount = await getOrCreateVAccount({ client, actor: acc });
		const vAccId = Number(vAccount.id);
		const result = await deposit({ client, vAccountId: vAccId, amount: 1 });
		console.debug(result);
	});
});
