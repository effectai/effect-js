import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { Client } from "../../client";
import { Session } from "@wharfkit/session";
import { setSession } from "./setSession";

export const createSession = async (
  client: Client,
  actor: string,
  permission: string,
  privateKey: string,
) => {
  const walletPlugin = new WalletPluginPrivateKey(privateKey);

  const { eosRpcUrl, eosChainId } = client.network;

  const session = new Session({
    actor,
    permission,
    chain: {
      id: eosChainId,
      url: eosRpcUrl,
    },
    walletPlugin,
  });

  await setSession(client, session);
};
