var ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
var ffprobePath = require("@ffprobe-installer/ffprobe").path;
var ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

async function gifConverter(inputPath, outputPath, progressCallback) {
  return new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);

    ffmpeg(inputPath)
      .output(outputPath)
      .fps(1)
      .on("progress", function (progress) {
        if (progressCallback && typeof progressCallback === "function") {
          progressCallback(progress.percent);
        }
      })
      .on("end", function () {
        resolve();
      })
      .on("error", function (err) {
        reject(err);
      })
      .run();
  });
}
module.exports = { gifConverter };
