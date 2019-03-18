import express = require('express');

const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hellow World!');
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000!');
});
