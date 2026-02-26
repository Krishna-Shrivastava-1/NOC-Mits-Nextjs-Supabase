import TandPFilterBar from '@/components/TandPFilterBar'
import TeacherNOCPendingTable from '@/components/TeacherNOCPendingTable'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

const page =async ({searchParams}) => {
    const columnsName =["Sr No.","Student Name","Enrollment No.","Department" ,"Company Name","Department Status","T&P Status","Applied Date","Comment","Action","More"] 
    const para = await searchParams
     const department = para?.department
  const semester = para?.semester
  const sessionyear = para?.sessionyear
  const yearofstudy = para?.yearofstudy
        const supabase = await createClient()
      let query = supabase
    .from("noc_requests")
    .select(`
      *,
      users (
        name,
        rollnum
      )
    `)
    .eq("nocstatusdepartment", "approved")
    .eq("nocstatustandp", "pending")
    .order("createdat", { ascending: false })
// console.log(para)
  if (department) {
    query = query.eq("department", department)
  }

  if (semester) {
    query = query.eq("semester", semester)
  }
  if (sessionyear) {
    query = query.eq("sessionyear", sessionyear)
  }
  if (yearofstudy) {
    query = query.eq("yearofstudy", yearofstudy)
  }

  const { data } = await query
              
              
            //   console.log(data)
  return (
    <div>
      <TandPFilterBar />
      <TeacherNOCPendingTable columnsName={columnsName} data={data} tandpAction={true}  />
    </div>
  )
}

export default page
