const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

module.exports = {
  async index(req, res) {
    try {
        const usuario = await Usuario.find();

        return res.json(usuario);
    }
    catch(err) {
        return res.json(err);
    }
  },

  async uploadImagem(req, res) {
    try {
      const usuario = await Usuario.updateOne({_id : res.locals.auth_data.id}, 
        {$set : { UrlFotoPerfil : 'files/' + req.file.filename}});

        return res.status(200).json(usuario); 
    }
    catch(err) {
      return res.json(err);
    }
  },

  async seguindo(req, res) {
    try {

      const id = res.locals.auth_data.id;
      const usuario = await Usuario.findById(id);
      const { Seguindo } = usuario;
      const seguidores = await Usuario.find({
        Seguidores : { $in : [usuario._id, ...Seguindo]}
      });

      return res.json(seguidores);
    }
    catch(err) {
      return res.json(err);
    }
  }
}