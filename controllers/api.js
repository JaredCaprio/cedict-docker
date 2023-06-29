const Word = require("../models/Word");
const cnchars = require("cn-chars");
const pinyin = require("prettify-pinyin");
const { processPinyin } = require("../utils/process-pinyin");

module.exports = {
  searchByChinese: async (req, res) => {
    const str = req.params.chars;

    let simplified = str.slice().split("");
    let traditional = str.slice().split("");

    for (let i = 0; i < str.length; i++) {
      simplified[i] = cnchars.toSimplifiedChar(str[i]);
      traditional[i] = cnchars.toTraditionalChar(str[i]);
    }

    simplified = simplified.join("");
    traditional = traditional.join("");

    const word = await Word.find({ simplified: req.params.chars });
    word.forEach((word) => {
      word.pronunciation = processPinyin(word.pronunciation);
    });
    res.json(word);
  },
  searchByPinyin: async (req, res) => {
    let str = req.params.pinyin;
    let parts = str.split(" ");

    let newStr = [];

    //catching 5th tone being omitted
    parts.forEach((part) => {
      let numeric = part.replace(/\D/g, "");

      if (numeric === "") {
        part += "5";
        newStr.push(part);
      } else {
        newStr.push(part);
      }
    });
    str = `[${newStr.join(" ")}]`;
    const results = await Word.find({ pronunciation: str });
    results.forEach((result) => {
      result.pronunciation = processPinyin(result.pronunciation);
    });
    res.json(results);
  },
};
