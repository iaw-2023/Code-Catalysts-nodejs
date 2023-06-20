const { createClient } = require('@supabase/supabase-js');
const {URL, KEY} = require('../constantes');

const supabase = createClient(URL, KEY);

const getClienteDB = () => {
    return supabase;
};

module.exports = {
    getClienteDB
}