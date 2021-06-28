var express = require('express');
var app = express();

const PORT = 3010;

app.get('/', (req, res) => res.send('yeet'));

app.listen(PORT, () => console.log(`API running on ${PORT}`));