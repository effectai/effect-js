import { describe, expect, test, beforeAll } from "bun:test";
import { testClientSession, destructureEnv } from "../../../test/src/utils";
import { vTransfer } from "./transfer";
import { type Client, jungle4 } from "../../exports";
import { getOrCreateVAccount } from "./getOrCreate";
import { Asset, Name } from "@wharfkit/antelope";

describe("vTransfer", () => {
  const { network, actor } = destructureEnv(jungle4);
  const receiver = Name.from("vibrantcacti");
  let client: Client;
  const from_id = 1;
  const to_id = 2;
  const quantity = 0.0001;

  beforeAll(async () => {
    client = await testClientSession({ network });
  });

  test("throws an error if session is not set", async () => {
    expect(async () => {
      await vTransfer({ client, from_id, to_id, quantity });
    }).toThrow();
  });

  test.skip("Should return txResult, when sending 0.0001 EFX", async () => {
    const accountName = Name.from(actor);
    const vAccount = await getOrCreateVAccount({ client, actor: accountName });
    const preBalanceVAccount = Number(vAccount.balance.quantity);

    const vAccountReceiver = await getOrCreateVAccount({
      client,
      actor: receiver,
    });
    const preBalanceReceiver = Number(vAccountReceiver.balance.quantity);

    const result = await vTransfer({
      client,
      from_id: vAccount.id,
      to_id: vAccountReceiver.id,
      quantity,
    });

    expect(result).toBeDefined();

    const postVAccount = await getOrCreateVAccount({
      client,
      actor: accountName,
    });

    const postVAccountReceiver = await getOrCreateVAccount({
      client,
      actor: receiver,
    });

    const postbalanceReceiver = Number(postVAccountReceiver.balance.quantity);
    const postbalance = Number(postVAccount.balance.quantity);

    // Make sure the balance is updated
    expect(postbalance).toBe(preBalanceVAccount - quantity);
    expect(postbalanceReceiver).toBe(preBalanceReceiver + quantity);
  });
});
