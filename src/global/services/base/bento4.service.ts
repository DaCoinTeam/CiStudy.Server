import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { exec } from "child_process"
import { join } from "path"

const BINARY_PATH = "./tools/Bento4-SDK/bin"
const VIDEO_STORAGE_PATH = join(process.cwd(), "assets", "videos")

@Injectable()
export default class Bento4Service {
  async execute(command: string) {
    return new Promise((resolve: (value: string) => void, reject) => {
      exec(
        command,
        { cwd: BINARY_PATH, shell: process.env.ComSpec },
        (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr)
          }
          if (error) {
            reject(error)
          }
          resolve(stdout)
        },
      )
    })
  }

  async checkFragments(metadata: VideoMetadata) {
    try {
      const execResult = await this.execute(
        `mp4info.exe ${join(
          VIDEO_STORAGE_PATH,
          metadata.folderName,
          metadata.videoName,
        )}`,
      )
      const lines = execResult.split("\n")

      for (const line in lines) {
        const lineData = lines[line].toString()

        if (lineData.includes("fragments:  yes")) {
          return false
        }

        if (lineData.includes("fragments:  no")) {
          return true
        }

        if (lineData.includes("No movie found in the file")) {
          throw new Error("No movie found in the file.")
        }
      }
    } catch (ex) {
      throw new InternalServerErrorException(ex)
    }
  }

  async fragmentVideo(metadata: VideoMetadata) {
    try {
      const file = join(
        VIDEO_STORAGE_PATH,
        metadata.folderName,
        metadata.videoName,
      )
      const outputFile = join(
        VIDEO_STORAGE_PATH,
        metadata.folderName,
        `${metadata.videoName}_fragmentedmp4`,
      )
      const execResult = await this.execute(
        `mp4fragment.exe --fragment-duration 4000 ${file} ${outputFile}`,
      )
      const lines = execResult.split("\n")

      for (const line in lines) {
        const lineData = line.toString()

        if (lineData.includes("ERROR"))
          throw new Error("Line data includes error.")
      }
    } catch (ex) {
      throw new InternalServerErrorException(ex)
    }
  }

  async processVideo(metadata: VideoMetadata) {
    try {
      const file = join(
        VIDEO_STORAGE_PATH,
        metadata.folderName,
        `${metadata.videoName}_fragmentedmp4`,
      )

      const outputDir = join(VIDEO_STORAGE_PATH, metadata.folderName, "baked")
      const execResult = await this.execute(
        `mp4dash.bat  --mpd-name manifest.mpd ${file} -o ${outputDir} --use-segment-timeline`,
      )
      const lines = execResult.split("\n")

      for (const line in lines) {
        const lineData = lines[line].toString()

        if (lineData.includes("ERROR"))
          throw new Error("Line data includes error.")
      }
    } catch (ex) {
      throw new InternalServerErrorException(ex)
    }
  }
}

export interface VideoMetadata {
  folderName: string;
  videoName: string;
}
