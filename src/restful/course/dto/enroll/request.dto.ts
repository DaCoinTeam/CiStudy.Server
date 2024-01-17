import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export default class EnrollRequestDto {
    @IsUUID()
    @ApiProperty()
    	courseId: string
}