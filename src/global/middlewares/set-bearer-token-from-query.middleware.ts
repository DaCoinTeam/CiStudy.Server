import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export default class SetBearerTokenFromQueryMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const token = req.query.token
		if (token){
			req.headers.authorization = `Bearer ${token}` 
		}
		next()
	}
}
