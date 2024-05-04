import { describe, test, expect } from "bun:test";
import { getPrice } from "./getPrice";

describe("getPrice", async () => {
	test("getPrice() should retrieve price on mainnet", async () => {
		const price = await getPrice();
		expect(price).toBeDefined();
		expect(price).toBeNumber();
	});
});
