import { Session } from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { jungle4, eos } from "../src/exports";
import { Client, createClient } from "./../src/client";

export const testClient = async (): Promise<Client> => {
  const client = createClient({ network: jungle4 });

  //jungle 4 test key
  const walletPlugin = new WalletPluginPrivateKey(
    "5KSG1pLHubiQ2JD4G4Pr32zxz7oQvpagBofYPrdS1FALKVjxdPM",
  );

  // Add Test session
  const session = new Session({
    actor: "forcedev1234",
    permission: "active",
    chain: {
      id: "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
      url: "https://jungle4.greymass.com",
    },
    walletPlugin,
  });

  // Set up test session
  await client.setSession(session);

  return client;
};
