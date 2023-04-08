const { getProductById } = require("../utils/product");
const {
  createNewProduct,
  getAllProduct,
  deleteProduct,
  editProduct,
} = require("../utils/product");

const router = require("express").Router();
/*
    products
- name: string
- price: double
- category: array
- image: string
- description: string
- component: array
- rate: double
- discount: double

200 -> GET OK, UPDATED OK, DELETE OK
201 -> CREATED OK
500 -> Server lỗi
*/

// Thêm sản phẩm
router.post("/", async (req, res, next) => {
  try {
    const response = await createNewProduct(req.body);

    res.status(201).send({
      message: "created success",
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

// Lấy tất cả sản phẩm
router.get("/", async (req, res, next) => {
  try {
    const data = await getAllProduct();

    res.status(200).send({
      message: "get success",
      error: 0,
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "system error",
      error: -1,
      data: null,
    });
  }
});

// Lấy sản phẩm theo id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getProductById(id);
    res.status(201).send({
      message: "edit success",
      error: 0,
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "system error",
      error: -1,
      data: null,
    });
  }
});

// Sửa sản phẩm
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params;
    const reponse = await editProduct(id, req.body);

    res.status(201).send({
      message: "edit success",
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

// Xóa sản phẩm
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params;
    const reponse = await deleteProduct(id);
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
