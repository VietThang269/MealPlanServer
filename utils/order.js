const { getDb } = require("./database");
const { ObjectId } = require("mongodb");

function getOrderCollection() {
  return getDb().collection("order");
}
//lay tat ca san pham
async function getAllOrder() {
  const order = await getOrderCollection().find({}).toArray();
  return order;
}

//tạo order mới :
async function createOrder(order) {
  // insert the order into the database
  const result = await getOrderCollection().insertOne({
    ...order,
    userId: new ObjectId(order.userId),
  });
  // return the price of the order
  return result;
}
//update status
async function updateOrderStatus(id, status) {
  const response = await getOrderCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );
  return response;
}

//get order dựa vào id khách hàng
async function getOrdersByUserId(userId) {
  const orders = await getOrderCollection()
    .find({ userId: new ObjectId(userId) })
    .toArray();
  return orders;
}
//dựa vào tên
// async function findOrdersByUser(searchTerm) {
//   const orders = await getOrderCollection().find({
//     $or: [
//       { "user.id": searchTerm },
//       { "user.name": { $regex: searchTerm, $options: "i" } },
//       { "user.phone": searchTerm }
//     ]
//   }).toArray();
//   return orders;
// }

//get order dựa vào id của products
async function getOrdersByProductId(productId) {
  const orders = await getOrderCollection()
    .find({ "list.productId": new ObjectId(productId) })
    .toArray();

  // tính tổng số lượng sản phẩm đã bán được
  const totalQuantity = orders.reduce(
    (acc, order) =>
      acc +
      order.list
        .filter((item) => item.productId.toString() === productId)
        .reduce((total, item) => total + item.quantity, 0),
    0
  );

  return {
    orders,
    totalQuantity,
  };
}

module.exports = {
  getAllOrder,
  createOrder,
  updateOrderStatus,
  getOrdersByUserId,
  getOrdersByProductId,
};
