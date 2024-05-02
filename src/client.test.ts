import { expect, test, describe, beforeAll } from "bun:test";
import { jungle4, eos } from "../src/exports";
import { createClient, Client as ClientConstructor } from "./client";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { Session } from "@wharfkit/session";
import { destructureEnv, testClientSession } from "../test/src/utils";

describe("Client", async () => {
  test("Create client with Session", async () => {
    const {
      network: chain,
      permission,
      actor,
      privateKey,
    } = destructureEnv(eos);

    // Create wallet with privatekey
    const walletPlugin = new WalletPluginPrivateKey(privateKey);

    // Set up session with wallet
    const session = new Session({ actor, permission, walletPlugin, chain });

    const client = createClient({ session });
    expect(client.session).toBeDefined();
  });

  test("Create client with Network", async () => {
    const { network } = destructureEnv(eos);
    const client = createClient({ network });
    expect(client.session).toBeDefined();
  });
});
