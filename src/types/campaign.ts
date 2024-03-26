export interface Campaign {
    id: number;
    tasks_done: number;
    total_tasks: number;
    active_batch: number;
    num_batches: number;
    owner: [string, string];
    paused: number;
    content: {
        field_0: number;
        field_1: string;
    };
    max_task_time: number;
    reward: {
        quantity: string;
        contract: string;
    };
    qualis?: any[];
    info?: {
        version: number;
        title: string;
        description: string;
        instructions: string;
        template: string;
        input_schema?: any;
        output_schema?: any;
        image: string;
        category?: any;
        example_task?: any;
        estimated_time: number;
    };
}

export interface InitCampaign {
    quantity: string;
    max_task_time: number;
    qualis?: any[];
    info: {
        version: number;
        title: string;
        description: string;
        instructions: string;
        template: string;
        input_schema?: any;
        output_schema?: any;
        image: string;
        category?: any;
        example_task?: any;
        estimated_time: number;
    };
}

export interface Reservation {
    id: number;
    task_idx: number;
    account_id: number;
    batch_id: number;
    reserved_on: string;
    campaign_id: number;
}

export interface Batch {
    id: number;
    campaign_id: number;
    content: {
        field_0: number;
        field_1: string;
    };
    balance: {
        quantity: string;
        contract: string;
    };
    repetitions: number;
    tasks_done: number;
    num_tasks: number;
    start_task_idx: number;
    reward: {
        quantity: string;
        contract: string;
    };
}

export interface InitBatch {
    campaign_id: number;
    repetitions: number;
    data: any[];
}

export interface TasksSettings {
    vaccount_contract: string;
    force_vaccount_id: number;
    payout_delay_sec: number;
    release_task_delay_sec: number;
    fee_contract: string;
    fee_percentage: string;
    ram_payer?: string; // Deprecated
}

export interface RepsDone {
    campaign_id: number;
    task_idx: number;
    value: number;
}

export interface DaoConfig {
    stake_contract: string;
    proposal_contract: string;
    utl_token_sym: { sym: string; contract: string };
    gov_token_sym: { sym: string; contract: string };
    allowed_collections: string[];
}

export interface AtomicAsset {
    asset_id: string;
    collection_name: string;
    schema_name: string;
    template_id: string;
    ram_payer: string;
    backed_tokens: string[];
    immutable_serialized_data: Uint8Array;
    mutable_serialized_data: Uint8Array;
    immutable_deserialized_data: any;
    mutable_deserialized_data: any;
}

export interface AvatarAtomicAsset extends AtomicAsset {
    img?: string;
    video?: string;
}

export interface SchemaObject {
    name: string;
    type: any; // The value for the type keyword will indicate it's type.
}

export interface AtomicAssetSchema {
    schema_name: string;
    format: SchemaObject[];
}
