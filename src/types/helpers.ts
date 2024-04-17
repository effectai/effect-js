import type { UInt64, UInt32, UInt128 } from "@wharfkit/antelope";

export type GetTableRowsResponse<Key, T> = {
	rows: T[];
	more: boolean;
	next_key?: Key;
};

// Maps wharfkit antelope types to native types
export type Serialized<T> = {
	[K in keyof T]: T[K] extends
		| UInt32
		| (UInt32 | undefined)
		| UInt64
		| (UInt64 | undefined)
		| UInt128
		| (UInt128 | undefined)
		? number
		: T[K];
};
