import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { ValidatedInfo } from "@shared"

const User = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const { user } = request.user as ValidatedInfo
	return user
})

export default User