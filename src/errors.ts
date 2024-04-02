export class AuthenticationError extends Error {}
export class SessionNotFoundError extends Error {}
export class TransactionError extends Error {}
export class VAccountError extends Error {}

export class TaskIpfsError extends Error {
  constructor(
    message: string,
    public retry: number = 0,
  ) {
    super(message);
  }
}
