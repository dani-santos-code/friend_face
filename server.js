"use strict";

const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/signin", {
    title: "Friendface"
  });
});

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT} check http://www.localhost:${PORT}`)
);
