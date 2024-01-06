import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { SignInDto } from "../dtos"

@Injectable()
export default class SignInGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | SignInDto = request.body

		return this.isValid(body)
	}

	private isValid(body: unknown): body is SignInDto {
		const bodyCasted = body as SignInDto
		return (
			bodyCasted.email !== undefined &&
            bodyCasted.password !== undefined
		)
	}
}