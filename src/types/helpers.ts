export type GetTableRowsResponse<Key, T> = {
  key: Key;
  rows: T[];
  more: boolean;
  next_key: Key;
};
