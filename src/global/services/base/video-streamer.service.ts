import { Injectable, StreamableFile } from "@nestjs/common"
import { RequestOptions, get } from "https"
import { Readable } from "node:stream"
import { Response } from "express"

@Injectable()
export default class VideoStreamerService {
	constructor() {}

	private createUrlReadStream(
		url: string,
		options?: ReadStreamOptions,
	): UrlReadStreamData {
		const readable = new Readable({
			read() {},
		})

		let fileSize = 0
		const requestOptions: RequestOptions = {
			headers: {
				Range: options ? `bytes=${options.start}-${options.end ?? ""}` : undefined,
			},
		
		}
		get(url, requestOptions, (response) => {
			fileSize = parseInt(response.headers["content-length"], 10)

			response.on("data", (chunk) => {
				readable.push(chunk)
			})
			response.on("end", () => {
				readable.push(null)
			})
		}).on("error", (error) => {
			readable.emit("error", error)
		})
		return {
			readable,
			fileSize,
		}
	}

	stream(url: string, range: string, res: Response): StreamableFile {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10)
		const end = parts[1] ? parseInt(parts[1], 10) : undefined

		const { readable, fileSize } = this.createUrlReadStream(url, {
			start,
			end,
		})

		res.set({
			"Content-Range": `bytes ${start}-${end ?? ""}/${fileSize}`,
			
		})
		return new StreamableFile(readable)
	}
}

export interface ReadStreamOptions {
  start: number;
  end: number;
}

export interface UrlReadStreamData {
  readable: Readable;
  fileSize: number;
}
