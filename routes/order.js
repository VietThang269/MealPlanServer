const router = require("express").Router();

const {
  getAllOrder,
  updateOrderStatus,
  createOrder,
  getOrdersByProductId,
  getOrdersByUserId,
} = require("../utils/order");

// Lấy toàn bộ order
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

// Thêm 1 order
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
      res.status(200).send({ success: false, message: "Order not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "System error" });
  }
});

// get bằng userid
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await getOrdersByUserId(userId);
    res.status(200).send({
      message: "success",
      error: 0,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
});

//fn
module.exports = router;
