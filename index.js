const express = require("express");
const app = express();
// server
const cors = require("cors");

const { connectDb } = require("./utils/database");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDb();
  console.log(`Example app listening on port ${port}`);
});
