const clienteDB = require('../database/cliente');
const supabase = clienteDB.supabase;

const getTodosLosEquipos = async () => {
    try {
        const result = await supabase.query("SELECT id_equipo, nombre, id_liga FROM equipo");
        return result.rows;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const getEquipoPorId = async (id) => {
    try {
        const result = await supabase.query("SELECT id_equipo, nombre, id_liga FROM equipo WHERE id_equipo = "+id);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const getEquiposDeLigaPorId = async (id) => {
    try {
        const result = await supabase.query("SELECT id_equipo, equipo.nombre, liga.id_liga, liga.nombre as liga FROM equipo JOIN liga ON equipo.id_liga = liga.id_liga WHERE liga.id_liga = "+id);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    getTodosLosEquipos,
    getEquipoPorId,
    getEquiposDeLigaPorId
}