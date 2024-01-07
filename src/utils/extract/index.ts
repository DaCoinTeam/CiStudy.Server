const extractTokenFromAuthorization = (authorization: string) => {
	return authorization.split(" ")[1]
}
const extractUtils = {
	extractTokenFromAuthorization,
}

export default extractUtils
