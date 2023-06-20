const clienteDB = require('../database/cliente');

const supabase = clienteDB.getClienteDB();

const getTodosLosEquipos = async () => {
    const { data, error } = await supabase
      .from('equipo')
      .select('id_equipo, nombre, id_liga');
    if (error) {
      console.error(error);
      return null;
    }
    return data;
};

const getEquipoPorId = async (id) => {
  const { data, error } = await supabase
    .from('equipo')
    .select('id_equipo, nombre, id_liga')
    .eq('id_equipo', id)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

//el nombre de la liga esta dentro de "liga"
const getEquiposDeLigaPorId = async (id) => {
    const { data, error } = await supabase
      .from('equipo')
      .select('id_equipo, nombre, id_liga, liga(nombre)')
      .eq('id_liga', id)
      
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  };

module.exports = {
    getTodosLosEquipos,
    getEquipoPorId,
    getEquiposDeLigaPorId
}