import { describe, expect, test, beforeAll } from "bun:test";
import { testClientSession, destructureEnv } from "../../../test/src/utils";
import { vTransfer } from "./transfer";
import { getVAccounts, type Client } from "../../exports";

describe("vTransfer", () => {
	const { actor } = destructureEnv();
	const receiver = "vibrantcacti";
	let client: Client;
	const from_id = 1;
	const to_id = 2;
	const quantity = 0.0001;

	beforeAll(async () => {
		client = await testClientSession();
	});

	test("throws an error if session is not set", async () => {
		expect(async () => {
			await vTransfer({ client, from_id, to_id, quantity });
		}).toThrow();
	});

	test.skip("Should return txResult, when sending 0.0001 EFX", async () => {
		const [vAccount] = await getVAccounts({ client, actor });
		const preBalanceVAccount = Number(vAccount.balance.quantity);

		const [vAccountReceiver] = await getVAccounts({
			client,
			actor: receiver,
		});
		const preBalanceReceiver = Number(vAccountReceiver.balance.quantity);

		const result = await vTransfer({
			client,
			from_id: vAccount.id,
			to_id: vAccountReceiver.id,
			quantity,
		});

		expect(result).toBeDefined();

		const [postVAccount] = await getVAccounts({
			client,
			actor,
		});

		const [postVAccountReceiver] = await getVAccounts({
			client,
			actor: receiver,
		});

		const postbalanceReceiver = Number(postVAccountReceiver.balance.quantity);
		const postbalance = Number(postVAccount.balance.quantity);

		// Make sure the balance is updated
		expect(postbalance).toBe(preBalanceVAccount - quantity);
		expect(postbalanceReceiver).toBe(preBalanceReceiver + quantity);
	});
});
