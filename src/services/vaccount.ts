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
import { Payment, VAccount } from "../types/user";
import { AnyAction, TransactResult } from "@wharfkit/session";
import { AvatarAtomicAsset } from "../types/campaign";
import { SessionNotFoundError } from "../errors";
import { GetTableRowsResponse } from "../types/helpers";

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

    const { contracts } = this.client.useConfig();

    const transferAction = {
      account: contracts.vaccount,
      name: "vtransfer",
      authorization: [this.client.session.permissionLevel],
      data: {
        from_id: from_id,
        to_id: to_id,
        quantity: {
          quantity: quantity,
          contract: contracts.token,
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
    const { contracts } = this.client.useConfig();

    const action = {
      account: contracts.vaccount,
      name: "open",
      authorization,
      data: {
        acc: VAddress.from(Name.from(actor.toString())),
        symbol: new ExtendedSymbol("4,EFX", contracts.token),
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
    const keycs = this.generateCheckSumForVAccount();
    const { contracts } = this.client.useConfig();

    const response = await this.client.eos.v1.chain.get_table_rows({
      code: contracts.vaccount,
      table: "account",
      scope: contracts.vaccount,
      upper_bound: keycs,
      lower_bound: keycs,
      index_position: "secondary",
      key_type: "sha256",
    });

    return (
      response.rows.find(
        (row: VAccount) => row.balance.contract === contracts.token,
      ) ?? null
    );
  }

  /**
   * Get all VAccount rows of the configured account and token contract
   */
  async getAll(): Promise<VAccount[]> {
    const keycs = this.generateCheckSumForVAccount();
    const { contracts } = this.client.useConfig();

    const response = await this.client.eos.v1.chain.get_table_rows({
      code: contracts.vaccount,
      table: "account",
      scope: contracts.vaccount,
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
    const { contracts } = this.client.useConfig();
    const response = (await this.client.eos.v1.chain.get_table_rows({
      code: contracts.tasks,
      scope: contracts.tasks,
      table: "payment",
      index_position: "tertiary",
      key_type: "i64",
      lower_bound: UInt128.from(accountId),
      upper_bound: UInt128.from(accountId),
    })) as GetTableRowsResponse<UInt64, Payment>;

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

    const { contracts } = this.client.useConfig();
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
            account: contracts.tasks,
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
  generateCheckSumForVAccount(): Checksum256 {
    const { contracts } = this.client.useConfig();
    const { actor } = this.client.useSession();

    const enc = new ABIEncoder(32);
    Name.from(contracts.token).toABI(enc);
    const vaddr = VAddress.from(Name.from(actor.toString()));
    enc.writeByte(vaddr.variantIdx);
    vaddr.value.toABI(enc);

    // const key = enc.getBytes().hexString;
    const arr = new Uint8Array(32);
    arr.set(enc.getData(), 0);
    const keycs = Checksum256.from(arr);

    return keycs;
  }
}
