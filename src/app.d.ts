// src/app.d.ts


// supabase gen types typescript --project-id lzwzuonzdnqgacynnsry > ./src/lib/utils/database.types.ts

import { SupabaseClient, Session } from '@supabase/supabase-js'
import type { Database } from '$lib/utils/database.types.js'

declare global {
  namespace App {
    interface Locals {
    //   supabaseAuthServer: SupabaseClient<Database>
    //   getSession(): Promise<Session | null>
    }
    interface PageData {
    //   session: Session | null
    }
    // interface Error {}
    // interface Platform {}
  }
}
