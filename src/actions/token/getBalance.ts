import type { Name } from "@wharfkit/session";
import type { Client } from "../../exports";

export const getBalance = async (client: Client, actor: Name) => {
  const { network, provider } = client;
  const { contracts } = network.config.efx;

  const [balance] = await provider.v1.chain.get_currency_balance(
    contracts.token,
    actor,
  );

  if (!balance) {
    throw new Error("No balance found");
  }

  return balance;
};
