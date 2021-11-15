export interface Batch {
  id: number;
  campaignId: number;
  content: {
    field_0: number;
    field_1: string;
  };
  task_merkle_root: string;
  balance: object;
  repetitions: number;
  tasks_done: number;
  num_tasks: number;
}