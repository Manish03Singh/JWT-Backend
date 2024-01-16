const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Started Successfully on port ${port}.`);
  }
});

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);