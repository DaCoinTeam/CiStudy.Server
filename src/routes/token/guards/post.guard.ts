import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { PostRequestBodyApi } from "../swagger"

@Injectable()
export default class PostGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const body : unknown | PostRequestBodyApi = request.body

		if (this.isCorrectRequest(body)) {
			return true
		}
		
		return false
	}

	private isCorrectRequest(body: unknown): body is PostRequestBodyApi {
		const castedBody = body as PostRequestBodyApi
		return (
			castedBody.tokenImageUrl !== undefined &&
            castedBody.tokenAddress !== undefined &&
            castedBody.chainId !== undefined
		)
	}
}