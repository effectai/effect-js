// generated by @greymass/abi2core

import {
	Bytes,
	Checksum160,
	ExtendedAsset,
	Float32,
	Name,
	Struct,
	TimePointSec,
	TypeAlias,
	UInt32,
	UInt64,
	UInt8,
	Variant,
} from "@wharfkit/antelope";

@TypeAlias("B_vector_uint64_E")
class BVectorUint64E extends UInt64 {}

@Variant.type("variant_name_uint32_uint64", [Name, UInt32, UInt64])
class VariantNameUint32Uint64 extends Variant {}

@TypeAlias("QUALI_ATOMIC_ADDRESS")
class QUALIATOMICADDRESS extends VariantNameUint32Uint64 {}

@TypeAlias("address")
class Address extends Checksum160 {}

@Struct.type("tuple_uint8_string")
export class TupleUint8String extends Struct {
	@Struct.field(UInt8) field_0!: UInt8;
	@Struct.field("string") field_1!: string;
}

@TypeAlias("content")
class Content extends TupleUint8String {}

@Variant.type("variant_address_name", [Address, Name])
class VariantAddressName extends Variant {}

@TypeAlias("vaddress")
class Vaddress extends VariantAddressName {}

@Struct.type("QualiDataFilter")
export class QualiDataFilter extends Struct {
	@Struct.field(UInt8) attr_id!: UInt8;
	@Struct.field(UInt8) filter_type!: UInt8;
	@Struct.field(Bytes) data!: Bytes;
}

@Struct.type("Quali")
export class Quali extends Struct {
	@Struct.field(UInt8) type!: UInt8;
	@Struct.field(QUALIATOMICADDRESS) address!: QUALIATOMICADDRESS;
	@Struct.field(QualiDataFilter, { optional: true })
	data_filter?: QualiDataFilter;
}

@Struct.type("acctaskidx")
export class Acctaskidx extends Struct {
	@Struct.field(UInt32) account_id!: UInt32;
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(UInt32) value!: UInt32;
}

@Struct.type("batch")
export class Batch extends Struct {
	@Struct.field(UInt32) id!: UInt32;
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(Content) content!: Content;
	@Struct.field(ExtendedAsset) balance!: ExtendedAsset;
	@Struct.field(UInt32) repetitions!: UInt32;
	@Struct.field(UInt32) num_tasks!: UInt32;
	@Struct.field(UInt32) start_task_idx!: UInt32;
	@Struct.field(ExtendedAsset) reward!: ExtendedAsset;
}

@Struct.type("campaign")
export class Campaign extends Struct {
	@Struct.field(UInt32) id!: UInt32;
	@Struct.field(UInt32) reservations_done!: UInt32;
	@Struct.field(UInt32) total_submissions!: UInt32;
	@Struct.field(UInt32) total_tasks!: UInt32;
	@Struct.field(UInt32) active_batch!: UInt32;
	@Struct.field(UInt32) num_batches!: UInt32;
	@Struct.field(Vaddress) owner!: Vaddress;
	@Struct.field("bool") paused!: boolean;
	@Struct.field(Content) content!: Content;
	@Struct.field(UInt32) max_task_time!: UInt32;
	@Struct.field(ExtendedAsset) reward!: ExtendedAsset;
	@Struct.field(Quali, { array: true }) qualis!: Quali[];
}

@Struct.type("clean")
export class Clean extends Struct {}

@Struct.type("cleartasks")
export class Cleartasks extends Struct {
	@Struct.field(UInt32) batch_id!: UInt32;
	@Struct.field(UInt32) campaign_id!: UInt32;
}

@Struct.type("editcampaign")
export class Editcampaign extends Struct {
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(Vaddress) owner!: Vaddress;
	@Struct.field(Content) content!: Content;
	@Struct.field("bool") paused!: boolean;
	@Struct.field(ExtendedAsset) reward!: ExtendedAsset;
	@Struct.field(Quali, { array: true }) qualis!: Quali[];
	@Struct.field(Name) payer!: Name;
}

@Struct.type("init")
export class Init extends Struct {
	@Struct.field(Name) vaccount_contract!: Name;
	@Struct.field(UInt32) force_vaccount_id!: UInt32;
	@Struct.field(UInt32) payout_delay_sec!: UInt32;
	@Struct.field(UInt32) release_task_delay_sec!: UInt32;
	@Struct.field(Name) fee_contract!: Name;
	@Struct.field(Float32) fee_percentage!: Float32;
}

