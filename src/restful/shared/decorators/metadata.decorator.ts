import { createParamDecorator, ExecutionContext } from "@nestjs/common"

const Metadata = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return request.metadata
})

export default Metadata