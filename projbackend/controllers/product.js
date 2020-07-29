const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({
        error: "Problem with image",
      });
    }

    //destructure the field
    const { name, description, price, stock, category } = fields;
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        error: "Please enter all fields",
      });
    }
    let product = new Product(fields);

    if (file.photo) {
      if (file.photo.size > 5000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to save product",
          });
        }
        res.json(product);
      });
    }
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      res.status(400).json({
        error: `Failed to delete ${product.name}`,
      });
    }
    res.json({
      message: `Successfully deleted ${product.name}`,
    });
  });
};

exports.updateProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
     return res.status(400).json({
        error: "Problem with image",
      });
    }
    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    //handle the file
    if (file.photo) {
      if (file.photo.size > 5000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      //save to DB
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
      
    }
    product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Failed to update product",
          });
        }
        res.json(product);
      });
  });
};

exports.getAllProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to get products",
        });
      }
      res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      filter: { _id: prod._id },
      update: { $inc: { stock: -prod.count, sold: +prod.count } },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};

exports.getAllUniqueCategory = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(category);
  });
};
