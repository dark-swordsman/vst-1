import subprocess

input = "-i test-video-1.mp4"
output = "test-output.mp4"
filters = "-vf scale=-1:720:flags=lanczos"
options = "-c:v libx264 -crf 23 -preset veryfast -c:a aac -b:a 160k"

command = ["ffmpeg"] + input.split() + filters.split() + options.split() + [output]

subprocess.run(command)