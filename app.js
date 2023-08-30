const express = require('express')
const session = require('express-session')
const path = require('path')
const bcrypt = require('bcryptjs')
const app = express()
const checkLogin = require('./middleware/checkLogin') 

const connection = require('./database/database')

// setup do ambiente
// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Form parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Ativar os arquivos estáticos
app.use(express.static('public'))

// Sessions
app.use(session({
    secret: 'petshop',
    cookie: {
        maxAge: 1200000,
    },
    resave: false,
    saveUninitialized: false
}))

// Banco de Dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!')
    })
    .catch(erro => {
        console.log('Problemas na conexão!')
    })

// models
const Customer = require('./models/customer')
const Pet = require('./models/pet')
const Service = require('./models/service')
const ServiceOrder = require('./models/service_order')
const ServiceOrderItem = require('./models/service_order_item')
const Usuario = require('./models/usuario')

// routes
const CustomerRoutes = require('./routes/customer_routes')
const PetRoutes = require('./routes/pet_routes')
const ServiceRoutes = require('./routes/service_routes')
const ServiceOrderItemRoutes = require('./routes/serviceOrderItem_routes')
const UsuarioRoutes = require('./routes/usuario_routes')
const ServiceOrderRoutes = require('./routes/serviceOrders_routes')

app.get('/', checkLogin, (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login', { msg: '' })
})

app.post('/login', (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    Usuario.findOne({
        where: {
            email: email
        }
    }).then(usuario => {
        if (usuario != undefined) {
            let ok = bcrypt.compareSync(senha, usuario.senha)

            if (ok) {
                req.session.login = {
                    nome: usuario.nome
                }
                res.redirect('/')
            } else {
                res.render('login', { msg: 'Usuario ou senha inválidos!' })
            }
        } else {
            res.render('login', { msg: 'Usuário não encontrado!' })
        }
    })
})

// rotas externas
app.use('/', CustomerRoutes)
app.use('/', PetRoutes)
app.use('/', ServiceRoutes)
app.use('/', ServiceOrderItemRoutes)
app.use('/', UsuarioRoutes)
app.use('/', ServiceOrderRoutes)

module.exports = app    