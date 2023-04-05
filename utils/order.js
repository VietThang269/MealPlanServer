const { getDb } = require("./database");

function getProductCollection() {
  return getDb().collection("order");
}

module.exports = {};
