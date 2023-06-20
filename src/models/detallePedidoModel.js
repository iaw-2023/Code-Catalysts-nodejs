const clienteDB = require('../database/cliente');
const supabase = clienteDB.supabase;

const insertDetallePedido = async (id,camisetas) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido).toISOString();
    for (let camiseta of camisetas) {
        try {
            await supabase.query("INSERT INTO detalle_pedido (id_pedido, id_camiseta, talle, created_at, updated_at) VALUES ('"+id+"', '"+camiseta.id_camiseta+"', '"+camiseta.talle+"', '"+hoy+"', '"+hoy+"')");
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    insertDetallePedido
}