const router = require("express").Router();

const {
  getAllOrder,
  updateOrderStatus,
  createOrder,
  getOrdersByProductId,
  getOrdersByUserId,
} = require("../utils/order");

router.get("/", async (req, res, next) => {
  try {
    const data = await getAllOrder();
    res.status(200).send({
      message: "success",
      error: 0,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "System error" });
  }
});

///thêmmm

router.post("/", async (req, res) => {
  try {
    const order = req.body;
    const result = await createOrder(order);

    res.status(200).send({
      message: "Order created",
      error: 0,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create order",
      error: 1,
      data: error,
    });
  }
});
//update order

router.put("/:id", async (req, res) => {
  try {
    const result = await updateOrderStatus(req.params.id, req.body.status);
    if (result) {
      res.status(200).send({
        message: "success",
        error: 0,
        data: { id: req.params.id, status: req.body.status },
      });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "System error" });
  }
});

//get order dựa vào id của product
router.get("/:productId", async (req, res, next) => {
  try {
    const db = getDb();
    const orders = await db
      .collection("orders")
      .find({ "items.productId": new ObjectId(req.params.productId) })
      .toArray();

    const totalQuantity = orders.reduce((acc, order) => {
      const items = order.items.filter(
        (item) => item.productId.toString() === req.params.productId
      );
      const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
      return acc + quantity;
    }, 0);

    res.json({ totalQuantity });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get order dựa vào id của product
router.get("/orders/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const orders = await getOrdersByProductId(productId);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// get bằng userid
router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
});
//fn
module.exports = router;
