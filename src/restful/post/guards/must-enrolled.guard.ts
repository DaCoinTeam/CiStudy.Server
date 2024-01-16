import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { UserMySqlDto } from "@shared"
import { Observable } from "rxjs"

@Injectable()
export default class MustEnrolledGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const user = request.body.user as UserMySqlDto

		return this.isValid(user)
	}

	private isValid(user: UserMySqlDto) {
		// fill logic here
		return true
	}
}