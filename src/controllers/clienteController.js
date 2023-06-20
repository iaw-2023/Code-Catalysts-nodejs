const Cliente = require('../models/clienteModel');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {//si no tiene estos campos
        res.status(400).send({ message: "El request login está incompleto, falta alguno de los siguientes campos: email y/o password."});
    }
    else {
        const email = body.email;
        const password = body.password;
        const cliente = await Cliente.getClienteByEmail(email);
        if (cliente != null) {
            if (await bcrypt.compare(password,cliente.password) == true) {
                res.status(200).json({ message: "Usuario válido." });
            }
            else {
                res.status(400).json({ message: "Contraseña inválida." });
            }
        }
        else {
            res.status(400).json({ message: "El email del cliente es inválido." });
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
                const cliente = await Cliente.getClienteByEmail(email);
                if (cliente == null) {
                    const saltRounds = 10;
                    const passwordHash = bcrypt.hashSync(password, saltRounds);
                    await Cliente.register(email, passwordHash);
                    res.status(200).json({ message: "Usuario registrado correctamente."});
                }   
                else {
                    res.status(400).send({ message: "El email ingresado ya está registrado."});
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

module.exports = {
    login,
    register
};
