const { exec } = require("child_process");

console.log('testing exec')
const ffmpegEncoderInfo = exec("ffmpeg -h encoder=libx264");

ffmpegEncoderInfo.stdout.on('data', (data) => console.log(data));