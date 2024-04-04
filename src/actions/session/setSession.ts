import { Session } from "@wharfkit/session";
import type { Client } from "../../client";

export const setSession = async (client: Client, session: Session | null) => {
  client.setSession(session);
};
