import { Injectable } from "@nestjs/common"
import PostContentEntity from "./post-content.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Injectable()
export default class PostContentService {
	constructor(
		//@InjectRepository(PostContentEntity) private readonly postContentRepository: Repository<PostContentEntity>
		) {}
}