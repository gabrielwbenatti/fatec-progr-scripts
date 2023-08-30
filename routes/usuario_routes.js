const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checkLogin');

const UsuariosController = require('../controllers/UsuariosController');

router.get('/usuarios', checkLogin, UsuariosController.getAll);
router.get('/usuarios/novo',  UsuariosController.novo);
router.post('/usuarios/salvar',  UsuariosController.salvar);
router.get('/usuarios/editar/:id', checkLogin, UsuariosController.getOne);
router.post('/usuarios/alterar', checkLogin, UsuariosController.alterar);
router.get('/usuarios/excluir/:id', checkLogin, UsuariosController.excluir);

module.exports = router;