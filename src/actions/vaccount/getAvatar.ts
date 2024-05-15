import { getAsset } from "../atomic/getAsset";
import {
	getAvatar as getDaoAvatar,
	type GetAvatarArgs,
} from "../dao/getAvatar";

// TODO: This function is failing, but it is not mission critical for the app to work.
export const getAvatar = async ({ client, account }: GetAvatarArgs) => {
	const defaultImg = "QmZQiEWsaTNpANMv9orwDvuGyMRkY5nQNazSB1KkW4pM6t";
	const defaultVid = "QmZQiEWsaTNpANMv9orwDvuGyMRkY5nQNazSB1KkW4pM6t";

	// This function is failing, let's comment it out for now.
	// const daoAvatar = await getDaoAvatar({ client, account });
	const asset = await getAsset({
		client,
		account,
		assetId: "2199025109172",
		// assetId: daoAvatar.asset_id,
	});
	return {
		...asset,
		img: asset.immutable_deserialized_data?.img ?? defaultImg,
		video: asset.immutable_deserialized_data?.video ?? defaultVid,
	};
};
