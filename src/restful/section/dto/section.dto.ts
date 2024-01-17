import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class SectionDto {
    @Expose()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    	sectionName: string

    @Expose() // không cho bên ngoài thấy
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    	courseId: string
}