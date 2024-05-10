import { describe, test, expect } from "bun:test";
import { getBalance } from "./getBalance";
import { createClient } from "../../client";
import { eos, jungle4 } from "../../exports";

describe("getBalance", async () => {
	test("getBalance() should retrieve balance from user on mainnet", async () => {
		const client = createClient({ network: jungle4 });
		const actor = "forcedev1234";
		const balance = await getBalance({ client, actor });
		expect(balance).toBeDefined();
		expect(balance.toString()).toBeDefined();
		expect(balance.toString()).toContain("EFX");
	});

	test("getBalance() should throw Error retrieving balance from unknown user.", async () => {
		const client = createClient({ network: eos });
		const actor = "cryptonode99";
		expect(async () => await getBalance({ client, actor })).toThrowError();
	});
});
