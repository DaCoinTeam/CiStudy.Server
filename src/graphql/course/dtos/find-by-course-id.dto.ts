import { IsUUID } from "class-validator"

export default class FindByCourseIdRequestDto {
  @IsUUID()
  	courseId: string
}
