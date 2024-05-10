import type {
	NameType,
	PermissionLevelType,
	Session,
	TransactArgs,
} from "@wharfkit/session";
import { TxState, waitForTransaction } from "./utils/transaction";
import type { Account } from "./@generated/types/efxaccount11";

export class EffectSession {
	public readonly wharfKitSession: Session;

	public readonly actor: NameType;
	public readonly permission: NameType;
	public readonly permissionLevel: PermissionLevelType;
	public readonly authorization: { actor: NameType; permission: NameType }[];

	private _vAccount: Account | null;

	get vAccount(): Account | null {
		return this._vAccount;
	}

	constructor(session: Session, vAccount: Account) {
		this.actor = session.actor;
		this.permission = session.permission;
		this.permissionLevel = session.permissionLevel;
		this.wharfKitSession = session;
		this.authorization = [{ actor: this.actor, permission: this.permission }];
		this._vAccount = vAccount;
	}

  public transact = async (args: TransactArgs): Promise<TransactResult> => {
    // Start the transaction
    const transaction = await this.wharfKitSession.transact({
      ...args,
    });

    //wait for TX to be IN BLOCK
    await waitForTransaction(
      transaction.response?.transaction_id,
      this.wharfKitSession.client.v1.chain,
      TxState.IN_BLOCK,
    );

    return transaction;
  };
}
