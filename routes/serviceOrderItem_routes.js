const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checkLogin');

const serviceOrderItemControler = require('../controllers/UsuariosController');

router.get('/serviceOrderItem', checkLogin, serviceOrderItemControler.getAll);
router.get('/serviceOrderItem/novo', checkLogin, serviceOrderItemControler.novo);
router.post('/serviceOrderItem/salvar', checkLogin, serviceOrderItemControler.salvar);
router.get('/serviceOrderItem/editar/:id', checkLogin, serviceOrderItemControler.getOne);
router.post('/serviceOrderItem/alterar', checkLogin, serviceOrderItemControler.alterar);
router.get('/serviceOrderItem/excluir/:id', checkLogin, serviceOrderItemControler.excluir);

module.exports = router