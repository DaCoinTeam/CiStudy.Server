import { Injectable, StreamableFile } from "@nestjs/common"
import { RequestOptions, get } from "https"
import { Readable } from "node:stream"
import { Response } from "express"
import axios from "axios"

@Injectable()
export default class VideoStreamerService {
	constructor() {}

	private async getFileSizeFromUrl(url: string) {
		try{
			const response = await axios.head(url)
			console.log(response.headers)
			return parseInt(response.headers["Content-Length"].toString(), 10)
		} catch(ex){
			console.log(ex)
		}
	}

	private createUrlReadStream(
		url: string,
		options?: ReadStreamOptions,
	): Readable {
		const readable = new Readable({
			read() {},
		})

		const requestOptions: RequestOptions = {
			headers: {
				Range: options ? `bytes=${options.start}-${options.end ?? ""}` : undefined,
			},
		
		}
		get(url, requestOptions, (response) => {
			response.on("data", (chunk) => {
				readable.push(chunk)
			})
			response.on("end", () => {
				readable.push(null)
			})
		}).on("error", (error) => {
			readable.emit("error", error)
		})

		return readable
	}

	async stream(url: string, range: string, res: Response): Promise<StreamableFile> {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10)
		let end = parts[1] ? parseInt(parts[1], 10) : undefined

		const fileSize = await this.getFileSizeFromUrl(url)

		const readable = this.createUrlReadStream(url, {
			start,
			end,
		})

		if (!end) {
			end = fileSize - 1
		}

		const chunksize = end - start + 1

		console.log({
			"Content-Range": `bytes ${start}-${end}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": `${chunksize}`,
			"Content-Type": "video/mp4"
		})
		res.set({
			"Content-Range": `bytes ${start}-${end}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": `${chunksize}`,
			"Content-Type": "video/mp4"
		})
		return new StreamableFile(readable)
	}
}

export interface ReadStreamOptions {
  start: number;
  end: number;
}