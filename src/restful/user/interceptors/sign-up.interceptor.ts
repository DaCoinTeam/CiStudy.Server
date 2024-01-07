import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common"
import { Observable } from "rxjs"
import { SignUpRequestBody } from "../dto"

@Injectable()
export default class SignUpInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const data = context.switchToHttp().getRequest().body as SignUpRequestBody

		return next.handle()
	}
}