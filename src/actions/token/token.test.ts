import { describe, test, expect } from "bun:test";
import { getPrice } from "./getPrice";
import { getBalance } from "./getBalance";
import { swap, type SwapArgs } from "./swap";
import { createClient } from "../../client";
import { eos, jungle4 } from "../../exports";
import { Name } from "@wharfkit/antelope";
import { testClientSession } from "../../../test/src/utils";

describe("getPrice", async () => {
	test("getPrice() should retrieve price on mainnet", async () => {
		const client = createClient({ network: eos });
		const price = await getPrice();
		expect(price).toBeDefined();
		expect(price).toBeNumber();
	});
});

describe("getBalance", async () => {
	test("getBalance() should retrieve balance from user on mainnet", async () => {
		const client = createClient({ network: jungle4 });
		const actor = Name.from("forcedev1234");
		const balance = await getBalance({ client, actor });
		expect(balance).toBeDefined();
		expect(balance.toString()).toBeDefined();
		expect(balance.toString()).toContain("EFX");
	});

	test("getBalance() should throw Error retrieving balance from unknown user.", async () => {
		const client = createClient({ network: eos });
		const actor = Name.from("cryptonode99");
		expect(async () => await getBalance({ client, actor })).toThrowError();
	});
});

describe("buildSwapAction", async () => {
	test.todo("buildSwapAction() should return a swap action object.");
});

describe("Swap", async () => {
	// Use Mainnet

	test("swap() should throw an error when Session is not set on Client.", async () => {
		const swapArgs: SwapArgs = {
			client: createClient({ network: jungle4 }),
			amount: 1,
			direction: "UsdtToEfx",
		};

		expect(async () => await swap(swapArgs)).toThrow(
			new Error("Error swapping: Error: Session is required for this method."),
		);
	});

	test("swap() should fail when amount is 0", async () => {
		const swapArgs: SwapArgs = {
			client: await testClientSession({ testEnvNetwork: jungle4 }),
			amount: 0,
			direction: "UsdtToEfx",
		};

		expect(async () => await swap(swapArgs)).toThrow();
	});
});
