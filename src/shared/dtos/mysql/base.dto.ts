import { ContentType } from "@database"
import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export abstract class BaseDto {
    @IsString()
    @ApiProperty()
    	content: string
    
    @ApiProperty()
    	contentType: ContentType
}