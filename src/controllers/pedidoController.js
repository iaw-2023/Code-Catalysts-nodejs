const Pedido = require('../models/pedidoModel');
const DetallePedido = require('../models/detallePedidoModel');
const Cliente = require('../models/clienteModel');
const Camiseta = require('../models/camisetaModel');

const insertPedido = async (req, res) => {
    const body = req.body;
    if (!body.email || !body.camisetas) {//si no tiene estos campos
        res.status(400).send({ message: "El request insertar pedido está incompleto, falta alguno de los siguientes campos: email y/o camisetas."});
    }
    else {
        const camisetas = body.camisetas;
        const validacion = await validacionDeBody(body);
        if (validacion.paso == true) {
            const idCliente = await Cliente.getIDByEmail(body.email)
            await Pedido.insertPedido(idCliente);
            const ultID = await Pedido.ultimoIDInsertado();
            await DetallePedido.insertDetallePedido(ultID,camisetas);
            res.status(200).json({ message: validacion.mensaje});
        }
        else {
            res.status(500).json({ message: validacion.mensaje });
        }
    }
};

const getPedidosByEmail = async (req, res) => {
    const email = req.params.email;
    const idCliente = await Cliente.getIDByEmail(email)
    if (idCliente != null) {
        const pedidos = await Pedido.getPedidosByEmail(idCliente);
        res.status(200).json(pedidos);
    }
    else {
        res.status(400).json({ message: "Email inválido." });
    }

}

const validacionDeBody = async (body) => {
    let validacion;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = regex.test(body.email);
    if (emailValido == true) {
        const idCliente = await Cliente.getIDByEmail(body.email)
        if (idCliente != null) {
            for (let camiseta of body.camisetas) {
                if (await Camiseta.exist(camiseta.id_camiseta) == false) {
                    validacion = {
                        paso: false,
                        mensaje: "La camiseta con id "+camiseta.id_camiseta+" no fue encontrada."
                    }
                    return validacion;
                }
            }
            validacion = {
                paso: true,
                mensaje: "El pedido fue insertado correctamente."
            }
            return validacion;
        }
        else {
            validacion = {
                paso: false,
                mensaje: "El email del cliente no existe."
            }
            return validacion;
        }
    }
    else {
        validacion = {
            paso: false,
            mensaje: "El email del cliente no tiene un formato válido."
        }
        return validacion;
    }
}

module.exports = {
    insertPedido,
    getPedidosByEmail
}