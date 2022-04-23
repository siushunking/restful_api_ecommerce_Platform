const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

// 查詢所有
router.get('/products', adminController.getAllProducts);

//刪除
router.post('/delete-products', adminController.postDeleteProduct);
// //getProduct
// router.get('/query-product', adminController.getProduct);
// router.post('/query-product', adminController.postProduct);

router.post('/edit-product', adminController.postEditProduct)


router.post('/edit-product', adminController.postEditProduct)

module.exports = router;
