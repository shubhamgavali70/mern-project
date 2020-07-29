const { Order, ProductCart } = require("../models/order");

exports.getOrderByID = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found",
        });
      }
      req.order = order;
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save order",
      });
    }
    res.json(order);
  });
};

exports.getAllOrder = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to display all orders",
        });
      }
      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.status.path("status").enunValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderID },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update status",
        });
      }
      res.json(order);
    }
  );
};
