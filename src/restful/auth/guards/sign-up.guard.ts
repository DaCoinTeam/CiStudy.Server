import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { SignUpRequestDto } from "../dto"

@Injectable()
export default class SignUpGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | SignUpRequestDto = request.body

		return this.isValid(body)
	}

	private isValid(body: unknown): body is SignUpRequestDto {
		const bodyCasted = body as SignUpRequestDto
		return (
			bodyCasted.email !== undefined &&
            bodyCasted.password !== undefined &&
            bodyCasted.firstName !== undefined &&
			bodyCasted.lastName !== undefined &&
			bodyCasted.birthdate !== undefined
		)
	}
}