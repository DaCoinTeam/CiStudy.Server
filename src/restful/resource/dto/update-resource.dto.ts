import { PartialType } from "@nestjs/swagger"
import { ResourceDto } from "./resource.dto"

export class UpdateResourceDto extends PartialType(ResourceDto) {}
