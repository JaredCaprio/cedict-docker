const express = require("express");
const { checkDbForDocs } = require("./dict-parser");
const dbConnect = require("./Db/db-connection");
const app = express();
const dotenv = require("dotenv");

const PORT = process.env.PORT || 8080;

dotenv.config({ path: "./.env" });

//connect to db
dbConnect();

//init dictionary
checkDbForDocs();

app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));

app.listen(PORT, () => {
  console.log(`Sever listening on port ${PORT}`);
});
