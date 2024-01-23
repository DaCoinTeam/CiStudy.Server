const getFileSizeFromUrl = async (url: string) : Promise<number | null> => {
	const response = await fetch(url, { method: "HEAD"})
	return parseInt(response.headers.get("content-length").toString(), 10)
}

const api = {
	getFileSizeFromUrl,
}

export default api
