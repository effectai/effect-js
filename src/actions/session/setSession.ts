import type { Session } from "@wharfkit/session";
import type { Client } from "../../client";

export type SetSessionArgs = {
	client: Client;
	session: Session | null;
};

export const setSession = async ({ client, session }: SetSessionArgs) => {
	await client.setSession(session);
};
