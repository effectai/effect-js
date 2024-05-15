import { transform } from "@greymass/abi2core";
import type { ABI } from "@wharfkit/antelope";

const getAbi = async (name: string) => {
	const abis = await fetch("https://jungle4.cryptolions.io/v1/chain/get_abi", {
		method: "POST",
		body: JSON.stringify({ account_name: name }),
	});
	const data = await abis.json();
	return data;
};

const getPrimitive = (field: any) => {
	switch (field) {
		case "string":
			return "string";
		case "bool":
			return "boolean";
		case "uint8":
			return "number";
		case "uint32":
			return "number";
		case "uint64":
			return "number";
		case "address":
			return "string";
		case "bytes":
			return "string";
		case "extended_asset":
			return "{quantity: string, contract: string}";
		case "checksum160":
			return "string";
		case "checksum256":
			return "string";
		case "name":
			return "string";
		case "time_point_sec":
			return "string";
		case "float32":
			return "number";
		default:
			return snakeToPascal(field);
	}
};

const generateTypes = (abi: ABI) => {
	const types = abi.types.map((type) => {
		return `export type ${snakeToPascal(type.new_type_name)} = ${snakeToPascal(
			type.type,
		)};`;
	});

	return types.join("\n");
};

const generateSchemaTypes = (abi: ABI) => {
	const types = abi.structs.map((struct) => {
		const fields = struct.fields.map((field) => {
			const isOptional = field.type.includes("?");

			return `${field.name}${isOptional ? "?" : ""}: ${getPrimitive(
				field.type.replace("?", ""),
			)};`;
		});

		return `export type ${snakeToPascal(struct.name)} = { ${fields.join(
			" ",
		)} };`;
	});

	return types.join("\n");
};

const generateVariantTypes = (abi: ABI) => {
	const types = abi.variants.map((variant) => {
		const fields = variant.types.map((field) => {
			return getPrimitive(field);
		});

		return `export type ${snakeToPascal(variant.name)} = [ ${fields.join(
			", ",
		)} ];`;
	});

	return types.join("\n");
};

function snakeToPascal(name: string): string {
	return name
		.split("_")
		.map((v) => (v[0] ? v[0].toUpperCase() : "_") + v.slice(1))
		.join("");
}

const abis = ["effecttasks2", "efxaccount11"];

const main = async () => {
	for (const abi of abis) {
		const abiData = await getAbi(abi);

		const types = generateTypes(abiData.abi);
		const variants = generateVariantTypes(abiData.abi);
		const schema = generateSchemaTypes(abiData.abi);

		console.log("writing to file", `src/@generated/types/${abi}.ts`);

		await Bun.write(
			`src/@generated/types/${abi}.ts`,
			`import type { BytesType, Checksum160Type, UInt64 } from "@wharfkit/antelope";
			\n\n
			${types}\n\n${variants}\n\n${schema}`,
		);
	}
};

main();
