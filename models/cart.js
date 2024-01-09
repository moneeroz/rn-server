const config = require("../config/database");

const Cart = config.define("cart", {}, { timestamps: true, updatedAt: false });

module.exports = Cart;
