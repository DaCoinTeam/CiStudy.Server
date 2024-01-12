import { UserDto } from "./user.dto"

export type UserPayload = Partial<UserDto> & {
  userId: string;
};
