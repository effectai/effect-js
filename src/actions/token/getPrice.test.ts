describe("getPrice", async () => {
	test("getPrice() should retrieve price on mainnet", async () => {
		const client = createClient({ network: eos });
		const price = await getPrice();
		expect(price).toBeDefined();
		expect(price).toBeNumber();
	});
});
