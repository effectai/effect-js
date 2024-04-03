import { Client } from "../client";
import { SessionNotFoundError, TransactionError } from "../errors";
import { TxState, waitForTransaction } from "../utils";

/* Helper function to make it easier to interact with WharfKit session
 and wraps the transact method to wait for the transaction to be in block */

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
