/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostMySqlEntity } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindOnePostInput } from "./models"
import { Post } from "../shared"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Resolver((of) => Post)
export default class PostResolvers {
	constructor(
    @InjectRepository(PostMySqlEntity)
    private readonly postMySqlRepository: Repository<PostMySqlEntity>,
	) {}
  @Query((returns) => Post)
	async findOnePost(@Args("input") args: FindOnePostInput) {
		return await this.postMySqlRepository.findOneBy(args)
	}

  @Query((returns) => Post)
  async findManyPost(@Args("input") args: FindOnePostInput) {
  	return await this.postMySqlRepository.findOneBy(args)
  }
}
