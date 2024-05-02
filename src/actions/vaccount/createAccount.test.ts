import { Name } from "@wharfkit/antelope";

import { expect, test, describe, mock } from "bun:test";

import { createClient } from "../../client";
import { createVAccount } from "./createAccount";

import { jungle4 } from "../../exports";
import { testClientSession } from "../../../test/src/utils.js";

describe("Create Virtual account", () => {
  const network = jungle4;

  test.skip("createVAccount() should return a TransactResult", async () => {
    const client = await testClientSession({ network });
    const account = Name.from("efxforce1112");
    const result = await createVAccount({ client, account });
    expect(result).toBeDefined();
  });

  test("createVAccount() should throw Error when no Session is found", async () => {
    expect(async () => {
      const client = createClient({ network: network });
      const account = Name.from("efxforce1112");
      await createVAccount({ client, account });
    }).toThrowError();
  });
});
