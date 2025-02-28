import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://vjhmhyikyllvpirsjpen.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaG1oeWlreWxsdnBpcnNqcGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5Nzk0NTIsImV4cCI6MjA1NTU1NTQ1Mn0.TcyJcTc9CtSH7gSIdGNY4cZHCYUDUGD5ByjYnLks8IA"
);

export const repoetData = async (currentDate, employee_id) => {
  let { data, error } = await supabase
    .from("reports_table")
    .select("*")
    .eq("date", currentDate)
    .eq("employee_id", employee_id);

  if (error) {
    console.error("Error adding report:", error);
    return { error }; // Return the error to handle it outside
  }

  const reports_table = data[0];
  return { reports_table }; // Return the data after insertion
};

export const employeeTableFetch = async () => {
  let { data: employee_table, error } = await supabase
    .from("employee_table")
    .select("*");
  return { employee_table, error };
};

export const addReport = async (
  employeeId = 2,
  reportDetail,
  date,
  dailySaleLS,
  dailyProductQtyLS,
  Township
) => {
  console.log(employeeId, reportDetail, date);

  const { data, error } = await supabase
    .from("reports_table")
    .insert([
      {
        employee_id: employeeId,
        report_detail: reportDetail,
        date: date,
        daily_sale: dailySaleLS,
        daily_productQty: dailyProductQtyLS,
        township: Township,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding report:", error);
    return { error }; // Return the error to handle it outside
  }

  console.log("Report added:", data);
  return { data }; // Return the data after insertion
};

// fetch();
