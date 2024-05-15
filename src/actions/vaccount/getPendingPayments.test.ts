import { describe, expect, test } from "bun:test";
import { testClientSession, destructureEnv } from "../../../test/src/utils";
import { getPendingPayments } from "./getPendingPayments";
import { getVAccounts } from "./getAccounts";

describe("getPendingPayments", () => {
	const pendingPaymentsExample = {
		pendingPayments: [],
		claimablePayments: [],
		totalEfxPending: 0,
		totalEfxClaimable: 0,
	};

	test("getPendingPayments() returns pendingPayments", async () => {
		const { actor } = destructureEnv();
		const client = await testClientSession();
		const [vaccount] = await getVAccounts({ client, actor });
		const vAccountId = vaccount.id;
		const pendingPayments = await getPendingPayments({ client, vAccountId });
		expect(pendingPayments).toBeDefined();
		expect(pendingPayments).toMatchObject(pendingPaymentsExample);
	});
});
