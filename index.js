require("dotenv").config();

const express = require("express");
const app = express();

const { connect } = require("./models/db");
connect();

const helmet = require("helmet");
const morgan = require("morgan");
const { errorHandling } = require("./utils/errorHandling");

const indexRouter = require("./routes/index.route");
const userRouter = require("./routes/users.route");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

app.use("/", indexRouter);
app.use("/user", userRouter);
errorHandling(app);

app
  .listen(PORT, () => {
    console.log(`Server is live at PORT:${PORT}`);
  })
  .on("error", (error) => {
    console.error(error.message);
  });
