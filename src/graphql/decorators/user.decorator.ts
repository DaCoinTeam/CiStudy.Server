import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"

export const UserRestful = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return request.user
})

export const User = createParamDecorator(
	(_, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext().req.user
	},
)
