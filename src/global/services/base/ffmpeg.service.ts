import { assetConfig } from "@config"
import { Injectable } from "@nestjs/common"
import ffmpeg from "fluent-ffmpeg"
import { join } from "path"

@Injectable()
export default class FfmpegService {
  private encodeVideo(profile: EncodeProfile) {
    return new Promise((resolve, reject) => {
      ffmpeg(profile.inputPath)
        .videoCodec("libx264")
        .videoBitrate(profile.maxRate)
        .size(profile.resolution)
        .audioCodec("aac")
        .format("mp4")
        .audioBitrate(profile.audioBitrate)
        .audioFrequency(profile.audioFreq)
        .audioChannels(profile.audioChannels)
        .addOutputOptions([
          "-profile:v main",
          "-level 4.0",
          "-crf 22",
          "-r 25",
          "-keyint_min 25",
          "-g 50",
          "-pix_fmt yuv420p",
          "-sc_threshold 0",
          "-movflags +faststart",
          `-maxrate ${profile.maxRate}`,
          `-bufsize ${profile.bufSize}`
        ])
        .save(profile.outputPath)
        .on("end", resolve)
        .on("error", reject)
        
    })
  }

  async encodeAtMultipleBitrates(assetId: string, videoName: string) {
    const videoPath = join(assetConfig().path, assetId, videoName)
    const output = join(assetConfig().path, assetId)
    const profiles: EncodeProfile[] = [
      {
        inputPath: videoPath,
        outputPath: join(output, "1080.mp4"),
        resolution: "1920x1080",
        audioBitrate: "128k",
        audioFreq: 44100,
        audioChannels: 2,
        maxRate: "5000k",
        bufSize: "10000k"
      },
      {
        inputPath: videoPath,
        outputPath: join(output, "720.mp4"),
        resolution: "1280x720",
        audioBitrate: "128k",
        audioFreq: 44100,
        audioChannels: 2,
        maxRate: "2500k",
        bufSize: "5000k"
      },
      {
        inputPath: videoPath,
        outputPath: join(output, "480.mp4"),
        resolution: "854x480",
        audioBitrate: "96k",
        audioFreq: 44100,
        audioChannels: 2,
        maxRate: "1250k",
        bufSize: "2500k"
      },
      {
        inputPath: videoPath,
        outputPath: join(output, "360.mp4"),
        resolution: "640x360",
        audioBitrate: "96k",
        audioFreq: 44100,
        audioChannels: 2,
        maxRate: "900k",
        bufSize: "1800k"
      },
      {
        inputPath: videoPath,
        outputPath: join(output, "240.mp4"),
        resolution: "320x240",
        audioBitrate: "64k",
        audioFreq: 22050,
        audioChannels: 1,
        maxRate: "625k",
        bufSize: "1250k"
      },
    ]

    const promises: Promise<void>[] = []
    for (const profile of profiles) {
      const promise = async () => {
        await this.encodeVideo(profile)
      }
      promises.push(promise())
    }

    await Promise.all(promises)
  }
}

interface EncodeProfile {
  inputPath: string;
  outputPath: string;
  resolution: string;
  audioBitrate: string;
  audioFreq: number;
  audioChannels: number;
  maxRate: string,
  bufSize: string,
}
