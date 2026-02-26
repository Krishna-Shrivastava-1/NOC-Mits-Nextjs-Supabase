import TeacherNOCPendingTable from '@/components/TeacherNOCPendingTable'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

const page =async () => {
    const columnsName =["Sr No.","Student Name","Enrollment No." ,"Company Name","Department Status","T&P Status","Applied Date","Comment","More"] 
        const supabase = await createClient()
            const { data, error } = await supabase
           .from("noc_requests")
           .select(`
             *,
             users (
               name,
               rollnum
             )
           `)
           .order("createdat", { ascending: false }).eq('nocstatusdepartment','approved').eq('nocstatustandp', 'approved')
              
              
            //   console.log(data)
  return (
    <div>
      <TeacherNOCPendingTable columnsName={columnsName} data={data} toShowAction={false}  />
    </div>
  )
}

export default page
