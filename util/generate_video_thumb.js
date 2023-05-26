const
    ffmpegPath = require("@ffmpeg-installer/ffmpeg").path,
    ffprobePath = require("@ffprobe-installer/ffprobe").path,
    ffmpeg = require("fluent-ffmpeg");
const {v4}= require("uuid")
ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

async function generateThumbnail(videoPath) {
    const thumbnailId= v4()
    ffmpeg(videoPath)
        .thumbnail({
            timestamps: ['50%'],
            filename: `./uploads/thumbnail/${thumbnailId}.png`,
            size: '320x240',
        });
    return thumbnailId
}

module.exports= generateThumbnail

