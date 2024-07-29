const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const taskRoute = require("./routes/taskRoute.js");

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use("/", taskRoute);

mongoose
  .connect(
    "mongodb+srv://tayyba:12345@backenddb.ixxizac.mongodb.net/tasks?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("mongodb connected");
    app.listen(5000, () => {
      console.log("server is listening to port 5000");
    });
  })

  .catch(() => {
    console.log("error");
  });
