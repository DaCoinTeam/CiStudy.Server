import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common"
import SectionService from "./section.service"
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import SectionDto from "./dto/section.dto"
import { AuthInterceptor } from "../shared"
import { JwtAuthGuard } from "src/graphql/shared"

@ApiTags("section")
@Controller("api/section")
export class SectionController {
	constructor(private readonly sectionService: SectionService) {}

	@ApiBearerAuth()
	@ApiBadRequestResponse()
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(AuthInterceptor)
	@ApiCreatedResponse({ type: SectionDto })
	@Post()
	async create(@Body() section: SectionDto): Promise<SectionDto> {
		return await this.sectionService.create(section)
	}

	@Delete(":sectionId")
	async delete(@Param("sectionId") sectionId: string) {
		return await this.sectionService.delete(sectionId)
	}
	
	@Get(":courseId")
	async findByCourseId(@Param("courseId") courseId: string): Promise<SectionDto[]> {
		return await this.sectionService.find(courseId)
	}
}