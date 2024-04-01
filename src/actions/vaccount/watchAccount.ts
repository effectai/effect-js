import { Client } from "../../client";
import { VAccount } from "../../types";

export const watchAccount = (
  client: Client,
  cb: (account: VAccount | null) => void,
) => {
  return client.state.subscribe(
    ({ vAccount: newState }, { vAccount: oldState }) => {
      if (oldState === newState) return;

      console.log("Account changed", newState, oldState);
      cb(newState);
    },
  );
};
