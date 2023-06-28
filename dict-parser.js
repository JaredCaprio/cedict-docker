const mongoose = require("mongoose");
const fs = require("fs");
const Word = require("./models/Word");

async function checkDbForDocs() {
  try {
    const collectionExists = mongoose.connection.collections.words
      ? true
      : false;

    if (collectionExists) {
      const wordCount = await Word.countDocuments();

      if (wordCount > 0) {
        console.log("Database already filled");
        return;
      }
    }
    readDict();
  } catch (error) {
    console.error(error);
  }
}

function readDict() {
  mongoose
    .connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      const data = fs.readFileSync("cedict_ts.u8", "UTF-8");
      const lines = data.toString().split("\n");
      console.log("Dictionary loaded, executing parse");

      addToDB(lines)
        .then(() => {
          console.log("Finished adding documents to the database");
          mongoose.connection.close();
        })
        .catch(console.error);
    })
    .catch(console.error);
}

async function addToDB(lines) {
  const regex = /\[(.*?)\]/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.length) continue;
    if (line[0] === "#") continue;

    const spaceSplit = line.split(" ");
    const traditional = spaceSplit[0];
    const simplified = spaceSplit[1];

    const pronunciation = line.match(regex)[0];

    const slashSplit = line.split("/");
    const defs = slashSplit.slice(1, slashSplit.length - 1).join(";");

    await Word.create({
      traditional: traditional,
      simplified: simplified,
      pronunciation: pronunciation,
      definitions: defs,
    });
  }
}

module.exports = {
  checkDbForDocs: checkDbForDocs,
  readDict: readDict,
};
