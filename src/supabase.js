import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
"https://vjhmhyikyllvpirsjpen.supabase.co", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaG1oeWlreWxsdnBpcnNqcGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5Nzk0NTIsImV4cCI6MjA1NTU1NTQ1Mn0.TcyJcTc9CtSH7gSIdGNY4cZHCYUDUGD5ByjYnLks8IA')

export const fetch = async () => {
    let { data: reports_table, error } = await supabase
    .from('reports_table')
    .select('*').eq('date','2025-2-23').eq('employee_id','1')

  
   console.log(reports_table)
}

fetch()

