import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common"
import { Response, TokenManagerService } from "@global"
import { Observable, mergeMap } from "rxjs"
import { UserMySqlDto } from "@shared"

@Injectable()
export default class AuthInterceptor<T extends object>
implements NestInterceptor<T, Response<T>>
{
	constructor(private readonly tokenManagerService: TokenManagerService) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<Response<T>>> {
		const request = context.switchToHttp().getRequest()
		const query = request.query

		const user = request.user as UserMySqlDto
		const clientId = query.clientId as string | undefined
		const refresh = query.refresh === "true"

		if (refresh) {
			await this.tokenManagerService.validateRefreshToken(
				user.userId,
				clientId,
			)
		}
		//request ở đây nè
		return next.handle().pipe(
			mergeMap(async (data) => {
				return await this.tokenManagerService.generateResponse<T>(
					user.userId,
					data,
					refresh,
					clientId,
				)
			}),
		)
	}
}
