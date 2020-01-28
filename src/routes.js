const express = require('express');

const routes = express.Router();


const AutenticacaoController = require('./controllers/AutenticacaoController');
const UsuarioController = require('./controllers/UsuarioController');
const EmpresaController = require('./controllers/EmpresaController');
const EventoController = require('./controllers/EventoController');
const IngressoController = require('./controllers/IngressoController');
const SeguirController = require('./controllers/SeguirController');
const CurtidaController = require('./controllers/CurtidaController');

const auhtorized = require('./middlewares/auth');
const multer = require('./config/multer');
//Autenticacão
routes.post('/usuarios', AutenticacaoController.store);
routes.post('/login', AutenticacaoController.login);

//Usuario 
routes.post('/usuario/uploadImagem', auhtorized, multer.single('imagem'), UsuarioController.uploadImagem);
routes.get('/usuarios', UsuarioController.index);
routes.post('/seguir/:id', auhtorized, SeguirController.toggle);
routes.get('/usuarios/seguindo', auhtorized, UsuarioController.seguindo);

//Empresa
routes.post('/empresas', auhtorized ,EmpresaController.store);
routes.get('/empresas', auhtorized ,EmpresaController.index);
routes.post('/empresas/logo/:id', auhtorized, multer.single('logo'), EmpresaController.updateLogo);
routes.post('/empresas/curtir/:id', auhtorized, CurtidaController.toggle);
routes.post('/empresas/ambiente/:id', auhtorized, multer.array('imagem', 10),EmpresaController.addImagensAmbiente);
routes.get('/empresas/destaques', auhtorized, EmpresaController.destaques);
//Shows fields

routes.post('/eventos', auhtorized, multer.single('imagem'), EventoController.store)
routes.get('/eventos', auhtorized, EventoController.index);


// Ingresso 

routes.post('/ingressos', auhtorized, IngressoController.store);
routes.get('/ingressos', auhtorized, IngressoController.index);

// routes.post('/eventos',)


module.exports = routes;