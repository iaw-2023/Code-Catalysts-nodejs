const clienteDB = require('../database/cliente');

const supabase = clienteDB.getClienteDB();

const getIDByEmail = async (email) => {
    const { data, error } = await supabase
      .from('cliente')
      .select('id_cliente')
      .eq('email', email)
      .single();
    let id;
    if (data == null) {
        id = null;
    }
    else {
        id = data.id_cliente;
    }
    return id;
};

const getClienteByEmail = async (email) => {
    const { data, error } = await supabase
      .from('cliente')
      .select('id_cliente, password')
      .eq('email', email)
      .single();
    return data;
};

const register = async (email,password) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const cliente = {
        email: email,
        password: password,
        created_at: hoy,
        updated_at: hoy
    }
    const { error } = await supabase
        .from('cliente')
        .insert(cliente);
    console.log(error);
};

module.exports = {
    getIDByEmail,
    getClienteByEmail,
    register
}