// Imports
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200
}

const routes = require('./routes');

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

server.listen(3000, () => {
   console.log('http://localhost:3000'); 
});