export class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  errorResponseCode: number;
  status: number;

  constructor({
    name,
    message,
    errorResponseCode,
    status,
  }: {
    name: T;
    message: string;
    errorResponseCode: number;
    status: number;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.errorResponseCode = errorResponseCode;
    this.status = status;
  }
}
