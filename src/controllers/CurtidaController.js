const mongoose = require('mongoose');
const Empresa = mongoose.model('Empresa');

module.exports = {
    async toggle(req, res) {
        try {
            
            const empresa  = await Empresa.findById(req.params.id);


            
            if(!empresa)
                return res.status(201).json({Mensagem: 'Emppresa não existe!'});

            const usuario = res.locals.auth_data.id; 

            const curtida = empresa.Curtidas.indexOf(usuario);

            if(curtida == -1) {
                empresa.Curtidas.push(usuario);
            }
            else {
                empresa.Curtidas.splice(usuario, 1);
            }

            await empresa.save();

            res.status(200).json(empresa);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
}