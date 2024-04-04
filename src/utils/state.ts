// Helper functions to extract data from client state (e.g. session or config)
import type { Client } from "../client";

export const useEFXContracts = (client: Client) => {
  const { contracts } = client.network.config.efx;

  return contracts;
};
