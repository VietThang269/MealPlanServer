const { ObjectId } = require("mongodb");
const { getDb } = require("./database");

function getUserCollection() {
  return getDb().collection("user");
}

async function findUser(data) {
  const response = await getUserCollection().findOne(data);
  return response;
}

async function addUser(data) {
  const response = await getUserCollection().insertOne(data);
  return response;
}

async function getUser() {
  const response = await getUserCollection().find({ role: 0 }).toArray();
  return response;
}

async function deleteUser(id) {
  const response = await getUserCollection().deleteOne({
    _id: new ObjectId(id),
  });
  // need delete cart and order of user deleted
  return response;
}

module.exports = {
  findUser,
  addUser,
  getUser,
  deleteUser,
};
