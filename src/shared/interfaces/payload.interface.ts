import { TokenType } from "../enums"

export default interface Payload {
  userId: string;
  type: TokenType;
}
