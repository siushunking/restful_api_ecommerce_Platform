# restful_api_ecommerce_Platform

# 系統簡介
今次是模仿電商平台後端(admin)。 簡單的CRUD，因為之前比較常用NOSQL MONGODB, 所以今次就用MYSQL作為資料庫。
先建立MVC Folder
一. Models 負責database
二.Views 因為暫時只有後端, 所以沒有加
三. controller 負責所有前端和DATABASE 交流

1. 建立連線 
```
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '890819', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
```
2. 建立TABLES
```
const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;

```

3. Controller
```
const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.send('Get add products pages');
  };
  
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
      .then(result => {
        // console.log(result);
        console.log('Created Product');
      })
      .catch(err => {
        console.log(err);
      });
  };


  exports.getAllProducts = async (req, res, next) => {
   const Allproducts = await Product.findAll({attributes: ['id', 'title', 'price', 'imageUrl', "description"]});
   res.send( JSON.stringify(Allproducts))
}

// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//       return res.redirect('/');
//     }
//     const prodId = req.params.productId;
//     Product.findById(prodId)
//       .then(product => {
//         if (!product) {
//           return res.redirect('/');
//         }
//         res.render('admin/edit-product', {
//           pageTitle: 'Edit Product',
//           path: '/admin/edit-product',
//           editing: editMode,
//           product: product
//         });
//       })
//       .catch(err => console.log(err));
//   };
  
  exports.postEditProduct = (req, res, next) => {
    const prodId =  req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId)
      .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.imageUrl = updatedImageUrl;
        return product.save();
      })
      .then(result => {
        console.log('UPDATED PRODUCT!');
        //res.redirect('/admin/products');
        res.send( JSON.stringify(result))
      })
      .catch(err => console.log(err));
  };

  exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
      .then(product => {
        return product.destroy();
      })
      .then(result => {
        console.log('DESTROYED PRODUCT');
        res.send('delete')
      })
      .catch(err => console.log(err));
  };
  

```
