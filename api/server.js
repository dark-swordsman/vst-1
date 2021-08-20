const express = require("express");
const fs = require("fs")

const app = express();

const PORT = 3010;

app.get("/", (req, res) => res.send("yeet"));

app.post("/upload", (req, res) => {
  try {
    const directory = "temp";
    const filePath = `${__dirname}/${directory}`;
    
    new Promise((resolve, reject) => {
      if (fs.existsSync(`${ __dirname}/${directory}`)) {
        resolve();
      } else {
        fs.mkdirSync(`${ __dirname}/${directory}`);
        resolve();
      }
    })
    .then(() => {
      const stream = fs.createWriteStream(filePath);
      req.pipe(stream);
  
      req.on("end", () => {
        stream.end();
        res.end();
      });
    })
    .error((e) => console.error(e));
  
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
});

app.listen(PORT, () => console.log(`API running on ${PORT}`));