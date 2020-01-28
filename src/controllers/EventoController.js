const mongoose = require('mongoose');
const Evento = mongoose.model('Evento');
const Empresa = mongoose.model('Empresa');
const formatarData = require('../utils/formatoData');

module.exports = {
    async index(req, res) {
        try {


            const evento = await Evento.find();
             
             
            return res.json(evento);
        }
        catch(err) {
            return res.json(err);
        }
    },

    async store(req, res) {
        try {
            req.body.UrlFotoEvento = req.file.filename;
            const evento = await Evento.create(req.body); 
            const empresa = await Empresa.findById(evento.Empresa); 
            empresa.Eventos.push(evento._id); 
            await empresa.save();

            return res.json(evento);

        }
        catch(err) {
            return res.json(err);
        }
    }
}