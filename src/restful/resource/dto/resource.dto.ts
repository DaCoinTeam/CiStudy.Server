import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class ResourceDto {
    @ApiProperty()
    resourceLink: string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    lectureId: string
}
