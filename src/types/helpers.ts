export type GetTableRowsResponse<Key, T> = {
  rows: T[];
  more: boolean;
  next_key?: Key;
};
