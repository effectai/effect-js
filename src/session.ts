import type {
	Name,
	PermissionLevelType,
	Session,
	TransactArgs,
	TransactOptions,
} from "@wharfkit/session";
import { TransactionError } from "./errors";
import type { VAccount } from "./exports";
import { TxState, waitForTransaction } from "./utils/transaction";

export class EffectSession {
	public readonly wharfKitSession: Session;

	public readonly actor: Name;
	public readonly permission: Name;
	public readonly permissionLevel: PermissionLevelType;
	public readonly authorization: { actor: Name; permission: Name }[];

	private _vAccount: VAccount | null;

	get vAccount(): VAccount | null {
		return this._vAccount;
	}

	constructor(session: Session, vAccount: VAccount) {
		this.actor = session.actor;
		this.permission = session.permission;
		this.permissionLevel = session.permissionLevel;
		this.wharfKitSession = session;
		this.authorization = [{ actor: this.actor, permission: this.permission }];
		this._vAccount = vAccount;
	}

	public transact = async (args: TransactArgs) => {
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
