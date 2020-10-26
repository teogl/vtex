export class Exception extends Error {
  constructor(
    public message: string,
    public domain: string
  ) {
    super(message);
  }
}
