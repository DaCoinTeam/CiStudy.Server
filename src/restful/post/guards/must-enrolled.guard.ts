import { UserMySqlEntity } from "@database"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"

@Injectable()
export default class MustEnrolledGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const user = request.body.user as UserMySqlEntity

		return this.isValid(user)
	}

	private isValid(user: UserMySqlEntity) {
		// fill logic here
		return true
	}
}