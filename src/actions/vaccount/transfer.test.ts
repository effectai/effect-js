import { describe, expect, test } from "bun:test";
import { testClientSession, destructureEnv } from "../../../test/src/utils";
import { vTransfer } from "./transfer";
import { jungle4 } from "../../exports";

describe("vTransfer", () => {
  test("throws an error if session is not set", async () => {
    const { network } = destructureEnv(jungle4);
    const client = await testClientSession({ network });
    const from_id = 1;
    const to_id = 2;
    const quantity = 0.0001;
    expect(async () => {
      await vTransfer({ client, from_id, to_id, quantity });
    }).toThrow();
  });
});
