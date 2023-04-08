const { getDb } = require("./database");
const { ObjectId } = require("mongodb");

function getCartCollection() {
  return getDb().collection("cart");
}

async function createCart(id) {
  const cart = await getCartCollection().insertOne({
    list: [],
    userId: new ObjectId(id),
  });

  return cart;
}

async function getCart() {
  const cart = await getCartCollection().find().toArray();
  return cart;
}

async function getCartById(id) {
  const product = await getCartCollection().findOne({ _id: new ObjectId(id) });
  return product;
}

async function getCartByUserId(userId) {
  const cart = await getCartCollection().findOne({
    userId: new ObjectId(userId),
  });
  return cart;
}

async function updateCart(id, list) {
  const result = await getCartCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: list }
  );
  return result.modifiedCount > 0;
}

async function addToCart(data) {
  const result = await getCartCollection().findOne({
    _id: new ObjectId(data.id),
    "list.id": new ObjectId(data.productId),
  });

  console.log(data);
  if (result) {
    // update quanity
    const newList = result.list.map((item, _) => {
      if (item.id == data.productId) {
        return {
          ...item,
          quanity: item.quanity + data.quanity,
        };
      } else return item;
    });

    const response = await getCartCollection().updateOne(
      {
        _id: new ObjectId(data.id),
        "list.id": new ObjectId(data.productId),
      },
      {
        $set: {
          ...result,
          list: newList,
        },
      }
    );
  } else {
    // insert new product
    const response = await getCartCollection().updateOne(
      {
        _id: new ObjectId(data.id),
      },
      {
        $push: {
          list: {
            id: new ObjectId(data.productId),
            price: data.price,
            quanity: data.quanity,
          },
        },
      }
    );
  }
  return result;
}

async function deleteProductCart(id) {
  const result = await getCartCollection().deleteOne({
    _id: new ObjectId(id),
  });
  return result.deletedCount > 0;
}

module.exports = {
  getCart,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteProductCart,
  createCart,
  addToCart,
};
