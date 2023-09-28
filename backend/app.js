require('dotenv').config()
const express = require('express');
const MongoDB_Connect = require('./server/config/MongoDB');
const app = express()

MongoDB_Connect();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Radi");
})

app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`)
})