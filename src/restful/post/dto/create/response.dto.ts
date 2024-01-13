import { ApiProperty } from "@nestjs/swagger"

export default class CreateReponseDto {
    @ApiProperty()
    	postId: string
    @ApiProperty()
    	title: string
}