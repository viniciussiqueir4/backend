const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    Nome : {
        type : String,
        required : true,
        maxlength : 50
    },
    Email : {
        type : String,
        required : true
    },
    Senha : {
        type : String,
        required : true,
        maxlength : 30,
        select : false
    },
    UrlFotoPerfil : {
        type : String,
    },
    DataNascimento : {
        type : Date,
        required : true
    },
    Seguindo : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario'
    }],
    Seguidores : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario'
    }],
    Empresas : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Empresas'
    }],
    DataCriacao : {
        type : Date,
        default : Date.now
    },
});

UsuarioSchema.pre('save', function(next){
    let usuario = this;
    if(!usuario.isModified('Senha')) return next();

    bcrypt.hash(usuario.Senha, 10, (err, encrypted) => {
        usuario.Senha = encrypted;
        return next();
    })
});

mongoose.model('Usuario', UsuarioSchema);