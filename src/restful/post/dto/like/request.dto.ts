import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export default class LikeRequestDto {
    @IsUUID()
    @ApiProperty()
    	postId: string
}