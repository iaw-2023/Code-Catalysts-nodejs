const Liga = require('../models/ligaModel');

const getTodasLasLigas = async (req, res) => {
    try {
        const data = await Liga.getTodasLasLigas();
        res.status(200).json(data);
    } 
    catch (error) {
        res.status(500).json({ message: 'Ocurrió un error al obtener las ligas.' });
    }
};

const getLigaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const liga = await Liga.getLigaPorId(id);
      if (!liga) {
        return res.status(404).json({ message: 'La liga con id '+id+' no fue encontrada.' });
      }
      res.status(200).json(liga);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrió un error al obtener la liga con id'+id+'.' });
    }
  };

module.exports = {
    getTodasLasLigas,
    getLigaPorId
}