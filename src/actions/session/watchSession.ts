import { Session } from "@wharfkit/session";
import type { Client } from "../../client";

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
