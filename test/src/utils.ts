import {
  PrivateKey,
  type PrivateKeyType,
  Session,
  PermissionLevel,
} from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { jungle4, } from "../../src/exports";
import { createClient } from "../../src/client";
import type { Client } from "../../src/client";
import type { Network } from "../../src/types/network";

declare module "bun" {
  interface Env {
    TESTNET_PERMISSION: string;
    TESTNET_NETWORK_NAME: string;
    TESTNET_ACTOR: string;
    TESTNET_PRIVATE_KEY: string;
    MAINNET_PERMISSION: string;
    MAINNET_NETWORK_NAME: string;
    MAINNET_ACTOR: string;
    MAINNET_PRIVATE_KEY: string;
  }
}

export interface testEnv {
  network: Network;
  networkName: string;
  permission: string;
  actor: string;
  privateKey: PrivateKeyType;
}

export const destructureEnv = () => {
  return {
    network: jungle4,
    networkName: process.env.TESTNET_NETWORK_NAME,
    permission: process.env.TESTNET_PERMISSION!,
    actor: process.env.TESTNET_ACTOR!,
    privateKey: PrivateKey.from(process.env.TESTNET_PRIVATE_KEY!),
  };
};

export const testClientSession = async ({ network }: { network: Network }): Promise<Client> => {
  // Retrieve parameters for session.
  const { network: chain, permission, actor, privateKey } = destructureEnv();

  if (!privateKey) {
    throw new Error("Private key not found");
  }

  // Create client
  const client = createClient({ network });

  // Setup wallet plugin with private key
  const walletPlugin = new WalletPluginPrivateKey(privateKey);

  /** Create new permission level from representing types. Can be expressed as a string in the format `<actor>@<permission>`. */
  const permissionLevel = PermissionLevel.from(`${actor}@${permission}`);
  // Set up session with wallet and chain
  const session = new Session({ actor, permission, walletPlugin, chain, permissionLevel });

  // Connect session to client
  await client.setSession(session);

  return client;
};
