import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const ClientId = createParamDecorator((_, ctx: ExecutionContext) => {
	const query = ctx.switchToHttp().getRequest().query
	return query.clientId
})