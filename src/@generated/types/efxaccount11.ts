import type {
	Checksum160,
	ExtendedSymbol,
	Signature,
} from "@wharfkit/antelope";

export type Address = Checksum160;
export type Vaddress = VariantAddressName;

export type VariantAddressName = [string, string];

export type Account = {
	id: number;
	nonce: number;
	address: Vaddress;
	balance: { quantity: string; contract: string };
};

export type Open = { acc: Vaddress; symbol: ExtendedSymbol; payer: string };
export type Vtransfer = {
	from_id: number;
	to_id: number;
	quantity: { quantity: string; contract: string };
	memo: string;
	sig?: Signature;
	fee?: { quantity: string; contract: string };
};

export type Withdraw = {
	from_id: number;
	to_account: string;
	quantity: { quantity: string; contract: string };
	memo: string;
	sig?: Signature;
	fee?: { quantity: string; contract: string };
};
