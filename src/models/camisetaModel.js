const clienteDB = require('../database/cliente');
const supabase = clienteDB.supabase;

const getTodasLasCamisetas = async () => {
  try {
    const result = await supabase.query("SELECT id_camiseta, descripcion, precio, talles, imagen, equipo.id_equipo, equipo.nombre as equipo, liga.nombre as liga, liga.id_liga FROM camiseta JOIN equipo ON camiseta.id_equipo = equipo.id_equipo JOIN liga ON equipo.id_liga = liga.id_liga WHERE estado = 'Habilitado'");
    return result.rows;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

const getCamisetaPorId = async (id) => {
  try {
    const result = await supabase.query("SELECT id_camiseta, descripcion, precio, talles, imagen, id_equipo FROM camiseta WHERE estado = 'Habilitado' AND id_camiseta = "+id);
    return result.rows;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

const getCamisetasDeEquipoPorId = async (id) => {
  try {
    const result = await supabase.query("SELECT id_camiseta, descripcion, precio, talles, imagen, equipo.id_equipo, equipo.nombre as equipo, liga.nombre as liga, liga.id_liga FROM camiseta JOIN equipo ON camiseta.id_equipo = equipo.id_equipo JOIN liga ON liga.id_liga = equipo.id_liga WHERE estado = 'Habilitado' AND equipo.id_equipo = "+id);
    return result.rows;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

const getCamisetasDeLigaPorId = async (id) => {
  try {
    const result = await supabase.query("SELECT id_camiseta, descripcion, precio, talles, imagen, equipo.id_equipo, equipo.nombre as equipo, liga.nombre as liga, liga.id_liga FROM camiseta JOIN equipo ON camiseta.id_equipo = equipo.id_equipo JOIN liga ON liga.id_liga = equipo.id_liga WHERE estado = 'Habilitado' AND liga.id_liga = "+id);
    return result.rows;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

const exist = async (id) => {
  try {
    const result = await supabase.query("SELECT id_camiseta FROM camiseta WHERE id_camiseta = "+id);
    if (result.rows.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getTodasLasCamisetas,
  getCamisetaPorId,
  getCamisetasDeEquipoPorId,
  getCamisetasDeLigaPorId,
  exist
}