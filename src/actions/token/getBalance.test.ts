import { describe, test, expect } from "bun:test";
import { getBalance } from "./getBalance";
import { createClient } from "../../client";
import { eos, jungle4 } from "../../exports";

describe("getBalance", async () => {
	test("getBalance() should retrieve balance from user on mainnet", async () => {
		const client = await createClient({ network: eos });
		const actor = "cryptonode42";
		const balance = await getBalance({ client, actor });
		expect(balance).toBeDefined();
		expect(balance.efxBalance).toBeDefined();
		expect(balance.usdtBalance).toBeDefined();
		expect(balance.eosBalance).toBeDefined();
		expect(balance.efxBalance).toBeGreaterThan(0);
		expect(balance.usdtBalance).toBeGreaterThan(0);
		expect(balance.eosBalance).toBeGreaterThan(0);
	});

	test("getBalance() should throw Error retrieving balance from unknown user.", async () => {
		const client = await createClient({ network: jungle4 });
		const actor = "cryptonode99";
		expect(async () => await getBalance({ client, actor })).toThrowError();
	});
});
