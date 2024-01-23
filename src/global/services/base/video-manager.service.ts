import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from "@nestjs/common"
import { Response } from "express"
import { FirebaseService } from "../3rd"
import { v4 as uuidv4 } from "uuid"
import path, { join } from "path"
import { createReadStream, promises, statSync } from "fs"
import Bento4Service, { VideoMetadata } from "./bento4.service"

const VIDEO_STORAGE_PATH = join(process.cwd(), "assets", "videos")

@Injectable()
export default class VideoManagerService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly bento4Service: Bento4Service,
  ) {}

  private isValidVideoExtension(fileName: string): boolean {
    const supportedExtensions = [
      "mp4",
      "avi",
      "mkv",
      "mov",
      "wmv",
      "flv",
      "webm",
    ]
    const lowerCaseExtension = fileName.split(".").pop()?.toLowerCase() || ""
    return supportedExtensions.includes(lowerCaseExtension)
  }

  async uploadVideo(file: Express.Multer.File): Promise<VideoMetadata> {
    if (!this.isValidVideoExtension(file.originalname))
      throw new BadRequestException("Video extension not supported.")

    const folderName = uuidv4()
    const folderPath = path.join(VIDEO_STORAGE_PATH, folderName)

    try {
      await promises.mkdir(folderPath, { recursive: true })
      const videoFilePath = path.join(folderPath, file.originalname)
      await promises.writeFile(videoFilePath, file.buffer)
      return {
        folderName,
        videoName: file.originalname,
      }
    } catch (ex) {
      console.error(ex)
      throw new InternalServerErrorException("Failed to upload video.")
    }
  }

  getStreamableVideo(mpdFilePath: string, range: string, res: Response) {
    const stat = statSync(mpdFilePath)
    const fileSize = stat.size

    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = Math.min(start + 10 ** 6, fileSize - 1)
    const contentLength = end - start + 1

    res.status(HttpStatus.PARTIAL_CONTENT)
    res.set({
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": `${contentLength}`,
      "Content-Type": "video/mp4",
    })

    const readable = createReadStream(mpdFilePath, {
      start,
      end,
    })
    console.log(readable)
    return new StreamableFile(readable)
  }

  async processVideo(metadata: VideoMetadata) {
    try {
      console.info("🔰 1/5 | Video Health")
      // await ffmpeg.checkVideoHealth();

      console.info("🔰 2/5 | Checking Video")
      const fragmentationRequired = await this.bento4Service.checkFragments(
        metadata,
      )

      console.info("🔰 3/5 | Fragmenting Video")
      console.log(fragmentationRequired)
      if (fragmentationRequired) {
        await this.bento4Service.fragmentVideo(metadata)
      } else {
        // const oldFileName = path.join(__dirname, `../uploads/${sessionObj.session}/${sessionObj.contentId}${fileExt}`)
        // const newFileName = path.join(__dirname, `../uploads/${sessionObj.session}/${sessionObj.contentId}_fragmented${fileExt}`)
        // await fsPromise.rename(oldFileName, newFileName)
      }
      // await session.updateSession(currentSession)

      console.info("🔰 4/5 | Processing Video")
      await this.bento4Service.processVideo(metadata)

      // console.info("🔰 4/5 | Uploading Video")
      // const url = await firebaseService.upload(sessionObj)
      // jobs["uploading"] = "success"
      // currentSession["publicURL"] = url
      // await session.updateSession(currentSession)

      // console.info("🔰 5/5 | Cleaning Up")
      // const dirPath = path.join(__dirname, `../uploads/${sessionObj.session}`)
      // await videoManager.postCleanUp(dirPath)
      // jobs["cleaning"] = "success"
      // currentSession["data"]["status"] = "complete"
      // await session.updateSession(currentSession)

      //scheduleJobs()
    } catch (ex) {
      throw new InternalServerErrorException(ex)
    }
  }
}
