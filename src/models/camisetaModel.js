const clienteDB = require('../database/cliente');

const supabase = clienteDB.getClienteDB();


const getTodasLasCamisetas = async () => {
  const { data, error } = await supabase
    .from('camiseta')
    .select('id_camiseta, descripcion, precio, talles, imagen, id_equipo, estado, equipo(nombre)')
    .eq('estado','Habilitado');
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

const getCamisetaPorId = async (id) => {
  const { data, error } = await supabase
    .from('camiseta')
    .select('id_camiseta, descripcion, precio, talles, imagen')
    .eq('id_camiseta', id)
    .eq('estado','Habilitado')
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

//no puedo hacer que muestre el id y nombre de la liga y el nombre del equipo esta adentro de "equipo"
const getCamisetasDeEquipoPorId = async (id) => {
  const { data, error } = await supabase
    .from('camiseta')
    .select('id_camiseta, descripcion, precio, talles, imagen, id_equipo, estado, equipo(nombre)')
    .eq('id_equipo', id)
    .eq('estado','Habilitado');
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

//se ve bastante raro el json, es como que cada indice del json son las camisetas de un equipo
const getCamisetasDeLigaPorId = async (id) => {
  const { data, error } = await supabase
    .from('equipo')
    .select('nombre, camiseta(id_camiseta, descripcion, precio, talles, imagen, id_equipo, estado), nombre, liga(id_liga, nombre)')
    .eq('id_liga', id)
    .eq('camiseta.estado','Habilitado');
    
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

const exist = async (id) => {
  const { data, error } = await supabase
    .from('camiseta')
    .select('id_camiseta')
    .eq('id_camiseta', id)
    .single();
  let existe;
  if (data == null) {
      existe = false;
  }
  else {
      existe = true;
  }
  return existe;
};

module.exports = {
  getTodasLasCamisetas,
  getCamisetaPorId,
  getCamisetasDeEquipoPorId,
  getCamisetasDeLigaPorId,
  exist
}