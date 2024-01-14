import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const AuthTokensRequested = createParamDecorator((_, ctx: ExecutionContext) => {
	const query = ctx.switchToHttp().getRequest().query
	return query.authTokensRequested === "true"
})