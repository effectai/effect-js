export enum DefiBoxPairEnum {
	EosEfx = 191,
	EosUsdt = 12,
}

export const getDefiBoxPair = async (pairEnum: DefiBoxPairEnum) => {
	try {
		// TODO: Check how resilient this is, otherwise figure out how to use FetchProvider from the SDK Client.
		const useFetch = fetch ?? window.fetch;
		const result = await useFetch(
			"https://eos.greymass.com/v1/chain/get_table_rows",
			{
				method: "POST",
				body: JSON.stringify({
					json: true,
					code: "swap.defi",
					scope: "swap.defi",
					table: "pairs",
					limit: 1,
					lower_bound: pairEnum.valueOf(),
					upper_bound: pairEnum.valueOf(),
				}),
			},
		);

		return result.json().then((data) => data.rows[0]);
	} catch (error) {
		console.error(error);
		throw new Error("Error retrieving EFX Ticker Price from DefiBox");
	}
};
