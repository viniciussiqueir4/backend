const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

module.exports = {
    async toggle(req, res) {
        try {
            const usuario_request = await Usuario.findById(req.params.id);
            
            const usuario = res.locals.auth_data.id;
            const usuario_ = await Usuario.findById(usuario);

            const seguir = usuario_request.Seguidores.indexOf(usuario);

            if(seguir == -1) {
                usuario_request.Seguidores.push(usuario);
                usuario_.Seguindo.push(usuario_request._id);
            }
            else {
                usuario_request.Seguidores.splice(usuario, 1);
                usuario_.Seguindo.splice(usuario_request._id, 1);
            }

            await usuario_request.save();
            await usuario_.save();
            
            return res.status(200).json(usuario_);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }

}
