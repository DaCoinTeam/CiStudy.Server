import { Injectable, ExecutionContext } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { GqlExecutionContext } from "@nestjs/graphql"

@Injectable()
export default class JwtAuthGuard extends AuthGuard("jwt") {
	getRequest(context: ExecutionContext) {
		console.log(context)
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext().req
	  }
}