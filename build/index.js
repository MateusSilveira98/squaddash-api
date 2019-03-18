"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('Hellow World!');
});
app.listen(3000, function () {
    console.log('listening on http://localhost:3000!');
});