@Struct.type("mkbatch")
export class Mkbatch extends Struct {
	@Struct.field(UInt32) id!: UInt32;
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(Content) content!: Content;
	@Struct.field(UInt32) repetitions!: UInt32;
	@Struct.field(Name) payer!: Name;
}

@Struct.type("mkcampaign")
export class Mkcampaign extends Struct {
	@Struct.field(Vaddress) owner!: Vaddress;
	@Struct.field(Content) content!: Content;
	@Struct.field(UInt32) max_task_time!: UInt32;
	@Struct.field(ExtendedAsset) reward!: ExtendedAsset;
	@Struct.field(Quali, { array: true }) qualis!: Quali[];
	@Struct.field(Name) payer!: Name;
}

@Struct.type("payment")
export class Payment extends Struct {
	@Struct.field(UInt64) id!: UInt64;
	@Struct.field(UInt32) account_id!: UInt32;
	@Struct.field(UInt64) batch_id!: UInt64;
	@Struct.field(ExtendedAsset) pending!: ExtendedAsset;
	@Struct.field(TimePointSec) last_submission_time!: TimePointSec;
}

@Struct.type("payout")
export class Payout extends Struct {
	@Struct.field(UInt64) payment_id!: UInt64;
}

@Struct.type("publishbatch")
export class Publishbatch extends Struct {
	@Struct.field(UInt64) batch_id!: UInt64;
	@Struct.field(UInt32) num_tasks!: UInt32;
}

@Struct.type("repsdone")
export class Repsdone extends Struct {
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(UInt32) task_idx!: UInt32;
	@Struct.field(UInt32) value!: UInt32;
}

@Struct.type("reservation")
export class Reservation extends Struct {
	@Struct.field(UInt64) id!: UInt64;
	@Struct.field(UInt32) task_idx!: UInt32;
	@Struct.field(UInt32, { optional: true }) account_id?: UInt32;
	@Struct.field(UInt64) batch_id!: UInt64;
	@Struct.field(TimePointSec) reserved_on!: TimePointSec;
	@Struct.field(UInt32) campaign_id!: UInt32;
}

@Struct.type("reservetask")
export class Reservetask extends Struct {
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(UInt32) account_id!: UInt32;
	@Struct.field(BVectorUint64E, { optional: true })
	quali_assets?: BVectorUint64E;
	@Struct.field(Name) payer!: Name;
}

@Struct.type("rmbatch")
export class Rmbatch extends Struct {
	@Struct.field(UInt32) id!: UInt32;
	@Struct.field(UInt32) campaign_id!: UInt32;
}

@Struct.type("rmcampaign")
export class Rmcampaign extends Struct {
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(Vaddress) owner!: Vaddress;
}

@Struct.type("settings")
export class Settings extends Struct {
	@Struct.field(Name) vaccount_contract!: Name;
	@Struct.field(UInt32) force_vaccount_id!: UInt32;
	@Struct.field(UInt32) payout_delay_sec!: UInt32;
	@Struct.field(UInt32) release_task_delay_sec!: UInt32;
	@Struct.field(Name) fee_contract!: Name;
	@Struct.field(Float32) fee_percentage!: Float32;
}

@Struct.type("submission")
export class Submission extends Struct {
	@Struct.field(UInt64) id!: UInt64;
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(UInt32) task_idx!: UInt32;
	@Struct.field(UInt32, { optional: true }) account_id?: UInt32;
	@Struct.field(Content, { optional: true }) content?: Content;
	@Struct.field(UInt64) batch_id!: UInt64;
	@Struct.field("string?") data?: string;
	@Struct.field("bool") paid!: boolean;
	@Struct.field(TimePointSec) submitted_on!: TimePointSec;
}

@Struct.type("submittask")
export class Submittask extends Struct {
	@Struct.field(UInt32) campaign_id!: UInt32;
	@Struct.field(UInt32) task_idx!: UInt32;
	@Struct.field("string") data!: string;
	@Struct.field(UInt32) account_id!: UInt32;
	@Struct.field(Name) payer!: Name;
}