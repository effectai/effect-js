import {
	ABIEncoder,
	Checksum256,
	Name,
	UInt32,
	UInt64,
} from "@wharfkit/antelope";
import { VAddress } from "./variants";

export function createCompositeU64Key(lowerId: number, upperId: number) {
	// Check if lowerId or upperId isn't of type number
	if (typeof lowerId !== "number" || typeof upperId !== "number") {
		throw new TypeError("Both lowerId and upperId must be numbers");
	}

	const byteArray = new Uint8Array(8);
	byteArray.set(UInt32.from(lowerId).byteArray, 0);
	byteArray.set(UInt32.from(upperId).byteArray, 4);

	return UInt64.from(byteArray);
}

export const generateCheckSumForVAccount = (
	actor: Name,
	tokenContract: string,
): Checksum256 => {
	const enc = new ABIEncoder(32);
	Name.from(tokenContract).toABI(enc);
	const vaddr = VAddress.from(Name.from(actor.toString()));
	enc.writeByte(vaddr.variantIdx);
	vaddr.value.toABI(enc);

	const arr = new Uint8Array(32);
	arr.set(enc.getData(), 0);
	const keycs = Checksum256.from(arr);

	return keycs;
};
