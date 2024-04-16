import { Checksum160, Name, Variant } from "@wharfkit/antelope";

@Variant.type("vaddress", [Checksum160, Name])
export class VAddress extends Variant {
	declare value: Checksum160 | Name;
}
