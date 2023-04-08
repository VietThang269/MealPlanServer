const router = require("express").Router();
const {
  getCart,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteProductCart,
  addToCart,
} = require("../utils/cart");

/*
    products
- user_id: string
- list: array

[{
    id: (id cua san pham),
    quanity: so luong san pham
}]

200 -> GET OK, UPDATED OK, DELETE OK
201 -> CREATED OK
500 -> Server lỗi
*/

// Lấy tất cả giỏ hàng
router.get("/", async (req, res, next) => {
  try {
    const data = await getCart();

    res.status(200).send({
      message: "get success",
      error: 0,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "system error",
      error: -1,
    });
  }
});

// Lấy tất cả sản phẩm theo id mặc định
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params;
    const data = await getCartById(id);

    res.status(200).send({
      message: "get success",
      error: 0,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "system error",
      error: -1,
    });
  }
});

// Lấy tất cả sản phẩm theo user_id
router.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCartByUserId(id);

    res.status(200).send({
      message: "get success",
      error: 0,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "system error",
      error: -1,
    });
  }
});

// Cập nhật sản phẩmvtrong Cart
// router.put("/:id", async (req, res, next) => {
//   try {
//     const id = req.params;
//     const cart = await updateCart(id, req.body);

//     res.status(201).send({
//       message: "edit success",
//       error: 0,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "system error",
//       error: -1,
//     });
//   }
// });

// Thêm sản phẩm vào Cart
router.put("/add", async (req, res, next) => {
  try {
    const data = req.body;
    const reponse = await addToCart(data);
    res.status(201).send({
      message: "add success",
      error: 0,
    });
  } catch (error) {
    res.status(500).send({
      message: "system error",
      error: -1,
    });
  }
});

// Xóa sản phẩm trong Cart
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params;
    const reponse = await deleteProductCart(id);
    res.status(201).send({
      message: "delete success",
      error: 0,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "system error",
      error: -1,
    });
  }
});

module.exports = router;
