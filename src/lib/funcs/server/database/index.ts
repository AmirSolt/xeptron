

import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { PRIVATE_SERVICE_ROLE_KEY_SUPABASE } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'



// Create a single supabase client for interacting with your database
export const supabaseAdmin = createClient(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
    {
        auth: { persistSession: false },
    }
)


export async function insertUsageReport(usageReport:UsageReport):Promise<boolean>{
    const { data, error: err } = await supabaseAdmin
        .from('usage_reports')
        .insert(usageReport)
    if (err != null) {
        return false
    }
    return true
}
