const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const PORT = process.env.PORT || 2345;
const userController = require("./controllers/users.controller");
const prodController = require("./controllers/products.controller");
const { register, login } = require("./controllers/auth.controller");
const cartController = require("./controllers/cart.controller");
const addressController = require("./controllers/address.controller");
const orderController = require("./controllers/order.controller");

const connect = require("./configs/db");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use("/register", register);
app.use("/users", userController);
app.use("/products", prodController);
app.use("/carts", cartController);
app.use("/addresses", addressController);
app.use("/orders", orderController);

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`listening on port ${PORT} `);
  } catch (error) {
    console.log(error.message);
  }
});
