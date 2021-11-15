export interface Campaign {
  id: number;
  owner: Array<string>;
  content: {
    field_0: number;
    field_1: string;
  };
  reward: object;
  info?: object
}