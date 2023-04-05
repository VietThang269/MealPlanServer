const { findUser, addUser, getUser } = require("../utils/user");

const router = require("express").Router();

// Sign up
router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await findUser({ email });

    if (data)
      res.status(200).send({
        message: "Email đã tồn tại",
        error: 2,
      });
    else {
      const response = await addUser({
        email,
        password,
        role: 0,
      });

      res.status(200).send({
        message: "Đăng ký thành công",
        data: response,
      });
    }
  } catch (error) {}
});

// Sign in
router.post("/sign-in", async (req, res, next) => {
  try {
    const data = await findUser(req.body);
    if (data)
      res.status(200).send({
        message: "Đăng nhập thành công",
        data: {
          id: data._id,
          token: data.token,
          email: data.email,
          role: data.role,
        },
      });
    else {
      res.status(200).send({
        message: "Email hoặc mật khẩu không tồn tại",
        error: 2,
      });
    }
  } catch (error) {}
});

// Lấy tất cả tài khoản (có role là 0)
// role: 1 - admin
// role: 0 - user

router.get("/", async (req, res, next) => {
  try {
    const data = await getUser();
    res.status(200).send({
      message: "Success",
      error: 0,
      data,
    });
  } catch (error) {}
});

module.exports = router;
