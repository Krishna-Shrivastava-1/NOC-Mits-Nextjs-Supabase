import StudentNocAppliedStatusTable from '@/components/StudentNocAppliedStatusTable'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

const page = async () => {
     const supabase = await createClient()
        const {data:{user}}= await supabase.auth.getUser()
        const data = await supabase.from("noc_requests").select("*").eq('student_id',user?.id).or(
  "nocstatusdepartment.eq.pending,nocstatusdepartment.eq.approved,nocstatusdepartment.eq.edit_requested,nocstatustandp.eq.pending").eq("nocstatustandp","pending").order("createdat", { ascending: false })
        // console.log(data)
    const columnsName =["Sr No.", "Company Name","Department Status","T&P Status","Applied Date","Comment","Edit","More"]
  return (
    <div>
     <StudentNocAppliedStatusTable columnsName={columnsName} data={data?.data} />
    </div>
  )
}

export default page
