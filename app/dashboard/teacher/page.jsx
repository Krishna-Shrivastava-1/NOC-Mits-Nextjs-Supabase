import { ChartLineLinear } from '@/components/Charts'
import DashCards from '@/components/DashCards'
import UserDeatils from '@/components/UserDeatils'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

const page = async () => {
  const supabase = await createClient()

const { data: approved,count:approvedCount } = await supabase
  .from("noc_requests")
  .select("id", { count: "exact", head: true })
  .eq("nocstatusdepartment", "approved").eq("nocstatustandp",'approved')

const { data: rejected,count:rejectedCount } = await supabase
  .from("noc_requests")
  .select("id", { count: "exact", head: true })
  .eq("nocstatusdepartment", "rejected")

const { data: editRequested,count:editRequestedCount } = await supabase
  .from("noc_requests")
  .select("id", { count: "exact", head: true })
  .eq("nocstatusdepartment", "edit_requested")

const { data: pending,count:pendingCount } = await supabase
  .from("noc_requests")
  .select("id", { count: "exact", head: true })
  .eq("nocstatusdepartment", "pending")

const { data: waitingTandP,count:waitingTandPCount } = await supabase
  .from("noc_requests")
  .select("id", { count: "exact", head: true })
  .eq("nocstatusdepartment", "approved")
  .eq("nocstatustandp", "pending")
  

const today = new Date()
const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(today.getDate() - 6)

const { data } = await supabase
  .from("noc_requests")
  .select("createdat")
  .gte("createdat", sevenDaysAgo.toISOString())
  .order("createdat", { ascending: true })

// Create map of last 7 days
const last7Days = Array.from({ length: 8 }).map((_, i) => {
  const d = new Date()
  d.setDate(today.getDate() - (7 - i))
  return d.toISOString().split("T")[0] // YYYY-MM-DD
})

const countMap = {}

last7Days.forEach((date) => {
  countMap[date] = 0
})

// Count requests per day
data?.forEach((item) => {
  const date = item.createdat.split("T")[0]
  if (countMap[date] !== undefined) {
    countMap[date]++
  }
})

// Convert into chart format
const chartData = last7Days.map((date) => ({
  day: date,
  noc_requests: countMap[date],
}))

  return (
    <div>
      <UserDeatils />
      <DashCards  approved={approvedCount || 0}
  rejected={rejectedCount || 0}
  editRequested={editRequestedCount || 0}
  pending={pendingCount || 0}
  waitingTandP={waitingTandPCount || 0} />
      <ChartLineLinear data={chartData} />
    </div>
  )
}

export default page
