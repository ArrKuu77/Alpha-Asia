import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseUrl = "https://bgvxqjymtdtvmbsqxtxk.supabase.co";
const supabaseKey = "sb_publishable_XidIv5hq7Tw1HPftdDS33w_natGp9u0";
export const supabase = createClient(supabaseUrl, supabaseKey);

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
  console.log(employee_table);

  return { employee_table, error };
};
export const dailyDoctorListSaveFunction = async (
  Mr_Name,
  Doctor_List,
  CurrentDoctorDate
) => {
  let { data, error } = await supabase
    .from("report_DoctorList_Save")
    .insert([
      {
        Mr_Name,
        Daily_DoctorList: Doctor_List,
        doctor_name_current_date: CurrentDoctorDate,
      },
    ])
    .select();

  return { data, error };
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
export const editReport = async (
  id,
  employeeId,
  reportDetail,
  date,
  dailySaleLS,
  dailyProductQtyLS,
  Township
) => {
  console.log(reportDetail);

  const { data, error } = await supabase
    .from("reports_table")
    .update({
      employee_id: employeeId,
      report_detail: reportDetail,
      date: date,
      daily_sale: dailySaleLS,
      daily_productQty: dailyProductQtyLS,
      township: Township,
    })
    .match({ id: id });

  if (error) {
    console.error("Error adding report:", error);
    return { error }; // Return the error to handle it outside
  }

  console.log("Report added:", data);
  return { data }; // Return the data after insertion
};
export const DeleteReportReviewFun = async (id) => {
  const { data, error } = await supabase
    .from("reports_table")
    .delete()
    .match({ id: id });

  if (error) {
    console.error("Error deleting report:", error);
    return { error }; // Return the error to handle it outside
  }

  console.log("Report deleted:", data);
  return { data }; // Return the data after deletion
};

// fetch();
