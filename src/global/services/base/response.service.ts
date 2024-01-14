import { Injectable } from "@nestjs/common"

@Injectable()
export default class ResponseService {
	async generateResponse<T extends object>(
		data: T,
	): Promise<Response<T>> {
		return {
			data
		}
	}
}

export interface Response<T extends object>{
    data: T
}