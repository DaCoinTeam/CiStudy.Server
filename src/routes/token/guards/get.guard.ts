import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { GetRequestQueryApi } from "../properties"

@Injectable()
export default class GetGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const query : unknown | GetRequestQueryApi = request.query
		console.log(query)

		if (this.isCorrectRequest(query)) {
			return true
		}
		
		return false
	}

	private isCorrectRequest(query: unknown): query is GetRequestQueryApi {
		const castedQuery = query as GetRequestQueryApi
		return (
			castedQuery.tokenAddress !== undefined &&
            castedQuery.chainId !== undefined
		)
	}
}
