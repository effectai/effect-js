import type { Client } from "../../client";
import type { VAccount } from "../../types/user";

export const watchAccount = (
  client: Client,
  cb: (account: VAccount | null) => void,
) => {
  return client.state.subscribe(
    ({ vAccount: newState }, { vAccount: oldState }) => {
      if (oldState === newState) return;
      cb(newState);
    },
  );
};
