const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
  const resObj = {
    message: "Welcome to the Chinese English Dictionary API",
  };

  res.json(resObj);
});
