import { expect, test, describe } from "bun:test";
import { destructureEnv, testClientSession } from "../../../../test/src/utils";
import {
	getReservations,
	getReservationForCampaign,
	getReservationsForVAccount,
	getReservationsForCampaign,
} from "./getReservations";
import { getVAccounts } from "../../vaccount/getAccounts";

describe("getReservation", async () => {
	test("Should return an array, with getReservations()", async () => {
		const client = await testClientSession();
		const reservation = await getReservations({ client });

		expect(reservation).toBeDefined();
		expect(reservation).toBeArray();
	});

	test("Should get reservation for vAccount", async () => {
		const client = await testClientSession();
		const { actor } = destructureEnv();
		const [vacc] = await getVAccounts({ client, actor });

		const reservation = await getReservationsForVAccount({
			client,
			vAccountId: vacc.id,
		});

		expect(reservation).toBeDefined();
		expect(reservation).toBeArray();
	});

	test("Should get reservation for Campaigns", async () => {
		const client = await testClientSession();
		const reservation = await getReservationsForCampaign({
			client,
			campaignId: 1,
		});

		expect(reservation).toBeDefined();
		expect(reservation).toBeArray();
	});

	// TODO: Sometimes the user will not have a reservation, so we need to make sure that
	// a reservation is created before running this test.
	test.todo("Should get reservation for Campaign by vAccountId", async () => {
		const client = await testClientSession();
		const { actor } = destructureEnv();
		const [vacc] = await getVAccounts({ client, actor });

		const reservation = await getReservationForCampaign({
			client,
			vAccountId: vacc.id,
			campaignId: 1,
		});

		expect(reservation).toBeDefined();
		expect(reservation).toBeArray();
	});
});
