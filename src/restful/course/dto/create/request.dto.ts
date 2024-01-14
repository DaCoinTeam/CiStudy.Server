import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsUrl, Max, Min } from "class-validator"

interface CourseIncludes {
    time: number;
}
export default class CreateRequestDto {
    @IsNotEmpty()
    @ApiProperty({ example: "Khóa học XYZ" })
    	title: string
    
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({ example: "https://www.facebook.com/" })
    	thumbnailUrl: string

    @IsNotEmpty()
    @ApiProperty({ example: "The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and so much more." })
    	description: string
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(10000000)
    @ApiProperty({ example: "129999" })
    	price: number
        
    // @ApiProperty()
    creatorId: string

    @IsUrl()
    @ApiProperty({ example: "https://www.facebook.com/" })
    	previewVideoUrl: string

    @ApiProperty({ example: ["Target 1", "Target 2", "Target 3", "Target 4"] })
    	targets: string[]
    
    @ApiProperty({ example: {"time": "9hour", "artical": "2"} })
    	includes: CourseIncludes
}