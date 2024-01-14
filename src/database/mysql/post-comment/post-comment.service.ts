import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import PostCommentEntity from "./post-comment.entity"

@Injectable()
export default class PostCommentService {
	constructor(
    // @InjectRepository(PostCommentEntity)
    // private readonly postCommentRepository: Repository<PostCommentEntity>,
	) {}
}
