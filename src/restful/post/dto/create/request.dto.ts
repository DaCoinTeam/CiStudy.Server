import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsUUID, MinLength } from "class-validator"

export default class CreateRequestDto {
    @IsUUID()
    @ApiProperty({
    	example: "1a469863-ceb1-421f-8f17-700d61a85253", description: "ClientId"
    })
    	clientId: string

    @IsBoolean()
    @ApiProperty({
    	example: false, description: "RequestAuthTokens"
    })
    	requestAuthTokens?: boolean

    @IsNotEmpty()
    @MinLength(20)
    @ApiProperty({
    	example: "hentaiz.net", description: "Title"
    })
    	title: string
    @IsUUID()
    @ApiProperty({
    	example: "026e74b1-d587-4249-a53f-6413264c1e94", description: "CourseId"
    })
    	courseId: string 
}