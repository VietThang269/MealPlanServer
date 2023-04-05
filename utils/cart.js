const { getDb } = require("./database");

function getProductCollection() {
  return getDb().collection("cart");
}

module.exports = {};
