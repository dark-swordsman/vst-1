const express = require('express');
const app = express();

app.get('/video.mp4', (req, res) => res.sendFile(__dirname + '/goxlr-1.mp4'));

app.listen(3069, () => console.log('listening 3069'));