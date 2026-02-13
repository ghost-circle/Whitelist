import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://afvnluqrtlzypabwlucw.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_lWl-agvBY6nFuYobHf4xVQ_2T844GR_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
