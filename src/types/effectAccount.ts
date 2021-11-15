import { vAccountRow } from "./vAccountRow";

export interface EffectAccount {
  accountName?: string;
  address?: string;
  privateKey?: string;
  permission?: string;
  provider?: string;
  vAccountRows?: Array<vAccountRow>;
}
