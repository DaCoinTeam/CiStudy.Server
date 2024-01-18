import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common"
import { AuthManagerService } from "@global"
import { AuthTokens } from "@shared"
import { Observable, mergeMap } from "rxjs"

@Injectable()
export default class VerifyGoogleAccessTokenInterceptor
implements NestInterceptor
{
	constructor(private readonly authManagerService: AuthManagerService) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<AuthTokens>> {
		const request = context.switchToHttp().getRequest()
		const query = request.query

		const clientId = query.clientId as string | undefined

		return next.handle().pipe(
			mergeMap(async (data) => {
				return await this.authManagerService.generateAuthTokens(
					data,
					clientId,
				)
			}),
		)
	}
}
