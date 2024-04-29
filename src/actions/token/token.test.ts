import { describe, test, expect } from "bun:test";
import { getPrice } from "./getPrice";
import { getBalance } from "./getBalance";
import {
  swap,
  buildSwapAction,
  swapDirection,
  SwapArgs,
  swapDirectionEnum,
} from "./swap";
import { createClient } from "../../client";
import { testClientSession } from "../../testHelper";
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

describe("buildSwapAction", async () => {
  test.todo("buildSwapAction() should return a swap action object.");
});

describe("Swap", async () => {
  const testEnvNetwork = eos; // Mainnet
  test("swap() should throw an error when Session is not set on Client.", async () => {
    const swapArgs: SwapArgs = {
      client: createClient({ network: testEnvNetwork }),
      amount: 1,
      direction: swapDirectionEnum.UsdtToEfx,
    };
    expect(async () => await swap(swapArgs)).toThrow(
      new Error("Swap: Session is required for this method."),
    );
  });

  test.skip("swap() should throw an Error when making a swap from a non existent account.", async () => {
    const client = await testClientSession({ testEnvNetwork });

    const swapArgs: SwapArgs = {
      client,
      amount: 3,
      direction: swapDirectionEnum.UsdtToEfx,
    };

    const result = await swap(swapArgs);
  });
});
