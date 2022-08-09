require("dotenv").config();

const express = require("express");
const app = express();

const helmet = require("helmet");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan("combined"));

app
  .listen(PORT, () => {
    console.log(`Server is live at PORT:${PORT}`);
  })
  .on("error", (error) => {
    console.error(error.message);
  });
