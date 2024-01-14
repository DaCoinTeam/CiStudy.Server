import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import PostCommentContentEntity from "./post_comment_content.entity"

@Injectable()
export default class PostCommentContentService {
	constructor(@InjectRepository(PostCommentContentEntity) private readonly postCommentContentRepository: Repository<PostCommentContentEntity>) {}
}