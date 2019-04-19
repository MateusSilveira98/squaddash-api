const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(require('./src/routes'));

server.listen(3000, () => {
   console.log('http://localhost:3000'); 
});