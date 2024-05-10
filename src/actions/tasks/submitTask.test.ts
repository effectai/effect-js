import { expect, test, describe } from "bun:test";
import { destructureEnv, testClientSession } from "../../../test/src/utils";
import { submitTask } from "./submitTask";
import { getReservationForCampaign } from "./reservations/getReservations";
import { getVAccounts } from "../vaccount/getAccounts";

describe("submitTask", async () => {
	// TODO: Figure out flow for how to test this function
	test.todo("Should submitTask", async () => {
		const client = await testClientSession();
		const { actor } = destructureEnv();
		const [vAccount] = await getVAccounts({ client, actor });

		const reservation = getReservationForCampaign({
			client,
			campaignId: 1,
			vAccountId: vAccount.id,
		});

		const response = await submitTask({ client, reservation, data: {} });

		console.debug(response);
		expect(response).toBeDefined();
	});
});
