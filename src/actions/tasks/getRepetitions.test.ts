import { expect, test, describe } from "bun:test";
import { testClientSession } from "../../../test/src/utils";
import { getRepetitions } from "../../exports";

describe("getRepetitions", async () => {
	test("Should retrieve the repitions as array", async () => {
		const client = await testClientSession();
		const repitions = await getRepetitions({ client });
		console.debug(repitions);
		expect(repitions).toBeDefined();
		expect(repitions).toBeArray();
	});
});
