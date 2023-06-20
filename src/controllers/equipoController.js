const Equipo = require('../models/equipoModel');

const getTodosLosEquipos = async (req, res) => {
    try {
        const data = await Equipo.getTodosLosEquipos();
        res.status(200).json(data);
    } 
    catch (error) {
        res.status(500).json({ message: 'Ocurrió un error al obtener los equipos.' });
    }
};

const getEquipoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const equipo = await Equipo.getEquipoPorId(id);
    if (!equipo) {
      return res.status(404).json({ message: 'El equipo con id '+id+' no fue encontrado.' });
    }
    res.status(200).json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener el equipo con id'+id+'.' });
  }
};

const getEquiposDeLigaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const equipos = await Equipo.getEquiposDeLigaPorId(id);
      if (equipos == '') {
        return res.status(404).json({ message: 'La liga con id '+id+' no fue encontrada.' });
      }
      res.status(200).json(equipos);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al obtener los equipos de la liga con id '+id+'.' });
    }
  };

module.exports = {
    getTodosLosEquipos,
    getEquipoPorId,
    getEquiposDeLigaPorId
}