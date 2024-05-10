import { expect, test, describe } from "bun:test";
import { createClient } from "../../client";
import { destructureEnv, testClientSession } from "../../../test/src/utils";
import { getAvatar, jungle4 as network } from "../../exports";

describe("getAvatar", async () => {
	test.todo("Should retrieve avatar for user", async () => {
		const client = await createClient({ network });
		const account = "cryptonode42";
		const response = await getAvatar({ client, account });
		expect(response).toBeDefined();
	});

	test.todo("Should claim pending payments", async () => {
		// TODO: Should claim pending payments
		// Figure out flow to test this
	});
});
