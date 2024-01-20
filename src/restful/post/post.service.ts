import { ConflictException, Injectable } from "@nestjs/common"
import {
  PostLikeMySqlEntity,
  ContentType,
  PostMySqlEntity,
  PostCommentMySqlEntity,
  UserMySqlEntity,
  PostContentMySqlEntity,
} from "@database"
import {
  CreateRequestDto,
  LikeRequestDto,
  CommentRequestDto,
  ReplyCommentRequestDto,
  UpdateRequestDto,
  PostContentRequestDto,
} from "./dto"
import { FirebaseService } from "@global"
import { DeepPartial, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { IndexFileAppended } from "@shared"

@Injectable()
export default class PostService {
  constructor(
    @InjectRepository(PostMySqlEntity)
    private readonly postMySqlRepository: Repository<PostMySqlEntity>,
    @InjectRepository(PostLikeMySqlEntity)
    private readonly postLikeMySqlRepository: Repository<PostLikeMySqlEntity>,
    @InjectRepository(PostCommentMySqlEntity)
    private readonly postCommentMySqlRepository: Repository<PostCommentMySqlEntity>,
    @InjectRepository(PostContentMySqlEntity)
    private readonly postContentsRepository: Repository<PostContentMySqlEntity>,

    private readonly firebaseService: FirebaseService,
  ) {}

  private appendIndexFile(
    postContents: PostContentRequestDto[],
  ): IndexFileAppended<PostContentRequestDto>[] {
    let indexFile = 0
    return postContents.map((postContent) => {
      if (
        postContent.contentType !== ContentType.Image &&
        postContent.contentType !== ContentType.Video
      )
        return postContent

      const appended = {
        ...postContent,
        indexFile,
      }
      indexFile++
      return appended
    })
  }

  async create(
    user: UserMySqlEntity,
    data: CreateRequestDto,
    files: Express.Multer.File[],
  ): Promise<string> {
    const { postContents } = data
    const promises: Promise<void>[] = []

	//sửa postContents ban đầu thành phiên bản có index file, nghĩa là gắn thứ tự file vào 
	// trong post content
    const appendedPostContents = this.appendIndexFile(postContents)

	// chạy vòng for để up hình lên firebase
    for (const appendedPostContent of appendedPostContents) {
      if (
        appendedPostContent.contentType === ContentType.Image ||
        appendedPostContent.contentType === ContentType.Video
      ) {
        // Push the promise directly into the array without executing it immediately
        promises.push(
          (async () => {
            const { buffer, filename } =
              files[appendedPostContent.indexFile]
            const url = await this.firebaseService.uploadFile(buffer, filename)
            appendedPostContent.content = url
          })(),
        )
      }
    }
    await Promise.all(promises)

	// đơn giản là add vô
    const post: DeepPartial<PostMySqlEntity> = {
      ...data,
      creatorId: user.userId,
      postContents: appendedPostContents.map(
        (appendedPostContent, index) => ({
          ...appendedPostContent,
          index,
        }),
      ),
    }

    const created = await this.postMySqlRepository.save(post)
    return `A post with id ${created.postId} has been created successfully.`
  }

  // update post
  async update(
    user: UserMySqlEntity,
    data: UpdateRequestDto,
    files: Express.Multer.File[],
  ): Promise<string> {
    const found = await this.postMySqlRepository.findOneBy({
      postId: data.postId,
      creatorId: user.userId,
    })

    if (found === null) {
      throw new ConflictException(
        `The post with id ${data.postId} does not exist.`,
      )
    }

    await this.postContentsRepository.delete({ postId: data.postId })

    const promises: Promise<void>[] = []
    for (
      let contentIndex = 0;
      contentIndex < data.postContents.length;
      contentIndex++
    ) {
      const postContent = data.postContents[contentIndex]

      if (
        postContent.contentType === ContentType.Image ||
        postContent.contentType === ContentType.Video
      ) {
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
          // Push the promise directly into the array without executing it immediately
          promises.push(
            (async () => {
              const { buffer, filename } = await files[fileIndex]
              const url = await this.firebaseService.uploadFile(
                buffer,
                filename,
              )
              postContent.content = url
            })(),
          )
        }
      }
    }
    await Promise.all(promises)

    found.title = data.title
    found.postContents = data.postContents.map((postContent, index) => ({
      ...postContent,
      index,
    }))

    const updated = await this.postMySqlRepository.save(found)
    return `A post with id ${updated.postId} has been updated successfully.`
  }

  async like(user: UserMySqlEntity, body: LikeRequestDto) {
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
      postId: body.postId,
    })
    return `Successfully liked the post with id ${body.postId}.`
  }

  async unlike(user: UserMySqlEntity, body: LikeRequestDto) {
    const found = await this.postLikeMySqlRepository.findOneBy({
      userId: user.userId,
      postId: body.postId,
    })
    if (found === null || found.isDeleted)
      throw new ConflictException(
        `The post with id ${body.postId} has already not been liked.`,
      )
    await this.postLikeMySqlRepository.save({
      userId: user.userId,
      postId: body.postId,
    })
    return `Successfully unliked the post with id ${body.postId}.`
  }

  async comment(
    user: UserMySqlEntity,
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

    const postComment: DeepPartial<PostCommentMySqlEntity> = {
      ...data,
      userId: user.userId,
      postCommentContents: postCommentContents.map(
        (postCommentContent, index) => ({
          ...postCommentContent,
          index,
        }),
      ),
    }

    const created = await this.postLikeMySqlRepository.save(postComment)
    return `A comment with id ${created.postId} has been created successfully.`
  }

  async replyComment(
    user: UserMySqlEntity,
    data: ReplyCommentRequestDto,
    files: Express.Multer.File[],
  ): Promise<string> {
    const { postCommentContents } = data
    const promises: Promise<void>[] = []

    const fatherComment = await this.postCommentMySqlRepository.findOneBy({
      postCommentId: data.fatherCommentId,
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

    const postComment: DeepPartial<PostCommentMySqlEntity> = {
      ...data,
      postId: fatherComment.postId,
      userId: user.userId,
      fatherCommentId: fatherComment.postCommentId,
      postCommentContents: postCommentContents.map(
        (postCommentContent, index) => ({
          ...postCommentContent,
          index,
        }),
      ),
    }

    const created = await this.postCommentMySqlRepository.save(postComment)

    return `Comment with id ${created.postCommentId} reply successfully to comment with id ${created.fatherCommentId}.`
  }
}
