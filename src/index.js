const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const Callbacks = require('./_Helpers/Callbacks');
const JWT = require('./_Helpers/JWT');
const Routes = require('./Routes');

app.use(cors());
app.use(express.json());
app.use(JWT());
app.use(Routes);
app.use(Callbacks.errorHandler);
server.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
