const { response } = require("express");
const { getDb } = require("./database");
const { ObjectId } = require("mongodb");

function getProductCollection() {
  return getDb().collection("product");
}

// Thêm sản phẩm
async function createNewProduct(data) {
  const reponse = await getProductCollection().insertOne(data);
  return reponse;
}

// Lấy tất cả sản phẩm
async function getAllProduct() {
  const response = await getProductCollection().find({}).toArray();
  return response;
}

//Sửa sản phẩm
async function editProduct(id, data) {
  const reponse = await getProductCollection().updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: data,
    }
  );
  return reponse;
}

//Xóa sản phẩm
async function deleteProduct(id) {
  const reponse = await getProductCollection().deleteOne({
    _id: new ObjectId(id),
  });
  return response;
}

module.exports = {
  createNewProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
};
