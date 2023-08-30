const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/checkLogin')

const PetController = require('../controllers/PetController')

router.get('/pets', checkLogin, PetController.getAll)
router.get('/pets/novo', checkLogin, PetController.novo)
router.post('/pets/salvar', checkLogin, PetController.salvar)
router.get('/pets/editar/:id', checkLogin, PetController.editar)
// router.post('/pets/alterar', checkLogin, PetController.alterar)
// router.get('/pets/excluir/:id', checkLogin, PetController.excluir)

module.exports = router;