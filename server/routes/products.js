// modules required for routing
const { response } = require("express");
let express = require("express");
const { grep } = require("jquery");
let router = express.Router();
let mongoose = require("mongoose");
const products = require("../models/products");


let product= require("../models/products");


router.get("/", (req, res, next) => {
  
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});


router.get("/add", (req, res, next) => {
  res.render('products/add', { title: 'Add Product' })
});


router.post("/add", (req, res, next) => {
  let newProduct= product({
    "Productid": req.body.Productid,
    "Productname": req.body.Productname,
    "Description": req.body.Description,
    "Price": Number(req.body.Price),
  });

  product.create(newProduct, (err, product) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/products');
    }
  });
});
/*****************
 * ADD CODE HERE *
 *****************/


router.get("/:id", (req, res, next) => {
  product.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err)
      res.end(err);
    } else {
      console.log({ product });
      res.render('products/details', { title: 'product Details', product })
    }
  })

  /*****************
   * ADD CODE HERE *
   *****************/
});


//Edit Page
router.get("/edit/:id", (req, res, next) => {
  product.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err)
      res.end(err);
    } else {
      console.log({ product });
      res.render('products/edit', { title: 'product Edit', product })
    }
  })

  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  let newProduct= {
    "Productid": req.body.Productid,
    "Productname": req.body.Productname,
    "Description": req.body.Description,
    "Price": Number(req.body.Price),
  };

  product.findByIdAndUpdate(req.params.id, newProduct, (err, product) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      
      res.redirect(`/products/${product._id}`);
    }
  });
  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  product.remove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
     
      res.redirect('/products');
    }
  });
  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;
