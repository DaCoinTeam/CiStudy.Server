import { ConflictException, Injectable } from "@nestjs/common"
import { PostLikeMySqlService, PostMySqlService, PostCommentMySqlService } from "@database"
import { CreateRequestDto, LikeRequestDto, CommentRequestDto, ReplyCommentRequestDto } from "./dto"
import { ContentType, PostMySqlDto, UserMySqlDto, PostCommentSqlDto } from "@shared"
import { FirebaseService } from "@global"
import { DeepPartial } from "typeorm"

@Injectable()
export default class PostService {
	constructor(
    private readonly postMySqlService: PostMySqlService,
    private readonly postLikeMySqlService: PostLikeMySqlService,
    private readonly firebaseService: FirebaseService,
	private readonly postCommentMySqlService: PostCommentMySqlService,
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

		const created = await this.postMySqlService.create(post)
		console.log(created)
		return `A post with id ${created.postId} has been created successfully.`
	}

	async like(user: UserMySqlDto, body: LikeRequestDto) {
		const found = await this.postLikeMySqlService.findByUserIdAndPostId(
			user.userId,
			body.postId,
		)
		if (found !== null && !found.isDeleted)
			throw new ConflictException(
				`The post with id ${body.postId} has already been liked.`,
			)
		await this.postLikeMySqlService.create({
			userId: user.userId,
			postId: body.postId
		})
		return `Successfully liked the post with id ${body.postId}.`
	}

	async unlike(user: UserMySqlDto, body: LikeRequestDto) {
		const found = await this.postLikeMySqlService.findByUserIdAndPostId(
			user.userId,
			body.postId,
		)
		if (found === null || found.isDeleted)
			throw new ConflictException(
				`The post with id ${body.postId} has already not been liked.`,
			)
		await this.postLikeMySqlService.create({
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

		const created = await this.postCommentMySqlService.create(postComment)

		console.log(created)
	
		return `A comment with id ${created.postId} has been created successfully.`
	}

	async replyComment(
		user: UserMySqlDto,
		data: ReplyCommentRequestDto,
		files: Express.Multer.File[],
	): Promise<string> {
		const { postCommentContents } = data
		const promises: Promise<void>[] = []

		const fatherComment = await this.postCommentMySqlService.findOne({
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

		const created = await this.postCommentMySqlService.create(postComment)
	
		return `Comment with id ${created.postCommentId} reply successfully to comment with id ${created.fatherCommentId}.`
	}
}
