export interface Campaign {
    id: number
    tasks_done: number
    total_tasks: number
    active_batch: number
    num_batches: number
    owner: [string, string]
    paused: number
    content: {
        field_0: number
        field_1: string
    }
    max_task_time: number
    reward: {
        quantity: string
        contract: string
    }
    qualis?: any[]
    info?: {
        version: number
        title: string
        description: string
        instructions: string
        template: string
        input_schema?: any
        output_schema?: any
        image: string
        category?: any
        example_task?: any
        estimated_time: number
    }
}

export interface InitCampaign {
    quantity: string
    max_task_time: number
    qualis?: any[]
    info: {
        version: number
        title: string
        description: string
        instructions: string
        template: string
        input_schema?: any
        output_schema?: any
        image: string
        category?: any
        example_task?: any
        estimated_time: number
    }
}

export interface Reservation {
    id: number
    task_idx: number
    account_id: number
    batch_id: number
    reserved_on: string
    campaign_id: number
}

export interface Batch {
    id: number
    campaign_id: number
    content: {
        field_0: number
        field_1: string
    }
    balance: {
        quantity: string
        contract: string
    }
    repetitions: number
    tasks_done: number
    num_tasks: number
    start_task_idx: number
    reward: {
        quantity: string
        contract: string
    }
}

export interface InitBatch {
    campaign_id: number
    repetitions: number
    data: any[]
}

/**
 * TaskSettings
 * @property {string} vaccount_contract
 * @property {number} force_vaccount_id
 * @property {number} payout_delay_sec
 * @property {number} release_task_delay_sec
 * @property {string} fee_contract
 * @property {string} fee_percentage
 * @property {string} ram_payer - Deprecated
 */
export interface TasksSettings {
    vaccount_contract: string
    force_vaccount_id: number
    payout_delay_sec: number
    release_task_delay_sec: number
    fee_contract: string
    fee_percentage: string
    ram_payer?: string
}
