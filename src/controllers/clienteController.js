const Cliente = require('../models/clienteModel');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
      res.status(400).send({ message: "El request login está incompleto, falta alguno de los siguientes campos: email y/o password." });
    } 
    else {
        const email = body.email;
        const password = body.password.toString();
        if (await Cliente.exist(email)) {    
            const passwordObtenida = await Cliente.getPassword(email);
            if (await bcrypt.compare(password, passwordObtenida)) {
                res.status(200).json({ message: "Ha iniciado sesión correctamente como "+email});
            } 
            else {
                res.status(400).json({ message: "Contraseña inválida." });
            }
        }
        else {
            res.status(400).json({ message: "Email inválido." });
        }
    }
};


const register = async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {//si no tiene estos campos
        res.status(400).send({ message: "El request register está incompleto, falta alguno de los siguientes campos: email y/o password."});
    }
    else {
        const email = body.email;
        const password = body.password;
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValido = regex.test(email);
        if (emailValido == true) {
            regex = /^(?=.*\d).{8,}$/;
            const passwordValido = regex.test(password);
            if (passwordValido == true) {
                if (await Cliente.exist(email)) {
                    res.status(400).send({ message: "El email ingresado ya está registrado."});
                }   
                else {
                    const saltRounds = 10;
                    const passwordHash = bcrypt.hashSync(password, saltRounds);
                    await Cliente.register(email, passwordHash);
                    res.status(200).json({ message: "Usuario registrado correctamente."});
                }
            }
            else {
                res.status(400).send({ message: "La contraseña ingresada no tiene un formato válido: debe contener al menos 8 caracteres y al menos 1 número."});
            }
        }
        else {
            res.status(400).send({ message: "El email ingresado no tiene un formato válido."});
        }
    }
};

const getIDByEmail = async (email) => {
    return Cliente.getIDByEmail(email);
}


module.exports = {
    login,
    register,
    getIDByEmail
};
