import { transform } from "@greymass/abi2core";

const getAbi = async (name: string) => {
	const abis = await fetch("https://jungle4.cryptolions.io/v1/chain/get_abi", {
		method: "POST",
		body: JSON.stringify({ account_name: name }),
	});
	const data = await abis.json();
	return data;
};

const abis = ["effecttasks2"];

const main = async () => {
	for (const abi of abis) {
		const abiData = await getAbi(abi);
		const t = transform(abiData.abi);
		Bun.write(`src/@generated/types/${abi}.ts`, t.out.join("\n"));
		Bun.write(
			`src/@generated/abi/${abi}.ts`,
			`export const abi = ${JSON.stringify(abiData.abi)};`,
		);
	}
};

main();
