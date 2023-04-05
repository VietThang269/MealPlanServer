const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://thanhhuyenmhl:admin123@mealplan.brnruin.mongodb.net/?retryWrites=true&w=majority";
const dbName = "MealPlan";

let db;

async function connectDb() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to database");
    db = client.db(dbName);
  } catch (err) {
    console.log(err);
  }
}

function getDb() {
  return db;
}

module.exports = { connectDb, getDb };
