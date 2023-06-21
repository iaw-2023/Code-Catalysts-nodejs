const express = require('express');
const router = express.Router();
const camisetaController = require('../../controllers/camisetaController');
const equipoController = require('../../controllers/equipoController');
const ligaController = require('../../controllers/ligaController');
const pedidoController = require('../../controllers/pedidoController');
const clienteController = require('../../controllers/clienteController');

router
    .get('/', (req, res) => {
        res.send('<h1>La documentación de la API se encuentra en <a href="http://localhost:3000/api/v1/docs">/docs</a></h1>');
    })
    .get('/camisetas',camisetaController.getTodasLasCamisetas)
    .get('/camiseta/:id',camisetaController.getCamisetaPorId)
    .get('/camisetas/equipo/:id',camisetaController.getCamisetasDeEquipoPorId)
    .get('/camisetas/liga/:id',camisetaController.getCamisetasDeLigaPorId)
    .get('/equipos',equipoController.getTodosLosEquipos)
    .get('/equipo/:id',equipoController.getEquipoPorId)
    .get('/equipos/liga/:id',equipoController.getEquiposDeLigaPorId)
    .get('/ligas',ligaController.getTodasLasLigas)
    .get('/liga/:id',ligaController.getLigaPorId)
    .post('/pedido',pedidoController.insertPedido)
    .get('/pedidos/:email',pedidoController.getPedidosByEmail)
    .post('/login',clienteController.login)
    .post('/register',clienteController.register);

module.exports = router;