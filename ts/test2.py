import os

input = "test-video-1.mp4"
output = "test-output.mp4"
filters = "-vf scale=-1:720:flags=lanczos"
options = "-c:v libx264 -crf 23 -preset veryfast -c:a aac -b:a 160k"


os.system(f"ffmpeg -i {input}{' ' + filters if filters else ''}{' ' + options if options else ''} {output}")

# maybe convert to array with join?