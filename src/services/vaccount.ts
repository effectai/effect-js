import { Client } from "../client";
import {
  ABIEncoder,
  Variant,
  Checksum256,
  Struct,
  Checksum160,
  Asset,
  Name,
  NameType,
  UInt128,
  UInt64,
} from "@wharfkit/antelope";
import { VAccount } from "../types/user";
import { AnyAction, TransactResult } from "@wharfkit/session";
import { AvatarAtomicAsset } from "../types/campaign";
import { SessionNotFoundError } from "../errors";
import { ClientConfig } from "../types";
import { GetTableRowsResponse } from "./utils";

@Variant.type("vaddress", [Checksum160, Name])
class VAddress extends Variant {
  declare value: Checksum160 | Name;
}

@Struct.type("extended_symbol")
class ExtendedSymbol extends Struct {
  static abiName = "extended_symbol";
  static abiFields = [
    { name: "contract", type: "name" },
    { name: "sym", type: "symbol" },
  ];
  constructor(sym: Asset.SymbolType, contract: NameType) {
    super({ sym, contract });
  }
}

export class VAccountService {
  constructor(private client: Client) {}

  async vtransfer(
    from_id: number,
    to_id: number,
    quantity: string,
  ): Promise<TransactResult> {
    if (!this.client.session) {
      throw new SessionNotFoundError(
        "this method requires a session to be set",
      );
    }

    const transferAction = {
      account: this.client.config.vaccountContract,
      name: "vtransfer",
      authorization: [this.client.session.permissionLevel],
      data: {
        from_id: from_id,
        to_id: to_id,
        quantity: {
          quantity: quantity,
          contract: this.client.config.tokenContract,
        },
        memo: "",
        payer: this.client.session.actor,
        sig: null,
        fee: null,
      },
    };
    return await this.client.session.transact({ action: transferAction });
  }

  async open(): Promise<TransactResult> {
    const { actor, authorization, transact } = this.client.useSession();

    const conf = this.client.config;
    const action = {
      account: conf.vaccountContract,
      name: "open",
      authorization,
      data: {
        acc: VAddress.from(Name.from(actor.toString())),
        symbol: new ExtendedSymbol("4,EFX", conf.tokenContract),
        payer: actor,
      },
    };

    return await transact({ action });
  }

  async getOrCreate(): Promise<VAccount | null> {
    let vaccountInstance = await this.get();

    if (!vaccountInstance) {
      await this.open();
      vaccountInstance = await this.get();
    }

    return vaccountInstance;
  }

  /**
   * Get vAccount row of the configured account and token contract
   * @returns {Promise<VAccount>}
   */
  async get(): Promise<VAccount | null> {
    const { conf, keycs } = this.generateCheckSumForVAccount();
    const response = await this.client.eos.v1.chain.get_table_rows({
      code: conf.vaccountContract,
      table: "account",
      scope: conf.vaccountContract,
      upper_bound: keycs,
      lower_bound: keycs,
      index_position: "secondary",
      key_type: "sha256",
    });

    return (
      response.rows.find(
        (row: VAccount) => row.balance.contract === conf.tokenContract,
      ) ?? null
    );
  }

  /**
   * Get all VAccount rows of the configured account and token contract
   */
  async getAll(): Promise<VAccount[]> {
    const { conf, keycs } = this.generateCheckSumForVAccount();
    const response = await this.client.eos.v1.chain.get_table_rows({
      code: conf.vaccountContract,
      table: "account",
      scope: conf.vaccountContract,
      upper_bound: keycs,
      lower_bound: keycs,
      index_position: "secondary",
      key_type: "sha256",
    });
    return response.rows;
  }

  /**
   * Retrieve the avatar asset for the given account
   * @param account
   */
  async getAvatarAsset(account: string): Promise<AvatarAtomicAsset> {
    const defaultImg = "QmZQiEWsaTNpANMv9orwDvuGyMRkY5nQNazSB1KkW4pM6t";
    const defaultVid = "QmZQiEWsaTNpANMv9orwDvuGyMRkY5nQNazSB1KkW4pM6t";
    const daoAvatar = await this.client.dao.getAvatar(account);
    const asset = await this.client.atomic.getAsset(
      account,
      daoAvatar.asset_id,
    );
    console.debug(asset);
    return {
      ...asset,
      img: asset.immutable_deserialized_data?.img ?? defaultImg,
      video: asset.immutable_deserialized_data?.video ?? defaultVid,
    };
  }

  /**
   * TODO: Figure out return type
   * get pending balance
   * @param accountId ID of  the given acccount
   * @returns the payment rows of the given `accountId`
   */
  getPendingPayout = async (accountId: number) => {
    const response = (await this.client.eos.v1.chain.get_table_rows({
      code: this.client.config.tasksContract,
      scope: this.client.config.tasksContract,
      table: "payment",
      index_position: "tertiary",
      key_type: "i64",
      lower_bound: UInt128.from(accountId),
      upper_bound: UInt128.from(accountId),
    })) as GetTableRowsResponse<UInt64, unknown>;

    return response;
  };

  /**
   * TODO: Define tests for this method
   * Receive tokens from completed tasks.
   * @param paymentId
   * @returns
   */
  async payout(): Promise<TransactResult> {
    if (!this.client.session) {
      throw new SessionNotFoundError(
        "this method requires a session to be set",
      );
    }

    const actions = <AnyAction[]>[];
    const vacc = await this.get();

    if (!vacc) {
      throw new Error("No vAccount found");
    }

    const settings = await this.client.tasks.getForceSettings();
    const payments = await this.getPendingPayout(vacc.id);

    if (payments) {
      for (const payment of payments.rows) {
        // payout is only possible after x amount of days have passed since the last_submission_time
        if (
          new Date(new Date(payment.last_submission_time) + "UTC").getTime() /
            1000 +
            settings.payout_delay_sec <
          Date.now() / 1000
        ) {
          actions.push({
            account: this.client.config.tasksContract,
            name: "payout",
            authorization: [
              {
                actor: this.client.session.actor,
                permission: this.client.session.permission,
              },
            ],
            data: {
              payment_id: payment.id,
            },
          });
        }
      }
    } else {
      throw new Error("No pending payouts found");
    }

    return await this.client.session.transact({ actions: actions });
  }

  /**
   * Generate checkSum for vaccount
   */
  generateCheckSumForVAccount(): { conf: ClientConfig; keycs: Checksum256 } {
    const { actor } = this.client.useSession();

    const conf = this.client.config;
    const enc = new ABIEncoder(32);
    Name.from(conf.tokenContract).toABI(enc);
    const vaddr = VAddress.from(Name.from(actor.toString()));
    enc.writeByte(vaddr.variantIdx);
    vaddr.value.toABI(enc);

    // const key = enc.getBytes().hexString;
    const arr = new Uint8Array(32);
    arr.set(enc.getData(), 0);
    const keycs = Checksum256.from(arr);

    return { conf, keycs };
  }
}
