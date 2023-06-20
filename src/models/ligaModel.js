const clienteDB = require('../database/cliente');
const supabase = clienteDB.supabase;

const getTodasLasLigas = async () => {
    try {
        const result = await supabase.query("SELECT id_liga, nombre FROM liga");
        return result.rows;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const getLigaPorId = async (id) => {
    try {
        const result = await supabase.query("SELECT id_liga, nombre FROM liga WHERE id_liga = "+id);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    getTodasLasLigas,
    getLigaPorId
}