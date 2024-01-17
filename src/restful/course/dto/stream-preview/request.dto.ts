import { IsUUID } from "class-validator"

export default class StreamPreviewRequestDto {
    @IsUUID()
    	courseId: string
}