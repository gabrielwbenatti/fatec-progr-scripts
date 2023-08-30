const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/checkLogin')

const CustomerController = require('../controllers/CustomerController')

router.get('/customers', checkLogin, CustomerController.getAll)
router.get('/customers/novo', checkLogin, CustomerController.novo)
router.post('/customers/salvar', checkLogin, CustomerController.salvar)
router.get('/customers/editar/:id', checkLogin, CustomerController.getOne)
router.post('/customers/alterar', checkLogin, CustomerController.alterar)
router.get('/customers/excluir/:id', checkLogin, CustomerController.excluir)

module.exports = router