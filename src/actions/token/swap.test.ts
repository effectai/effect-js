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
