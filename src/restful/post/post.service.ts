import { ConflictException, Injectable } from "@nestjs/common"
import { PostLikeMySqlService, PostMySqlService } from "@database"
import { CreateRequestDto, LikeRequestDto } from "./dto"
import { ContentType, PostMySqlDto, UserMySqlDto } from "@shared"
import { FirebaseService } from "@global"

@Injectable()
export default class PostService {
	constructor(
    private readonly postMySqlService: PostMySqlService,
    private readonly postLikeMySqlService: PostLikeMySqlService,
    private readonly firebaseService: FirebaseService,
	) {}

	async create(
		user: UserMySqlDto,
		data: CreateRequestDto,
		files: Express.Multer.File[],
	): Promise<string> {
		const { postContents } = data
		console.log(files)
		const promises: Promise<void>[] = []

		let indexFile = 0
		for (const postContent of data.postContents) {
			const promise = async () => {
				if (
					postContent.contentType === ContentType.Image ||
          postContent.contentType === ContentType.Video
				) {
					const { buffer, filename } = files.at(indexFile)
					const url = await this.firebaseService.uploadFile(buffer, filename)
					postContent.content = url
					indexFile++
				}
			}
			promises.push(promise())
		}
		await Promise.all(promises)

		const post: Partial<PostMySqlDto> = {
			...data,
			creatorId: user.userId,
			postContents: postContents.map((postContent, index) => ({
				...postContent,
				index,
			})),
		}

		const created = await this.postMySqlService.create(post)
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
}
