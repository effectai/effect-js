import { createClient, eos } from "@effectai/sdk";

export const client = createClient({
	chain: eos,
});
