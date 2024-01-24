import { assetConfig } from "@config"
import { Injectable } from "@nestjs/common"
import ffmpeg from "fluent-ffmpeg"
import { join } from "path"

@Injectable()
export default class FfmpegService {
  private encodeVideo(params: EncodeParams) {
    return new Promise((resolve, reject) => {
      ffmpeg(params.inputPath)
        .videoCodec("mpeg4")
        .videoBitrate(params.maxRate)
        .size(params.resolution)
        .audioCodec("aac")
        .format("mp4")
        .audioBitrate(params.audioBitrate)
        .audioFrequency(params.audioFreq)
        .audioChannels(params.audioChannels)
        .on("end", resolve)
        .on("error", reject)
        .save(params.outputPath)
    })
  }

  async encodeAtMultipleBitrates(assetId: string, videoName: string) {
    const videoPath = join(assetConfig().path, assetId, videoName)
    const output = join(assetConfig().path, assetId)
    const paramss: EncodeParams[] = [
      // {
      //   inputPath: videoPath,
      //   outputPath: join(output, "1080.mp4"),
      //   resolution: "1280x720",
      //   maxRate: "5000k",
      //   audioBitrate: "128k",
      //   audioFreq: 44100,
      //   audioChannels: 2,
      // },
      {
        inputPath: videoPath,
        outputPath: join(output, "720.mp4"),
        resolution: "854x480",
        maxRate: "2500k",
        audioBitrate: "128k",
        audioFreq: 44100,
        audioChannels: 2,
      },
      {
        inputPath: videoPath,
        outputPath: join(output, "480.mp4"),
        resolution: "640x360",
        maxRate: "1250k",
        audioBitrate: "96k",
        audioFreq: 44100,
        audioChannels: 2,
      },
      {
        inputPath: videoPath,
        outputPath: join(output, "360.mp4"),
        resolution: "320x240",
        maxRate: "900k",
        audioBitrate: "96k",
        audioFreq: 44100,
        audioChannels: 2,
      },
      {
        inputPath: videoPath,
        outputPath: join(output, "240.mp4"),
        resolution: "320x240",
        maxRate: "625k",
        audioBitrate: "64k",
        audioFreq: 22050,
        audioChannels: 1,
      },
    ]

    const promises: Promise<void>[] = []
    for (const params of paramss) {
      const promise = async () => {
        await this.encodeVideo(params)
      }
      promises.push(promise())
    }

    await Promise.all(promises)
  }
}

interface EncodeParams {
  inputPath: string;
  outputPath: string;
  resolution: string;
  maxRate: string;
  audioBitrate: string;
  audioFreq: number;
  audioChannels: number;
}
