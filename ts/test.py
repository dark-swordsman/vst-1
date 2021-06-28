import ffmpeg

outputArguments = {
  "c:v": "libx264",
  "preset":"veryfast",
  "crf": 23,
  "c:a": "aac",
  "b:a": "192k"
}

stream = ffmpeg.input("test-video-1.mp4")
stream = ffmpeg.filter(stream, "scale", size="hd720")
stream = ffmpeg.output(stream, "test-output.mp4", **outputArguments)

ffmpeg.run(stream)

# acodec settings not working