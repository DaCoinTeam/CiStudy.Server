import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Validated } from "@shared"

const User = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const { user } = request.user as Validated
	return user
})

export default User