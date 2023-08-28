export interface Campaign {
  id: number,
  owner: Array<string>,
  content: {
    field_0: number,
    field_1: string,
  },
  reward: {
    quantity: string,
    contract: string,
  },
  qualis?: Array<{key: number, value: number}>,
  info?: {
    title: string,
    description: string,
    instructions: string,
    template: string,
    image: string,
    category: string,
    example_task: {
      image_url: string,
    },
    version: number,
    webhook: string,
    reward: string,
    estimated_time: string,
  }
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

export interface TaskData {
  
}