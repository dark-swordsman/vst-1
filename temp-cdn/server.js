const express = require("express");
const fs = require("fs");

const server = express();
const PORT = process.env.PORT || require("../ports.json")["temp-cdn"];
const store = __dirname + "/store/";

const mimeTypes = {
  "video/x-matroska": "mkv",
  "video/mp4": "mp4",
  "video/x-m4v": "m4v",
  "video/quicktime": "mov",
  "video/x-msvideo": "avi"
};

if (!fs.existsSync(store)){
  fs.mkdirSync(store, { recursive: true });
}

server.post("/upload", (req, res) => {
  const fileName = `source-${Date.now()}.${mimeTypes[req.headers["content-type"]]}`;
  const writeStream = fs.createWriteStream(`${store}/${fileName}`);

  writeStream.on("ready", () => req.pipe(writeStream));

  req.on("end", () => {
    res.send({
      status: "OK",
      fileName
    });
  })
});

server.get("/file/:filename", (req, res) => {
  const filePath = `${store}/${req.params.filename}`;

  if (fs.existsSync(filePath)) {
    const readStream = fs.createReadStream(filePath);
  
    readStream.pipe(res);
  } else {
    res.send({
      status: "ERROR",
      message: "File not found"
    });
  }
});

server.listen(PORT, () => console.log(`running on: ${PORT}`));