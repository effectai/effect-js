import type { Client } from "../../client";
import { getAsset } from "../atomic/getAsset";
import { getAvatar as getDaoAvatar } from "../dao/getAvatar";

export const getAvatar = async (client: Client, account: string) => {
	const defaultImg = "QmZQiEWsaTNpANMv9orwDvuGyMRkY5nQNazSB1KkW4pM6t";
	const defaultVid = "QmZQiEWsaTNpANMv9orwDvuGyMRkY5nQNazSB1KkW4pM6t";
	const daoAvatar = await getDaoAvatar(client, account);
	const asset = await getAsset(client, account, daoAvatar.asset_id);
	console.debug(asset);
	return {
		...asset,
		img: asset.immutable_deserialized_data?.img ?? defaultImg,
		video: asset.immutable_deserialized_data?.video ?? defaultVid,
	};
};
