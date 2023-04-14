export class ApplicationError extends Error {
  public type = 'ApplicationError';

  constructor(message: string) {
    super(message);
  }
}
