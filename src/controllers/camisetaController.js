const Camiseta = require('../models/camisetaModel');

const getTodasLasCamisetas = async (req, res) => {
  const camisetas = await Camiseta.getTodasLasCamisetas();
    if (camisetas == null) {
      res.status(500).json({ message: 'Ocurrió un error al obtener las camisetas.' });
    }
    else {
      res.status(200).json(camisetas);
    }
};

const getCamisetaPorId = async (req, res) => {
  const id = req.params.id;
  const camiseta = await Camiseta.getCamisetaPorId(id);
  if (camiseta == null) {
      res.status(500).json({ message: 'Ocurrió un error al obtener la camiseta con id'+id+'.' });
  }
    else {
    res.status(200).json(camiseta);
  }
};

const getCamisetasDeEquipoPorId = async (req, res) => {
  const id = req.params.id;
  const camisetas = await Camiseta.getCamisetasDeEquipoPorId(id);
  if (camisetas == null) {
      res.status(500).json({ message: 'Ocurrió un error al obtener las camisetas del equipo con id'+id+'.' });
  }
  else {
    res.status(200).json(camisetas);
  }
};

const getCamisetasDeLigaPorId = async (req, res) => {
  const id = req.params.id;
  const camisetas = await Camiseta.getCamisetasDeLigaPorId(id);
  if (camisetas == null) {
      res.status(500).json({ message: 'Ocurrió un error al obtener las camisetas de la liga con id'+id+'.' });
  }
  else {
    res.status(200).json(camisetas);
  }
};

const exist = async (id) => {
    return Camiseta.exist(id);
};

module.exports = {
    getTodasLasCamisetas,
    getCamisetaPorId,
    getCamisetasDeEquipoPorId,
    getCamisetasDeLigaPorId,
    exist
};