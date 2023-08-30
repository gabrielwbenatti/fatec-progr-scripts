const bcrypt = require('bcryptjs');
const Usuarios = require('../models/usuario');

exports.getAll = (req, res, next) => {
    Usuarios.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(usuarios => {
        res.render('usuarios/index', { usuarios: usuarios });
    });
}

exports.novo = (req, res, next) => {
    res.render('usuarios/novo');
}

exports.salvar = (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    Usuarios.findOne({
        where: {
            email: email
        }
    }).then(usuario => {
        if (usuario == undefined) {
            const salt = bcrypt.genSaltSync(10);
            const senhaCriptografada = bcrypt.hashSync(senha, salt);

            Usuarios.create({
                nome: nome,
                email: email,
                senha: senhaCriptografada
            }).then(() => {
                res.redirect('/usuarios');
            })
        }
        else {
            res.redirect('/usuarios');
        }
    })
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;

    Usuarios.findByPk(id).then(usuario => {
        res.render('usuarios/editar', { usuario: usuario });
    })
}

exports.alterar = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;

    Usuarios.update({
        nome: nome,
        email: email
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/usuarios');
        })
}

exports.excluir = (req, res, next) => {
    const id = req.params.id;

    Usuarios.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/usuarios');
    })
}
