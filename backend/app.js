require('dotenv').config()
const express = require('express');
const body_parser = require('body-parser');
const morgan = require('morgan');

const MongoDB_Connect = require('./server/config/MongoDB');
const app = express()

app.use(morgan("dev"))
app.use(body_parser.json());
MongoDB_Connect();

const AuthRoute = require('./server/routes/AuthRoutes');
const { NotFound, ErrorHandler } = require('./server/middleware/ErrorHandler');

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Radi");
})

app.use('/auth', AuthRoute);

app.use(NotFound)
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`)
})