import { assetConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { exec } from "child_process"
import { join } from "path"

const BINARY_PATH = "./tools/Bento4-SDK/bin"

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

  async checkFragments(assetId: string, videoName: string) {
    const videoPath = join(assetConfig().path, assetId, videoName)
    console.log(videoPath)
    const execResult = await this.execute(`mp4info.exe "${videoPath}"`)
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
  }

  async fragmentVideo(assetId: string, videoName: string) {
    try {
      const videoPath = join(assetConfig().path, assetId, videoName)
      // in a same file
      const outputPath = join(assetConfig().path, assetId, `${videoName}_fragmented`)

      const execResult = await this.execute(
        `mp4fragment.exe --fragment-duration 4000 "${videoPath}" "${outputPath}"`,
      )
      const lines = execResult.split("\n")

      for (const line in lines) {
        const lineData = line.toString()

        if (lineData.includes("ERROR"))
          throw new Error("Line data includes ERROR.")
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  async processVideo(assetId: string, videoName: string) {
    const fragmentedPath = join(
      assetConfig().path,
      assetId,
      `${videoName}_fragmented`,
    )

    //output same file
    const outputDir = join(assetConfig().path, assetId, "output")
    const execResult = await this.execute(
      `mp4dash.bat  --mpd-name manifest.mpd "${fragmentedPath}" -o "${outputDir}" --use-segment-timeline`,
    )
    const lines = execResult.split("\n")

    for (const line in lines) {
      const lineData = lines[line].toString()

      if (lineData.includes("ERROR"))
        throw new Error("Line data includes error.")
    }
  }
}
