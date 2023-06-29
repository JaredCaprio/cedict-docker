const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const resObj = {
    message: "Welcome to the Chinese English Dictionary API",
  };

  res.json(resObj);
});

module.exports = router;
