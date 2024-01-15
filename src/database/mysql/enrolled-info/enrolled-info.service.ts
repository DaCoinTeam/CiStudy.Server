import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import PostCommentEntity from "./enrolled-info.entity"

@Injectable()
export default class EnrolledInfoService {
	constructor(
    // @InjectRepository(PostCommentEntity)
    // private readonly postCommentRepository: Repository<PostCommentEntity>,
	) {}
}
