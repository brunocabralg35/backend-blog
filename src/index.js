const express = require("express");
require("dotenv").config();
const router = require("./router");
const session = require("express-session");

const app = express();

// Sessions
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 30000000,
    },
  })
);

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
