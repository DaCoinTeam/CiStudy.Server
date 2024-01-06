import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { SignInRequestBody } from "../bodies"

@Injectable()
export default class SignInGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | SignInRequestBody = request.body

		return this.isValid(body)
	}

	private isValid(body: unknown): body is SignInRequestBody {
		const bodyCasted = body as SignInRequestBody
		return (
			bodyCasted.email !== undefined &&
            bodyCasted.password !== undefined
		)
	}
}