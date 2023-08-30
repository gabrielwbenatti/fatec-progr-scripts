const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/checkLogin')

const ServicesController = require('../controllers/ServicesController')

router.get('/services', checkLogin, ServicesController.getAll)
router.get('/services/novo', checkLogin, ServicesController.novo)
router.post('/services/salvar', checkLogin, ServicesController.salvar)
router.get('/services/editar/:id', checkLogin, ServicesController.getService)
router.post('/services/alterar', checkLogin, ServicesController.alterar)
router.get('/services/excluir/:id', checkLogin, ServicesController.excluir)

module.exports = router