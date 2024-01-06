import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { SignUpDto } from "../dtos"

@Injectable()
export default class SignUpGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | SignUpDto = request.body

		return this.isValid(body)
	}

	private isValid(body: unknown): body is SignUpDto {
		const bodyCasted = body as SignUpDto
		return (
			bodyCasted.email !== undefined &&
            bodyCasted.password !== undefined &&
            bodyCasted.firstName !== undefined &&
			bodyCasted.lastName !== undefined &&
			bodyCasted.birthdate !== undefined
		)
	}
}