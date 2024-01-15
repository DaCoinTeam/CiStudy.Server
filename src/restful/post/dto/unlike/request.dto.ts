import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export default class UnLikeRequestDto {
    @IsUUID()
    @ApiProperty()
    	postId: string
}