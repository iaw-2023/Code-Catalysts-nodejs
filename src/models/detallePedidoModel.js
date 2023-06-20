const clienteDB = require('../database/cliente');

const supabase = clienteDB.getClienteDB();

const insertDetallePedido = async (id,camisetas) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    let nuevoDetallePedido;
    let error;
    for (let camiseta of camisetas) {
        nuevoDetallePedido = {
          id_pedido: id,
          id_camiseta: camiseta.id_camiseta,
          talle: camiseta.talle,
          created_at: hoy,
          updated_at: hoy
        };
         error  = await supabase
        .from('detalle_pedido')
        .insert(nuevoDetallePedido);
        console.log(error);
    }
    return error;
}

module.exports = {
    insertDetallePedido
}