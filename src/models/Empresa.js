  
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const EmpresaSchema = new mongoose.Schema({
    Cnpj: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    RazaoSocial: { 
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    Fantasia: {
        type: String,
        required: true,
        maxlength: 100
    },
    UsuarioMaster : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario'
    },
    Email: {
        type: String,
        required: true,
        maxlength: 100
    },
    Telefone : {
        type: String,
        maxlength: 14
    },
    EndLogradouro: {
        type: String,
        required: true,
        maxlength: 100
    },
    EndNumero: {
        type: String,
        required: true,
        maxlength: 5
    },
    EndComplemento: {
        type: String,
        maxlength: 100
    },
    EndBairro: {
        type: String,
        required: true,
        maxlength: 100
    },
    EndMunicipio: {
        type: String,
        required: true,
        maxlength: 100
    },
    EndUf: {
        type: String,
        required: true,
        maxlength: 2
    },
    EndCep: {
        type: String,
        required: true,
        maxlength: 10
    },
    UrlLogo: {
        type: String
    },
    Aberto : {
        type : Boolean
    },
    Classificacao : {
        type : Number
    },
    Curtidas : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario'
    }],
    Shows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Show'
    }],
    Ambiente : [{
        type : String
    }],
    DataCriacao: {
        type: Date,
        default: Date.now
    }
});
EmpresaSchema.plugin(mongoosePaginate);

mongoose.model('Empresa', EmpresaSchema);