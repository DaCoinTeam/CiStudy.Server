import { Module } from "@nestjs/common"
import { ResourceService } from "./resource.service"
import { ResourceController } from "./resource.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ResourceMysqlEntity } from "@database"
import { LectureRestfulModule } from "../lecture"

@Module({
  imports: [TypeOrmModule.forFeature([ResourceMysqlEntity]), LectureRestfulModule],
  controllers: [ResourceController],
  providers: [ResourceService]
})
export default class ResourceModule {}
