import type {
	BytesType,
	Checksum160Type,
	UInt64,
	UInt64Type,
} from "@wharfkit/antelope";

export type BVectorUint64E = UInt64Type[];
export type QUALIATOMICADDRESS = VariantNameUint32Uint64;
export type Address = Checksum160Type;
export type Content = TupleUint8String;
export type Vaddress = VariantAddressName;

export type VariantAddressName = [string, string];
export type VariantNameUint32Uint64 = [string, number, number];

export type Quali = {
	type: number;
	address: QUALIATOMICADDRESS;
	data_filter?: QualiDataFilter;
};
export type QualiDataFilter = {
	attr_id: number;
	filter_type: number;
	data: string;
};
export type Acctaskidx = {
	account_id: number;
	campaign_id: number;
	value: number;
};
export type Batch = {
	id: number;
	campaign_id: number;
	content: Content;
	balance: { quantity: string; contract: string };
	repetitions: number;
	num_tasks: number;
	start_task_idx: number;
	reward: { quantity: string; contract: string };
};
export type Campaign = {
	id: number;
	reservations_done: number;
	total_submissions: number;
	total_tasks: number;
	active_batch: number;
	num_batches: number;
	owner: Vaddress;
	paused: boolean;
	content: Content;
	max_task_time: number;
	reward: { quantity: string; contract: string };
	qualis: Quali[];
};
export type Cleartasks = { batch_id: number; campaign_id: number };
export type Editcampaign = {
	campaign_id: number;
	owner: Vaddress;
	content: Content;
	paused: boolean;
	reward: { quantity: string; contract: string };
	qualis: Quali[];
	payer: string;
};
export type Init = {
	vaccount_contract: string;
	force_vaccount_id: number;
	payout_delay_sec: number;
	release_task_delay_sec: number;
	fee_contract: string;
	fee_percentage: number;
};
export type Mkbatch = {
	id: number;
	campaign_id: number;
	content: Content;
	repetitions: number;
	payer: string;
};

export type Mkcampaign = {
	owner: Vaddress;
	content: Content;
	max_task_time: number;
	reward: { quantity: string; contract: string };
	qualis: Quali[];
	payer: string;
};

export type Payment = {
	id: number;
	account_id: number;
	batch_id: number;
	pending: { quantity: string; contract: string };
	last_submission_time: string;
};
export type Payout = { payment_id: number };
export type Publishbatch = { batch_id: number; num_tasks: number };
export type Repsdone = { campaign_id: number; task_idx: number; value: number };
export type Reservation = {
	id: number;
	task_idx: number;
	account_id?: number;
	batch_id: number;
	reserved_on: string;
	campaign_id: number;
};
export type Reservetask = {
	campaign_id: number;
	account_id: number;
	quali_assets?: BVectorUint64E;
	payer: string;
};
export type Rmbatch = { id: number; campaign_id: number };
export type Rmcampaign = { campaign_id: number; owner: Vaddress };
export type Settings = {
	vaccount_contract: string;
	force_vaccount_id: number;
	payout_delay_sec: number;
	release_task_delay_sec: number;
	fee_contract: string;
	fee_percentage: number;
};
export type Submission = {
	id: number;
	campaign_id: number;
	task_idx: number;
	account_id?: number;
	content?: Content;
	batch_id: number;
	data?: string;
	paid: boolean;
	submitted_on: string;
};
export type Submittask = {
	campaign_id: number;
	task_idx: number;
	data: string;
	account_id: number;
	payer: string;
};
export type TupleUint8String = { field_0: number; field_1: string };
