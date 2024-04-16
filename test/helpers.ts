import { Session } from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { jungle4 } from "../src/constants/network";
import { createClient } from "./../src/client";

const client = createClient(jungle4, {});

//jungle 4 test key
const walletPlugin = new WalletPluginPrivateKey(
	"5KSG1pLHubiQ2JD4G4Pr32zxz7oQvpagBofYPrdS1FALKVjxdPM",
);

//set a test session to jungle
client.state.setState({
	session: new Session({
		actor: "forcedev1234",
		permission: "active",
		chain: {
			id: "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
			url: "https://jungle4.greymass.com",
		},
		walletPlugin,
	}),
});

export { client };
