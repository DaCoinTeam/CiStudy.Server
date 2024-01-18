export default interface Payload {
    userId: string,
    type: TokenType
}

export enum TokenType {
    Access = "Access",
    Refresh = "Refresh",
    Verify = "Verify",
  }
  