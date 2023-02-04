const { MongoClient } = require("mongodb");
// const url = "mongodb://localhost27017";
const url =
  "mongodb+srv://anna1:8EQzaLU7IxzwIRJD@cluster0.obrn2g6.mongodb.net/user";
const client = new MongoClient(url);
let dbName = null;

async function mongodb() {
  try {
    dbName = client.db("user");
  } catch (error) {
    throw error;
  }
}

function data() {
  return dbName;
}

module.exports = { mongodb, data };
