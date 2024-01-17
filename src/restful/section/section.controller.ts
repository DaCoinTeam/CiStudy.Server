import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger"
import { SectionDto } from "./dto/section.dto"
import { SectionService } from "./section.service"
import { plainToClass } from "class-transformer"

@ApiTags("section")
@Controller("api/section")
export class SectionController {
	constructor(private readonly sectionService: SectionService) {}

  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @Post()
	async create(@Body() body: SectionDto) {
		const section = plainToClass(SectionDto, body, {
			excludeExtraneousValues: true,
		})
		console.log(section)
		return
		return await this.sectionService.create(section)
	}

  @ApiOkResponse()
  @Get("/get-section-by-courseId/:id")
  async getAllSectionByCourseId(@Param("id") id: string) {
  	return await this.sectionService.findById(id)
  }
}
