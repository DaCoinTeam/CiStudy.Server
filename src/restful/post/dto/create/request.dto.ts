import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class CreateRequestDto {
    @IsNotEmpty()
    @ApiProperty()
    	title: string
}