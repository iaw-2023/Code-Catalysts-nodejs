const clienteDB = require('../database/cliente');
const supabase = clienteDB.supabase;

const insertPedido = async (id) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido).toISOString();
    try {
        await supabase.query("INSERT INTO pedido (id_cliente, fecha, created_at, updated_at) VALUES ('"+id+"', '"+hoy+"', '"+hoy+"', '"+hoy+"')");
    }
    catch (error) {
        console.log(error);
    }
};

const ultimoIDInsertado = async () => {
    const result = await supabase.query("SELECT * FROM pedido ORDER BY id_pedido DESC LIMIT 1");
    return result.rows[0].id_pedido;
}

const getPedidosByID = async (id) => {
    const result = await supabase.query("SELECT id_detalle_pedido, pedido.id_pedido, camiseta.id_camiseta, talle, descripcion, precio, imagen, id_equipo, pedido.id_cliente, fecha FROM detalle_pedido JOIN camiseta ON detalle_pedido.id_camiseta = camiseta.id_camiseta JOIN pedido ON detalle_pedido.id_pedido = pedido.id_pedido WHERE id_cliente = "+id);
    return result.rows;
}

module.exports = {
    insertPedido,
    ultimoIDInsertado,
    getPedidosByID
}