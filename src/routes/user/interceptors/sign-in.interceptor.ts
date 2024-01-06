import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common"
import { Observable } from "rxjs"
import { SignInRequestBody } from "../bodies"

@Injectable()
export default class SignInInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const data = context.switchToHttp().getRequest().body as SignInRequestBody

		return next.handle()
	}
}