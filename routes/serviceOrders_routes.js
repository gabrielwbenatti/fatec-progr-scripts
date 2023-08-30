const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/checkLogin')

const ServiceOrderController = require('../controllers/ServiceOrderController')

router.get('/service-orders', checkLogin, ServiceOrderController.getAll)
router.get('/service-orders/novo', checkLogin, ServiceOrderController.novo)
router.post('/service-orders/salvar', checkLogin, ServiceOrderController.salvar)
router.get('/service-orders/editar/:id', checkLogin, ServiceOrderController.getServiceOrder)
router.post('/service-orders/alterar', checkLogin, ServiceOrderController.alterar)
router.get('/service-orders/excluir/:id', checkLogin, ServiceOrderController.excluir)

module.exports = router