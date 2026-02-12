const { createClient } = require('@supabase/supabase-js');

// Debug: Check if env vars are loaded
console.log('Supabase URL:', process.env.SUPABASE_URL ? 'Loaded' : 'MISSING!');
console.log('Supabase Key:', process.env.SUPABASE_KEY ? 'Loaded' : 'MISSING!');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;