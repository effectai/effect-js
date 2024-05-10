import { describe, test, expect } from "bun:test";
import { deposit } from "./deposit";
import { eos, jungle4 } from "../../exports";
import { getOrCreateVAccount } from "./getOrCreate";
import { testClientSession, destructureEnv } from "../../../test/src/utils";

describe("deposit", async () => {
  test.todo("Should throw an error when Session is not set on Client.", () => {
    // TODO: implement test
  });

	test.skip("Check that deposit is functioning correctly", async () => {
		const client = await testClientSession({ testEnvNetwork: network });
		const vAccount = await getOrCreateVAccount({ client, actor: acc });
		const vAccId = Number(vAccount.id);
		const result = await deposit({ client, vAccountId: vAccId, amount: 0.1 });
		console.debug(result);
		const { actor } = destructureEnv();
	});
});
