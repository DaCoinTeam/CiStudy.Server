import { ConflictException, Injectable } from "@nestjs/common"
import {
  PostLikeMySqlEntity,
  ContentType,
  PostMySqlEntity,
  PostCommentMySqlEntity,
  UserMySqlEntity,
  PostContentMySqlEntity,
  PostCommentContentMySqlEntity,
} from "@database"
import {
  CreateRequestDto,
  LikeRequestDto,
  CommentRequestDto,
  ReplyCommentRequestDto,
  UpdateRequestDto,
  PostContentRequestDto,
  UpdateCommentDto,
} from "./dto"
import { FirebaseService } from "@global"
import { DeepPartial, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { IndexFileAppended } from "@shared"
import c from "config"

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
    private readonly postContentsMySqlRepository: Repository<PostContentMySqlEntity>,
    @InjectRepository(PostCommentContentMySqlEntity)
    private readonly postCommentContentMySqlRepository: Repository<PostCommentContentMySqlEntity>,

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
        const promise = async () => {
          const { buffer, filename } = files[appendedPostContent.indexFile]
          const url = await this.firebaseService.uploadFile(buffer, filename)
          appendedPostContent.content = url
        }
        promises.push(promise())
      }
    }
    await Promise.all(promises)

    // đơn giản là add vô
    const post: DeepPartial<PostMySqlEntity> = {
      ...data,
      creatorId: user.userId,
      postContents: appendedPostContents.map((appendedPostContent, index) => ({
        ...appendedPostContent,
        index,
      })),
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

    await this.postContentsMySqlRepository.delete({ postId: data.postId })

    const { postContents } = data
    const promises: Promise<void>[] = []
    const appendedPostContents = this.appendIndexFile(postContents)

    for (const appendedPostContent of appendedPostContents) {
      if (
        appendedPostContent.contentType === ContentType.Image ||
        appendedPostContent.contentType === ContentType.Video
        ) {
        const promise = async () => {
          const { buffer, filename } = files[appendedPostContent.indexFile]
          const url = await this.firebaseService.uploadFile(buffer, filename)
          appendedPostContent.content = url
        }
        promises.push(promise())
      }
    }
    await Promise.all(promises)

    found.title = data.title
    found.postContents = appendedPostContents.map((appendedPostContent, index) => ({
      ...appendedPostContent,
      index,
    }))

    const updated = await this.postMySqlRepository.save(found)
    return `A post with id ${updated.postId} has been updated successfully.`
  }

  //like post
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

    const appendedPostCommentContents = this.appendIndexFile(postCommentContents)

    for (const appendedPostCommentContent of appendedPostCommentContents) {
      if (
        appendedPostCommentContent.contentType === ContentType.Image ||
        appendedPostCommentContent.contentType === ContentType.Video
      ) {
        const promise = async () => {
          const { buffer, filename } = files[appendedPostCommentContent.indexFile]
          const url = await this.firebaseService.uploadFile(buffer, filename)
          appendedPostCommentContent.content = url
        }
        promises.push(promise())
      }
    }

    const postComment: DeepPartial<PostCommentMySqlEntity> = {
      ...data,
      userId: user.userId,
      postCommentContents: appendedPostCommentContents.map(
        (appendedPostCommentContent, index) => ({
          ...appendedPostCommentContent,
          index,
        }),
      ),
    }

    const created = await this.postCommentMySqlRepository.save(postComment)
    return `A comment with id ${created.postCommentId} has been created successfully.`
  }

  async replyComment(
    user: UserMySqlEntity,
    data: ReplyCommentRequestDto,
    files: Express.Multer.File[],
  ): Promise<string> {

    const fatherComment = await this.postCommentMySqlRepository.findOneBy({
      postCommentId: data.fatherCommentId,
    })

    if (fatherComment === null) {
      throw new ConflictException(
        `The comment with id ${data.fatherCommentId} does not exist.`,
      )
    }

    const { postCommentContents } = data
    const promises: Promise<void>[] = []
    const appendedPostCommentContents = this.appendIndexFile(postCommentContents)

    for (const appendedPostCommentContent of appendedPostCommentContents) {
      if (
        appendedPostCommentContent.contentType === ContentType.Image ||
        appendedPostCommentContent.contentType === ContentType.Video
      ) {
        const promise = async () => {
          const { buffer, filename } = files[appendedPostCommentContent.indexFile]
          const url = await this.firebaseService.uploadFile(buffer, filename)
          appendedPostCommentContent.content = url
        }
        promises.push(promise())
      }
    }

    const postComment: DeepPartial<PostCommentMySqlEntity> = {
      ...data,
      postId: fatherComment.postId,
      userId: user.userId,
      fatherCommentId: fatherComment.postCommentId,
      postCommentContents: appendedPostCommentContents.map(
        (appendedPostCommentContent, index) => ({
          ...appendedPostCommentContent,
          index,
        }),
      ),
    }

    const created = await this.postCommentMySqlRepository.save(postComment)

    return `Comment with id ${created.postCommentId} reply successfully to comment with id ${created.fatherCommentId}.`
  }

  // update comment
  async updateComment(
    user: UserMySqlEntity,
    data: UpdateCommentDto,
    files: Express.Multer.File[],
  ): Promise<string> {
    const found = await this.postCommentMySqlRepository.findOneBy({
      postCommentId: data.postCommentId,
      userId: user.userId,
    })

    if (found === null) {
      throw new ConflictException(
        `The comment with id ${data.postCommentId} does not exist.`,
      )
    }
    await this.postCommentContentMySqlRepository.delete({ postCommentId: data.postCommentId })

    const { postCommentContents } = data
    const promises: Promise<void>[] = []
    const appendedPostCommentContents = this.appendIndexFile(postCommentContents)

    for (const appendedPostCommentContent of appendedPostCommentContents) {
      if (
        appendedPostCommentContent.contentType === ContentType.Image ||
        appendedPostCommentContent.contentType === ContentType.Video
        ) {
        const promise = async () => {
          const { buffer, filename } = files[appendedPostCommentContent.indexFile]
          const url = await this.firebaseService.uploadFile(buffer, filename)
          appendedPostCommentContent.content = url
        }
        promises.push(promise())
      }
    }
    await Promise.all(promises)

    found.postCommentContents = appendedPostCommentContents.map((appendedPostCommentContent, index) => ({
      ...appendedPostCommentContent,
      index,
    }))

    const updated = await this.postCommentMySqlRepository.save(found)
    return `A comment with id ${updated.postCommentId} has been created successfully.`
  }


  //delete comment
  async deleteComment(user: UserMySqlEntity, postCommentId: string): Promise<string> {
    const found = await this.postCommentMySqlRepository.findOneBy({
      postCommentId: postCommentId,
      userId: user.userId,
    })

    if (found === null) {
      throw new ConflictException(
        `The comment with id ${postCommentId} does not exist.`,
      )
    }

    const childComments = await this.postCommentMySqlRepository.find({
      relations: ["childComments"],
      where: {
        fatherCommentId: postCommentId,
      },
    })
    if (childComments.length > 0) {
      childComments.forEach(async (childComment) => {
        childComment.fatherCommentId = null
        await this.postCommentMySqlRepository.save(childComment)
      }
      )
    }

    await this.postCommentContentMySqlRepository.delete({ postCommentId: postCommentId })
    await this.postCommentMySqlRepository.delete({ postCommentId: postCommentId })
    
    return `A comment with id ${postCommentId} has been deleted successfully.`
  }

}
