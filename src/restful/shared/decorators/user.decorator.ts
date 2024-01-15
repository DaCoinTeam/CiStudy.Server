import { createParamDecorator, ExecutionContext } from "@nestjs/common"

const User = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return request.user
})

export default User