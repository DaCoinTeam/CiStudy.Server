import { IsUUID } from "class-validator"

export default class InitRequestDto {
  @IsUUID()
  	clientId: string
}
