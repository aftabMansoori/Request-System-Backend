require("dotenv").config();

const express = require("express");
const app = express();

const { connect } = require("./models/db");
connect();

const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const indexRouter = require("./routes/index.route");
const userRouter = require("./routes/users.route");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

app.use("/", indexRouter);
app.use("/user", userRouter);

app
  .listen(PORT, () => {
    console.log(`Server is live at PORT:${PORT}`);
  })
  .on("error", (error) => {
    console.error(error.message);
  });
