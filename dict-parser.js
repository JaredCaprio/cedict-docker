const mongoose = require("mongoose");
const fs = require("fs");
const Word = require("./models/Word");

async function checkDbForDocs() {
  try {
    const docCount =
      await mongoose.connection.collections.words.estimatedDocumentCount();

    if (docCount > 0) {
      console.log("Database already filled, skipping Db init");
    } else {
      readDict();
    }
  } catch (error) {
    console.error(error);
  }
}

async function readDict() {
  const data = fs.readFileSync("cedict_ts.u8", "UTF-8");
  const lines = data.toString().split("\n");
  console.log("Dictionary loaded, executing parse");

  await addToDB(lines);
}

async function addToDB(lines) {
  const regex = /\[(.*?)\]/;

  const batchInsertSize = 1000;
  let batchInsert = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.length || line[0] === "#") continue;

    const spaceSplit = line.split(" ");
    const traditional = spaceSplit[0];
    const simplified = spaceSplit[1];

    const pronunciation = line.match(regex)[0];

    const slashSplit = line.split("/");
    const defs = slashSplit.slice(1, slashSplit.length - 1).join(";");

    batchInsert.push({
      traditional: traditional,
      simplified: simplified,
      pronunciation: pronunciation,
      definitions: defs,
    });
    if (batchInsert.length === batchInsertSize) {
      insertBatch(batchInsert);
      batchInsert = [];
    }
  }
  if (batchInsert.length > 0) {
    insertBatch(batchInsert);
    batchInsert = [];
    console.log("Database initialized with Dictionary");
  }
}

async function insertBatch(batch) {
  try {
    await Word.insertMany(batch);
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  checkDbForDocs: checkDbForDocs,
  readDict: readDict,
};
