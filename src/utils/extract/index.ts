const extractTokenFromAuthorization = (authorization: string) => {
	return authorization.split(" ")[1]
}
const extract = {
	extractTokenFromAuthorization,
}

export default extract
