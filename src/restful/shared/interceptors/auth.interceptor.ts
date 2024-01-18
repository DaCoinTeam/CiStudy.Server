import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common"
import { AuthManagerService } from "@global"
import { Observable, mergeMap } from "rxjs"
import { Response, TokenType, ValidatedInfo } from "@shared"

@Injectable()
export default class AuthInterceptor<T extends object>
implements NestInterceptor<T, Response<T>>
{
	constructor(private readonly authManagerService: AuthManagerService) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<Response<T>>> {
		const request = context.switchToHttp().getRequest()
		const query = request.query
		
		const { user, type } = request.user as ValidatedInfo

		const clientId = query.clientId as string | undefined
		const refresh = type === TokenType.Refresh
		console.log(refresh)
		if (refresh) {
			await this.authManagerService.validateSession(
				user.userId,
				clientId,
			)
		}

		return next.handle().pipe(
			mergeMap(async (data) => {
				return await this.authManagerService.generateResponse<T>(
					user.userId,
					data,
					refresh,
					clientId,
				)
			}),
		)
	}
}