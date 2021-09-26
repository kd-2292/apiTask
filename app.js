const express = require('express')
const mongoose = require("mongoose");

const app = express()
const cors = require("cors");
const morgan = require("morgan");
require('./src/config/dbConnect')()

const authCheck = require("./src/middleware/auth");

const authRoute = require("./src/route/authRoute");
const categoryRoute = require("./src/route/categoryRoute");
const itemRoute = require("./src/route/itemRoute");

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${__dirname}/public`));


app.use("/api/user", authRoute);
app.use("/api/category", authCheck, categoryRoute);
app.use("/api/item", authCheck, itemRoute);



app.use((req, res, next) => {
    const error = new Error("400 Bad Request");
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res, next) => {

    console.log(error)
    res.status(error.status || 500).send({
     error: {
     status: error.status || 500,
     message: error.message || "Internal Server Error"
    },
   });
});

module.exports = app