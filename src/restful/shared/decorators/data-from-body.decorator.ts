import { createParamDecorator, ExecutionContext } from "@nestjs/common"

const DataFromBody = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return JSON.parse(request.body.data)
})

export default DataFromBody