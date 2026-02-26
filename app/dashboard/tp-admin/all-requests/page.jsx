import TandPFilterBar from "@/components/TandPFilterBar";
import TeacherNOCPendingTable from "@/components/TeacherNOCPendingTable";
import { createClient } from "@/lib/supabase/server";
import React from "react";

const page = async ({ searchParams }) => {
  const columnsName = [
    "Sr No.",
    "Student Name",
    "Enrollment No.",
    "Department",
    "Company Name",
    "Department Status",
    "T&P Status",
    "Applied Date",
    "Comment",
    "More",
  ];
  const para = await searchParams;
  const department = para?.department;
  const semester = para?.semester;
  const sessionyear = para?.sessionyear;
  const yearofstudy = para?.yearofstudy;
  const nocstatustandp = para?.nocstatustandp;
  const supabase = await createClient();
  let query = supabase
    .from("noc_requests")
    .select(
      `
            *,
            users (
              name,
              rollnum
            )
          `,
    )
    .eq("nocstatusdepartment", "approved")
    .or("nocstatustandp.eq.approved,nocstatustandp.eq.rejected")
    .order("createdat", { ascending: false });

  if (department) {
    query = query.eq("department", department);
  }

  if (semester) {
    query = query.eq("semester", semester);
  }
  if (sessionyear) {
    query = query.eq("sessionyear", sessionyear);
  }
  if (yearofstudy) {
    query = query.eq("yearofstudy", yearofstudy);
  }
  if (nocstatustandp) {
    query = query.eq("nocstatustandp", nocstatustandp);
  }

  const { data } = await query;
  //   console.log(data)
  return (
    <div>
      <TandPFilterBar showFilterByTandP={true} />
      <TeacherNOCPendingTable
        columnsName={columnsName}
        data={data}
        tandpAction={true}
        toShowAction={false}
      />
    </div>
  );
};

export default page;
