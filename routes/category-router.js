const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/categorie-controller');
const { verificarToken, verificarUser } = require('../server/middlewares/autenticacion');

router.get('/categoria', userControllers.getCategories);
router.get('/categoria/:id', userControllers.getCategorie);
router.post('/categoria',[verificarToken], userControllers.postCreateCategorie);
router.put('/categoria/:id',[verificarToken], userControllers.putUpdateCetegorie);
router.delete('/categoria/:id',[verificarToken], userControllers.deleteCategorie);

module.exports = router;