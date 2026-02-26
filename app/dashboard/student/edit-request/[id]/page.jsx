import NocRequestForm from '@/components/NocRequestForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import React from 'react'

const page = async({params}) => {
    const {id} = await params
    const supabase = await createClient()
    const {data,error } = await supabase.from('noc_requests').select("*").eq('id',id).eq('nocstatusdepartment','edit_requested').eq('allowededit',true).single()
    if(!data || error){
        redirect('/dashboard/student')
    }
    // console.log(data)
  return (
    <div>
      <NocRequestForm application={data} />
    </div>
  )
}

export default page
