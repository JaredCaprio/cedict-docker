const express = require("express");
const Word = require("../models/Word");
const router = express.Router();
const apiControllers = require("../controllers/api");

//@desc full route '/api/search/characters/:characters'
//queries the database for a word using chinese
router.get("/search/characters/:chars", apiControllers.searchByChinese);

//@desc full route '/api/search/characters/:pinyin'
//queries the database for a word using chinese
router.get("/search/pinyin/:pinyin", apiControllers.searchByPinyin);

module.exports = router;
