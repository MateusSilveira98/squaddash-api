const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const Callbacks = require('./_Helpers/Callbacks');
const JWT = require('./_Helpers/JWT');
const Routes = require('./Routes');

const corsOptions = {
  origins: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(JWT());
app.use(Routes);
app.use(Callbacks.errorHandler);
server.listen(3001, () => {
  console.log(`http://localhost:3001`);
});
