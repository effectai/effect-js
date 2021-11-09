export interface Task {
  id: number;
  account_id: number;
  content: string;
  leaf_hash: string;
  batch_id: number;
  data: string;
  paid: number;
}