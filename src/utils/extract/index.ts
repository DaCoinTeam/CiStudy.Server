import { Headers } from "@nestjs/common"

const extractTokenFromHeader = (headers: Headers) => {
	const authorization = headers.get("authorization")
	return authorization.split(" ")[1]
}
const extractUtils = {
	extractTokenFromHeader: extractTokenFromHeader,
}

export default extractUtils
