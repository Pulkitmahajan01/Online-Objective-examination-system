// JavaScript source code
const mongoose = require("mongoose");
const env = require("mongoose");

function connectToDatabase(dbUrl) {
    mongoose.connect("mongodb://localhost:27017/examdb", { useNewUrlParser: true });
    const connection = mongoose.connection;
    connection.on("error", () => {
        console.log("Error while connecting to db");
    })
}

module.exports = {
    connectToDatabase
}