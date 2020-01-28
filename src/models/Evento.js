const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
    UrlFotoEvento : {
        type : String,
        required : true
    },
    Titulo : {
        type : String,
        maxlength : 50,
        required : true
    },
    Descricao : {
        type : String,
        maxlength : 200,
        required : true
    },
    DataEVento : {
        type : Date,
        required : true,
    },
    Ingressos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Ingresso'
    }],
    Empresa : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'Empresa'
    }
});

mongoose.model('Evento', EventoSchema);