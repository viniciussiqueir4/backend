const mongoose = require('mongoose');

const Ingresso = mongoose.model('Ingresso');
const Evento = mongoose.model('Evento');

module.exports = {
    async index(req, res) {
        try {
            const ingressos = await Ingresso.find();

            return res.json(ingressos);
        }
        catch(err) {
            return res.json(err);
        }
    },

    async store(req, res) {
        try {
            req.body.IngressosDisponiveis = req.body.Quantidade;
            const ingresso = await Ingresso.create(req.body);
            const evento = await Evento.findById(ingresso.Evento);
            evento.Ingressos.push(ingresso._id);
            await evento.save();

            return res.json(ingresso);
        }
        catch(err) {
            return res.json(err);
        }
    }
}