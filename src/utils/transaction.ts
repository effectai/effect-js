import type { ChainAPI, Checksum256Type } from "@wharfkit/antelope";

export enum TxState {
	EXECUTED = "EXECUTED",
	SOFT_FAIL = "soft_fail",
	HARD_FAIL = "hard_fail",
	EXPIRED = "EXPIRED",
	IRREVERSIBLE = "IRREVERSIBLE",
	IN_BLOCK = "IN_BLOCK",
}

export function waitForTransaction(
	transactionId: Checksum256Type,
	context: ChainAPI,
	state: TxState = TxState.IRREVERSIBLE,
	maxRetries = 3,
) {
	return new Promise((resolve, reject) => {
		let attempt = 0;
		const interval = setInterval(async () => {
			try {
				attempt++;
				const response = await context.get_transaction_status(transactionId);
				if (
					response.state === TxState.SOFT_FAIL ||
					response.state === TxState.HARD_FAIL ||
					response.state === TxState.EXPIRED
				) {
					clearInterval(interval);
					reject(response);
				}

				if (response?.state === state) {
					clearInterval(interval);
					resolve(response);
				}
			} catch (error) {
				if (attempt > maxRetries) {
					clearInterval(interval);
					reject(error);
				}
			}
		}, 3000);
	});
}
