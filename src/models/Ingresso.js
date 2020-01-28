const mongoose = require('mongoose');

const IngressoSchema = new mongoose.Schema({
    Valor : {
        type : Number,
        required : true,
    },
    Quantidade : {
        type : Number,
        required : true
    },
    IngressosVendidos : {
        type : Number,
        default : 0
    },
    IngressosDisponiveis : {
        type : Number
    },
    Lote : {
        type : Number
    },
    Ativo : {
        type : Boolean
    },
    Evento : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Evento'
    },
    DataCriacao : {
        type : Date,
        default : Date.now
    }
});

mongoose.model('Ingresso', IngressoSchema);