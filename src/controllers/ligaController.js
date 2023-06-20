const Liga = require('../models/ligaModel');

const getTodasLasLigas = async (req, res) => {
    const ligas = await Liga.getTodasLasLigas();
    if (ligas == null) {
       res.status(500).json({ message: 'Ocurrió un error al obtener las ligas.' });
    }
    else {
        res.status(200).json(ligas);
    }
};

const getLigaPorId = async (req, res) => {
    const id = req.params.id;
    const liga = await Liga.getLigaPorId(id);
    if (liga == null) {
        res.status(500).json({ message: 'Ocurrió un error al obtener la liga con id'+id+'.' });
    }
    else {
        res.status(200).json(liga);
    }
};

module.exports = {
    getTodasLasLigas,
    getLigaPorId
}