import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common"
import { AuthTokens, TokenManagerService } from "@global"
import { Observable, mergeMap } from "rxjs"
import { UserMySqlDto } from "@shared"

@Injectable()
export default class VerifyGoogleAccessTokenInterceptor
implements NestInterceptor
{
	constructor(private readonly tokenManagerService: TokenManagerService) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<AuthTokens>> {
		const request = context.switchToHttp().getRequest()
		const query = request.query

		const clientId = query.clientId as string | undefined

		return next.handle().pipe(
			mergeMap(async (data) => {
				return await this.tokenManagerService.generateAuthTokens(
					data.userId,
					data,
					clientId,
				)
			}),
		)
	}
}
