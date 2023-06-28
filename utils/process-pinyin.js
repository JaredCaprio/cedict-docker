const pinyin = require("prettify-pinyin");

module.exports = {
  processPinyin: (pronunciation) => {
    pronunciation = pinyin.prettify(
      pronunciation.slice(1, pronunciation.length - 1)
    );
    return pronunciation;
  },
};
