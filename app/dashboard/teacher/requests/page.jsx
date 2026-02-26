import TeacherNOCPendingTable from '@/components/TeacherNOCPendingTable'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

const page =async () => {
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
       .order("createdat", { ascending: false }).eq('nocstatusdepartment','pending')
          
          const columnsName =["Sr No.","Student Name","Enrollment No." ,"Company Name","Department Status","T&P Status","Applied Date","Comment","Actions","More"] 
          // console.log(data)
  return (
    <div>
      <TeacherNOCPendingTable columnsName={columnsName} data={data} />
    </div>
  )
}

export default page
