import { describe, expect, test, beforeAll } from "bun:test";
import { testClientSession, destructureEnv } from "../../../test/src/utils";
import { getPendingPayments } from "./getPendingPayments";
import { jungle4 } from "../../exports";
import { getOrCreateVAccount } from "./getOrCreate";
import { Name } from "@wharfkit/antelope";

describe("getPendingPayments", () => {
  const pendingPaymentsExample = {
    pendingPayments: [],
    claimablePayments: [],
    totalEfxPending: 0,
    totalEfxClaimable: 0,
  };
  test("getPendingPayments() returns pendingPayments", async () => {
    const { network, actor: accountName } = destructureEnv(jungle4);
    const actor = Name.from(accountName);
    const client = await testClientSession({ network });
    const vaccount = await getOrCreateVAccount({ client, actor });
    const vAccountId = Number(vaccount.id);
    const pendingPayments = await getPendingPayments({ client, vAccountId });
    expect(pendingPayments).toBeDefined();
    expect(pendingPayments).toMatchObject(pendingPaymentsExample);
  });
});
