import type { Client } from "../../client";
import { useEFXContracts } from "../../utils/state";

export type GetAvatarArgs = {
	client: Client;
	account: string;
};

export const getAvatar = async ({ client, account }: GetAvatarArgs) => {
	const { dao } = useEFXContracts(client);
	const { provider } = client;

	const response = await provider.v1.chain.get_table_rows({
		code: dao,
		scope: account,
		table: "avatar",
		limit: 1,
	});

	const [avatar] = response.rows;
	return avatar;
};
