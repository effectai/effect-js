import { Session } from "@wharfkit/session";
import { Client } from "../../client";

export const setSession = async (client: Client, session: Session | null) => {
  client.state.setState({ session });
};
