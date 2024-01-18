import { ConflictException, Injectable } from "@nestjs/common"
import { PostLikeMySqlEntity, ContentType, PostMySqlEntity, PostCommentMySqlEntity } from "@database"
import { CreateRequestDto, LikeRequestDto, CommentRequestDto, ReplyCommentRequestDto } from "./dto"
import { PostMySqlDto, UserMySqlDto, PostCommentSqlDto } from "@shared"
import { FirebaseService } from "@global"
import { DeepPartial, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export default class PostService {
	constructor(
		@InjectRepository(PostMySqlEntity)
    private readonly postMySqlRepository: Repository<PostMySqlEntity>,
	@InjectRepository(PostLikeMySqlEntity)
    private readonly postLikeMySqlRepository: Repository<PostLikeMySqlEntity>,
	@InjectRepository(PostCommentMySqlEntity)
	private readonly postCommentMySqlRepository: Repository<PostCommentMySqlEntity>,

	private readonly firebaseService: FirebaseService,
	) {}

	async create(
		user: UserMySqlDto,
		data: CreateRequestDto,
		files: Express.Multer.File[],
	): Promise<string> {
		const { postContents } = data
		const promises: Promise<void>[] = []

		let indexFile = 0
		for (const postContent of postContents) {
			const promise = async () => {
				if (
					postContent.contentType === ContentType.Image ||
          postContent.contentType === ContentType.Video
				) {
					const { buffer, filename } = files.at(indexFile)
					const url = await this.firebaseService.uploadFile(buffer, filename)
					postContent.content = url
				}
			}
			indexFile++
			promises.push(promise())
		}
		await Promise.all(promises)

		const post: DeepPartial<PostMySqlDto> = {
			...data,
			creatorId: user.userId,
			postContents: postContents.map((postContent, index) => ({
				...postContent,
				index,
			})),
		}

		const created = await this.postMySqlRepository.save(post)
		return `A post with id ${created.postId} has been created successfully.`
	}

	async like(user: UserMySqlDto, body: LikeRequestDto) {
		const found = await this.postLikeMySqlRepository.findOneBy({
			userId: user.userId,
			postId: body.postId,
		})
		if (found !== null && !found.isDeleted)
			throw new ConflictException(
				`The post with id ${body.postId} has already been liked.`,
			)
		await this.postCommentMySqlRepository.save({
			userId: user.userId,
			postId: body.postId
		})
		return `Successfully liked the post with id ${body.postId}.`
	}

	async unlike(user: UserMySqlDto, body: LikeRequestDto) {
		const found = await this.postLikeMySqlRepository.findOneBy({
			userId: user.userId,
			postId: body.postId,
		}	)
		if (found === null || found.isDeleted)
			throw new ConflictException(
				`The post with id ${body.postId} has already not been liked.`,
			)
		await this.postLikeMySqlRepository.save({
			userId: user.userId,
			postId: body.postId
		})
		return `Successfully unliked the post with id ${body.postId}.`
	}

	async comment(
		user: UserMySqlDto,
		data: CommentRequestDto,
		files: Express.Multer.File[],
	): Promise<string> {
		const { postCommentContents } = data
		const promises: Promise<void>[] = []

		let indexFile = 0
		for (const postCommentContent of postCommentContents) {
			const promise = async () => {
				if (
					postCommentContent.contentType === ContentType.Image ||
					postCommentContent.contentType === ContentType.Video
				) {
					const { buffer, filename } = files.at(indexFile)
					const url = await this.firebaseService.uploadFile(buffer, filename)
					
					postCommentContent.content = url
				}
			}
			indexFile++
			promises.push(promise())
		}
		await Promise.all(promises)

		const postComment: DeepPartial<PostCommentSqlDto> = {
			...data,
			userId: user.userId,
			postCommentContents: postCommentContents.map((postCommentContent, index) => ({
				...postCommentContent,
				index,
			})),
		}

		const created = await this.postLikeMySqlRepository.save(postComment)
		return `A comment with id ${created.postId} has been created successfully.`
	}

	async replyComment(
		user: UserMySqlDto,
		data: ReplyCommentRequestDto,
		files: Express.Multer.File[],
	): Promise<string> {
		const { postCommentContents } = data
		const promises: Promise<void>[] = []

		const fatherComment = await this.postCommentMySqlRepository.findOneBy({
			postCommentId: data.fatherCommentId
		})

		let indexFile = 0
		for (const postCommentContent of postCommentContents) {
			const promise = async () => {
				if (
					postCommentContent.contentType === ContentType.Image ||
					postCommentContent.contentType === ContentType.Video
				) {
					const { buffer, filename } = files.at(indexFile)
					const url = await this.firebaseService.uploadFile(buffer, filename)
					
					postCommentContent.content = url
				}
			}
			indexFile++
			promises.push(promise())
		}
		await Promise.all(promises)

		const postComment: DeepPartial<PostCommentSqlDto> = {
			...data,
			postId: fatherComment.postId,
			userId: user.userId,
			fatherCommentId: fatherComment.postCommentId,
			postCommentContents: postCommentContents.map((postCommentContent, index) => ({
				...postCommentContent,
				index,
			})),
		}

		const created = await this.postCommentMySqlRepository.save(postComment)
	
		return `Comment with id ${created.postCommentId} reply successfully to comment with id ${created.fatherCommentId}.`
	}
}
