const Product = require('../models/product');


exports.getProducts = async (req, res, next) => {
  const page = req.query.page || 1;
  const per_page = 2;
  const startIndex = (page -1) * per_page;  
  const endIndex = startIndex+ per_page;

  const products = await Product.findAll()
  const result = products.slice(startIndex,endIndex) 

  res.json(result)
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

