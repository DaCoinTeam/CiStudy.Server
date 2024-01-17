import axios from "axios"

const getFileSizeFromUrl = async (url: string) : Promise<number | null> => {
	const response = await axios.head(url)
	return parseInt(response.headers.getContentLength.toString(), 10)
}

const api = {
	getFileSizeFromUrl,
}

export default api
