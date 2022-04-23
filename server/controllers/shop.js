const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.send(JSON.stringify(products[0]));
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then(product => {
      if(product === null){
        res.send('Soory, we do not find this products')
      }else{
        res.send(JSON.stringify(product));
      }
    })
    .catch(err => console.log(err));
};

