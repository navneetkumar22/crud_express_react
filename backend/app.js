require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRoutes);

connectToDB();

module.exports = app;