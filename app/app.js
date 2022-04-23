const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const composerRoutes = require("../collection/routes/composer");
const compositionRoutes = require("../collection/routes/compositions");

// middleware for logging 
app.use(morgan("dev"));
// parsing
app.use(express.urlencoded({
    extended: true
}));
// middleware that all request are json
app.use(express.json());

// middleware to handle the CORS policy, * stands for everything
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","POST, PUT, GET, PATCH, DELETE");
    }
    next();
})

app.get("/", (req, res, next) => {
    res.status(201).json({
        message: "Service is up!", 
        method: req.method
    });
});

app.use("/composers", composerRoutes);
app.use("/compositions", compositionRoutes);

// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
    const error = new Error("Not found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    })
})

// connect to mongodb
mongoose.connect(process.env.mongoDBURL, (err) => {
    if(err){
        console.log("Error: ", err.message);
    }
    else{
        console.log("MongoDB connection successful")
    }
});

module.exports = app;