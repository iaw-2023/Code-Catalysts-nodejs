const Equipo = require('../models/equipoModel');

const getTodosLosEquipos = async (req, res) => {
    const equipos = await Equipo.getTodosLosEquipos();
    if (equipos == null) {
        res.status(500).json({ message: 'Ocurrió un error al obtener los equipos.' });
    }
    else {
        res.status(200).json(equipos);
    }
};

const getEquipoPorId = async (req, res) => {
    const id = req.params.id;
    const equipo = await Equipo.getEquipoPorId(id);
    if (equipo == null) {
        res.status(500).json({ message: 'Ocurrió un error al obtener el equipo con id '+id+'.' });
    }
    else {
        res.status(200).json(equipo);
    }
};

const getEquiposDeLigaPorId = async (req, res) => {
    const id = req.params.id;
    const equipos = await Equipo.getEquiposDeLigaPorId(id);
    if (equipos == null) {
        res.status(500).json({ message: 'Ocurrió un error al obtener los equipos de la liga con id '+id+'.' });
    }
    else {
        res.status(200).json(equipos);
    }
  };

module.exports = {
    getTodosLosEquipos,
    getEquipoPorId,
    getEquiposDeLigaPorId
}