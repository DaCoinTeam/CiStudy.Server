import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common"
import { Observable } from "rxjs"
import { SignUpDto } from "../dto"

@Injectable()
export default class SignUpInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const data = context.switchToHttp().getRequest().body as SignUpDto

		return next.handle()
	}
}