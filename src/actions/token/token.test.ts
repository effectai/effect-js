import { describe, test, expect } from "bun:test";
import { getPrice } from "./getPrice";
import { getBalance } from "./getBalance";
import { createClient } from "../../client";
import { eos } from "../../exports";
import { Name } from "@wharfkit/antelope";

describe("getPrice", async () => {
  const accountAssetExample = {};

  test("getPrice() should retrieve price on mainnet", async () => {
    const client = createClient({ network: eos });

    const price = await getPrice();
    expect(price).toBeDefined();
    expect(price).toBeNumber();
  });
});

describe("getBalance", async () => {
  const accountAssetExample = {};

  test("getBalance() should retrieve balance from user on mainnet", async () => {
    const client = createClient({ network: eos });
    const actor = Name.from("cryptonode42");

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
