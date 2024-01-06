import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common"
import { Observable } from "rxjs"
import { SignInDto } from "../dtos"

@Injectable()
export default class SignInInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const data = context.switchToHttp().getRequest().body as SignInDto

		return next.handle()
	}
}