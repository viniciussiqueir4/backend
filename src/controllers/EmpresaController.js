const mongoose = require('mongoose');
const Empresa  = mongoose.model('Empresa');
const Usuario = mongoose.model('Usuario');

module.exports = {

    async index(req, res) {
        try {
            const empresa = await Empresa.find();
            return res.json(empresa);
        }
        catch(err) {
            return res.json(err);
        }
    },

    async store(req, res) {
        try {
            const usuarioId = res.locals.auth_data.id;
            req.body.UsuarioMaster = usuarioId;
            
            const empresa = await Empresa.create(req.body);

            const usuario = await Usuario.findById(usuarioId);
            usuario.Empresas.push(empresa._id);

            await usuario.save();

            return res.json(empresa);
        }
        catch(err) {
            return res.json(err);
        }
    },

    async updateLogo(req, res) {
        try {
            const empresa = await Empresa.updateOne({_id : req.params.id}, 
                {$set : { UrlLogo : 'files/' + req.file.filename}});

                return res.status(200).json(empresa); 
        }
        catch(err) {
            return res.json(err);
        }
    },

    async addImagensAmbiente(req, res) {
        try { 
             const empresa = await Empresa.findById(req.params.id); 

             for(var i = 0; i < req.files.length; i++) {
                empresa.Ambiente.push(`files/${req.files[i].filename}`);
             }
             

             await empresa.save();

             return res.json(empresa);

            // const empresa = await Empresa.updateOne({_id : req.params.id}, 
            //     {$set : { Ambiente : 'files/' + req.file.filename}});
        
            //     return res.status(200).json(empresa); 
        }
        catch(err) {
            return res.json(err);
        }
    },

    async destaques(req, res) {
        try {
            const empresas = await (await Empresa.find().populate('Curtidas'));
 
            let destaques = [];

            for(var i = 0; i < empresas.length; i ++) {
                if(empresas[i].Curtidas.length) {
                    destaques.push(empresas[i]);
                }
            }
           
            return res.json(destaques);

        }
        catch(err) {
            return res.json(err);
        }
    }
}