const clienteDB = require('../database/cliente');

const supabase = clienteDB.getClienteDB();

const insertPedido = async (id) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const pedido = {
        id_cliente: id,
        fecha: hoy,
        created_at: hoy,
        updated_at: hoy
    }
    const { error } = await supabase
        .from('pedido')
        .insert(pedido);
    console.log(error);
    return error;
}

const ultimoIDInsertado = async () => {
    const { data, error } = await supabase
    .from('pedido')
    .select('id_pedido')
    .order('id_pedido', { ascending: false })
    .limit(1);
    return data[0].id_pedido;
}

//faltan agregar que muestre algunos campos
const getPedidosByEmail = async (id) => {
    const { data, error } = await supabase
    .from('pedido')
    .select('id_pedido, id_cliente, fecha, detalle_pedido(id_detalle_pedido, id_camiseta, talle)')
    .eq('id_cliente',id);
    return data;
}

module.exports = {
    insertPedido,
    ultimoIDInsertado,
    getPedidosByEmail
}