import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export default class AttachCourseIdMiddleware  implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const courseId = req.query.courseId
		if (courseId ){
			req.body.courseId = courseId
		}
		next()
	}
}
