const express = require('express');
const router = express.Router();

const productController = require('../controllers/product-controller');
const { verificarToken, verificarUser } = require('../server/middlewares/autenticacion');

router.get('/producto', productController.getProducts);
router.get('/producto/:id', productController.getProduct);
router.get('/producto/buscar/:termino', [verificarToken], productController.getFindProducts);
router.post('/producto', [verificarToken], productController.postCreateProduct);
router.put('/producto/:id', [verificarToken], productController.updateProduct);
router.delete('/producto/:id', [verificarToken], productController.deleteProduct);

module.exports = router;