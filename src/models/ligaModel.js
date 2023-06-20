const clienteDB = require('../database/cliente');

const supabase = clienteDB.getClienteDB();

const getTodasLasLigas = async () => {
    const { data, error } = await supabase
      .from('liga')
      .select('id_liga, nombre');
    if (error) {
      console.error(error);
      return null;
    }
    return data;
};

const getLigaPorId = async (id) => {
  const { data, error } = await supabase
    .from('liga')
    .select('id_liga, nombre')
    .eq('id_liga', id)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

module.exports = {
    getTodasLasLigas,
    getLigaPorId
}