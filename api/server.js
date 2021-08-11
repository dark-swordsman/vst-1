const express = require('express');
const fs = require('fs')

const app = express();

const PORT = 3010;

app.get('/', (req, res) => res.send('yeet'));

app.post('/upload', (req, res) => {
  try {
    const filePath = __dirname + '/temp/write.mp4';
    const stream = fs.createWriteStream(filePath);
  
    req.pipe(stream);

    req.on('end', () => {
      stream.end();
      res.end();
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
});

app.listen(PORT, () => console.log(`API running on ${PORT}`));