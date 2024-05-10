import { expect, test, describe } from "bun:test";
import { testClientSession } from "../../../test/src/utils";
import { getForceSettings } from "../../exports";

describe("getForceSettings", async () => {
	const settingsExample = {
		vaccount_contract: "efxaccount11",
		force_vaccount_id: 11,
		payout_delay_sec: 1800,
		release_task_delay_sec: 1800,
		fee_contract: "efxfeepool11",
		fee_percentage: "0.10000000149011612",
	};

	test("Should match config settings", async () => {
		const client = await testClientSession();
		const settings = await getForceSettings({ client });
		console.debug(settings);
		expect(settings).toBeDefined();
		expect(Object.keys(settings)).toEqual(Object.keys(settingsExample));
	});
});
