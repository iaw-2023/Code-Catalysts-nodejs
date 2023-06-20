const clienteDB = require('../database/cliente');
const supabase = clienteDB.supabase;

const exist = async (email) => {
    const result = await supabase.query("SELECT * FROM cliente WHERE email = '"+email+"'");
    if (result.rows.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

const getPassword = async (email) => {
    const result = await supabase.query("SELECT password FROM cliente WHERE email = '"+email+"'");
    return result.rows[0].password;
}

const register = async (email,password) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido).toISOString();;
    try {
        await supabase.query("INSERT INTO cliente (email, password, created_at, updated_at) VALUES ('"+email+"', '"+password+"', '"+hoy+"', '"+hoy+"')");
    }
    catch (error) {
        console.log(+error);
    }
};

const getIDByEmail = async (email) => {
    try {
        const result = await supabase.query("SELECT id_cliente FROM cliente WHERE email = '"+email+"'");
        if (result.rows.length == 0) {
            return null;
        }
        else {
            return result.rows[0].id_cliente;
        }
      }
      catch (error) {
        console.log(error);
        return null;
      }
};

module.exports = {
    exist,
    getPassword,
    getIDByEmail,
    register
}