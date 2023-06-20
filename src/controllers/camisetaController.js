const Camiseta = require('../models/camisetaModel');

const getTodasLasCamisetas = async (req, res) => {
    try {
        const data = await Camiseta.getTodasLasCamisetas();
        res.status(200).json(data);
    } 
    catch (error) {
        res.status(500).json({ message: 'Ocurrió un error al obtener las camisetas.' });
    }
};

const getCamisetaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const camiseta = await Camiseta.getCamisetaPorId(id);
      if (!camiseta) {
        return res.status(404).json({ message: 'La camiseta con id '+id+' no fue encontrada.' });
      }
      res.status(200).json(camiseta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al obtener la camiseta con id'+id+'.' });
    }
  };

  const getCamisetasDeEquipoPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const camisetas = await Camiseta.getCamisetasDeEquipoPorId(id);
      if (camisetas == '') {
        return res.status(404).json({ message: 'La liga con id '+id+' no fue encontrada.' });
      }
      res.status(200).json(camisetas);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al obtener las camisetas de la liga con id '+id+'.' });
    }
  };

  const getCamisetasDeLigaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const camisetas = await Camiseta.getCamisetasDeLigaPorId(id);
      if (camisetas == '') {
        return res.status(404).json({ message: 'El equipo con id '+id+' no fue encontrado.' });
      }
      res.status(200).json(camisetas);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al obtener las camisetas del equipo con id '+id+'.' });
    }
  };


module.exports = {
    getTodasLasCamisetas,
    getCamisetaPorId,
    getCamisetasDeEquipoPorId,
    getCamisetasDeLigaPorId
};
