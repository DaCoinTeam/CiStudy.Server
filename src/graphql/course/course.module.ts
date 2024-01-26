import { Module } from "@nestjs/common"
import { CourseMySqlEntity } from "@database"
import CourseResolvers from "./course.resolvers"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseMySqlEntity]),
    MongooseModule.forFeature([]),
  ],
  providers: [CourseResolvers],
})
export default class CourseGraphQLModule {}
