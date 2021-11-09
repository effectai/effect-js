import { vAccountRow } from "./vAccountRow";

export interface EffectAccount {
  accountName: string;
  publicKey: string;
  privateKey?: string;
  permission?: string;
  provider?: string;
  vAccountRows: Array<vAccountRow>;
}
