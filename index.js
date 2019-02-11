// implement your API here
const express = require('express');
const database = require('./data/db.js');
const server = express();
const PORT = 4000;

server.use(express.json());

server.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})