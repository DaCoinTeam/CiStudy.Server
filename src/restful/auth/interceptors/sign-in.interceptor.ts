import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common"
import { Response, TokenManagerService } from "@global"
import { Observable, mergeMap } from "rxjs"
import { SignInResponseDto } from "../dto"

@Injectable()
export default class SignInInterceptor
implements NestInterceptor
{
	constructor(private readonly tokenManagerService: TokenManagerService) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<Response<SignInResponseDto>>> {
		const request = context.switchToHttp().getRequest()
		const query = request.query

		const clientId = query.clientId as string | undefined

		return next.handle().pipe(
			mergeMap(async (data) => {
				return await this.tokenManagerService.generateResponse<SignInResponseDto>(
					data.userId,
					data,
					true,
					clientId,
				)
			}),
		)
	}
}
