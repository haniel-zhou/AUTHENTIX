import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zwiyjbkrffbuedvkqtmy.supabase.co'
const supabaseKey = 'sb_publishable_Kn7dFu8FcsB73XXCeAkszw_FYpN8jl9'

export const supabase = createClient(supabaseUrl, supabaseKey)
