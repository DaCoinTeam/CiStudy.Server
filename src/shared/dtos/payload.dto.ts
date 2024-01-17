
export default interface Payload {
    userId: string,
    type: TokenType
}

export enum TokenType {
    Access,
    Refresh,
    Verify,
  }
  