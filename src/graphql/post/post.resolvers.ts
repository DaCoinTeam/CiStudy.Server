/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostMySqlEntity } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindManyPostInput, FindOnePostInput } from "./models"
import { PostModel } from "../shared"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Resolver((of) => PostModel)
export default class PostResolvers {
	constructor(
    @InjectRepository(PostMySqlEntity)
    private readonly postMySqlRepository: Repository<PostMySqlEntity>,
	) {}
  @Query((returns) => PostModel)
	async findOnePost(@Args("input") args: FindOnePostInput) {
		return await this.postMySqlRepository.findOneBy(args)
	}

  @Query((returns) => [PostModel])
  async findManyPost(
    @Args("input") args: FindManyPostInput,
  ) {
  	const founds = await this.postMySqlRepository.findAndCount({
  		where: {
  			courseId : args.courseId
  		},
  		take: args.pageSize,
  		skip: args.pageNumber * args.pageSize,
  		relations: {
  			postContents: true,
  			creator: true
  		}
  	})
  	return founds[0]
  }
}
