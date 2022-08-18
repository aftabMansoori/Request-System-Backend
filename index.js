if (process.env.NODE_ENV === "DEV") require("dotenv").config();

const express = require("express");
const app = express();

const { connect } = require("./models/db");
connect();

const helmet = require("helmet");
const morgan = require("morgan");
var cors = require("cors");

const indexRouter = require("./routes/index.route");
const userRouter = require("./routes/users.route");
const requestsRouter = require("./routes/requests.route");
const adminRouter = require("./routes/admin.route");
const { errorHandling } = require("./utils/errorHandling");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/request", requestsRouter);
app.use("/admin", adminRouter);
errorHandling(app);

app
  .listen(PORT, () => {
    console.log(`Server is live at PORT:${PORT}`);
  })
  .on("error", (error) => {
    console.error(error.message);
  });
