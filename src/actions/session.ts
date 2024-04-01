import { Session } from "@wharfkit/session";
import { Client } from "../client";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { SessionNotFoundError, TransactionError } from "../errors";
import { TxState, waitForTransaction } from "../utils";
import { getVAccounts } from "./vaccount/getAccounts";

export const setSession = async (client: Client, session: Session | null) => {
  client.state.setState({ session });
};

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

export const watchSession = (
  client: Client,
  cb: (session: Session | null) => void,
) => {
  return client.state.subscribe(
    ({ session: newState }, { session: oldState }) => {
      if (oldState === newState) return;
      cb(newState);
    },
  );
};

/* 
  Helper function to use session in actions
*/
export const useWharfKitSession = (client: Client) => {
  if (!client.session) {
    throw new SessionNotFoundError("Session is required for this method.");
  }

  const { actor, permission, permissionLevel } = client.session;
  const provider = client.provider;

  const transact = async ({ ...transactArgs }) => {
    if (!client.session) {
      throw new SessionNotFoundError("Session is required for this method.");
    }

    try {
      // Start the transaction
      const transaction = await client.session.transact({
        ...transactArgs,
      });

      //wait for TX to be IN BLOCK
      await waitForTransaction(
        transaction.response!.transaction_id,
        provider.v1.chain,
        TxState.IN_BLOCK,
      );

      return transaction;
    } catch (error) {
      console.error(error);
      throw new TransactionError("Failed to transact");
    }
  };

  return {
    actor,
    permission,
    permissionLevel,
    authorization: [
      {
        actor,
        permission,
      },
    ],
    transact,
  };
};
