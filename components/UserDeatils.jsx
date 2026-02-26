import { createClient } from '@/lib/supabase/server'
import React from 'react'

const UserDeatils =async () => {
    const supabase = await createClient()
    const {data:{user}}= await supabase.auth.getUser()
    const {data:userName} = await supabase.from("users").select("name, department").eq('id',user?.id).single()
    // console.log(userName)
  return (
    <div className='my-3 px-2'>
      <h1 className='text-xl font-bold'>Welcome, {userName?.name}</h1>
      <h1 className='text-xl font-bold'>{userName?.department}</h1>
    </div>
  )
}

export default UserDeatils
