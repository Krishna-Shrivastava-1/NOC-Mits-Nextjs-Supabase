import React from 'react'
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, Clock, FilePenLine, Send, XCircle } from 'lucide-react'
import CountUp from './CountUp'
const DashCards = ({
  approved=0,
  rejected=0,
  editRequested=0,
  pending=0,
  waitingTandP=0
}) => {
  return (
    //  <div className="flex items-center justify-around w-full gap-4 p-3 flex-wrap">
    //   <Card className="w-[250px]">
    //     <CardHeader>
    //       <CardDescription>Total Revenue</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         $1,250.00
    //       </CardTitle>
    //       <CardAction>
    //         <Badge variant="outline">
    //           <IconTrendingUp />
    //           +12.5%
    //         </Badge>
    //       </CardAction>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="line-clamp-1 flex gap-2 font-medium">
    //         Trending up this month <IconTrendingUp className="size-4" />
    //       </div>
    //       <div className="text-muted-foreground">
    //         Visitors for the last 6 months
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="w-[250px]">
    //     <CardHeader>
    //       <CardDescription>New Customers</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         1,234
    //       </CardTitle>
    //       <CardAction>
    //         <Badge variant="outline">
    //           <IconTrendingDown />
    //           -20%
    //         </Badge>
    //       </CardAction>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="line-clamp-1 flex gap-2 font-medium">
    //         Down 20% this period <IconTrendingDown className="size-4" />
    //       </div>
    //       <div className="text-muted-foreground">
    //         Acquisition needs attention
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="w-[250px]">
    //     <CardHeader>
    //       <CardDescription>Active Accounts</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         45,678
    //       </CardTitle>
    //       <CardAction>
    //         <Badge variant="outline">
    //           <IconTrendingUp />
    //           +12.5%
    //         </Badge>
    //       </CardAction>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="line-clamp-1 flex gap-2 font-medium">
    //         Strong user retention <IconTrendingUp className="size-4" />
    //       </div>
    //       <div className="text-muted-foreground">Engagement exceed targets</div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="w-[250px]">
    //     <CardHeader>
    //       <CardDescription>Growth Rate</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         4.5%
    //       </CardTitle>
    //       <CardAction>
    //         <Badge variant="outline">
    //           <IconTrendingUp />
    //           +4.5%
    //         </Badge>
    //       </CardAction>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="line-clamp-1 flex gap-2 font-medium">
    //         Steady performance increase <IconTrendingUp className="size-4" />
    //       </div>
    //       <div className="text-muted-foreground">Meets growth projections</div>
    //     </CardFooter>
    //   </Card>
    // </div>
   <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

  {/* Approved */}
  <Card className="group  relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-2 border-dashed border-green-500 bg-green-600/20">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription className="dark:text-green-300 text-green-800 font-medium">
          Approved
        </CardDescription>
        <CardTitle className="text-3xl font-bold mt-1">
          {approved}
        </CardTitle>
      </div>
      <div className="p-3 rounded-full bg-green-100 group-hover:scale-110 transition">
        <CheckCircle className="text-green-600" />
      </div>
    </CardHeader>
  </Card>

  {/* Rejected */}
  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-2 border-dashed border-red-500 bg-red-600/20">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription className="dark:text-red-300 text-red-800 font-medium">
          Rejected
        </CardDescription>
        <CardTitle className="text-3xl font-bold mt-1">
          {rejected}
        </CardTitle>
      </div>
      <div className="p-3 rounded-full bg-red-100 group-hover:scale-110 transition">
        <XCircle className="text-red-600" />
      </div>
    </CardHeader>
  </Card>

  {/* Edit Requested */}
  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-2 border-dashed border-yellow-500 bg-yellow-600/20">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription className="dark:text-yellow-300 text-yellow-800 font-medium">
          Edit Requested
        </CardDescription>
        <CardTitle className="text-3xl font-bold mt-1">
          {editRequested}
        </CardTitle>
      </div>
      <div className="p-3 rounded-full bg-yellow-100 group-hover:scale-110 transition">
        <FilePenLine className="text-yellow-600" />
      </div>
    </CardHeader>
  </Card>

  {/* Pending */}
  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-2 border-dashed border-blue-500 bg-blue-600/20">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription className="dark:text-blue-300 text-blue-800 font-medium">
          Pending Review
        </CardDescription>
        <CardTitle className="text-3xl font-bold mt-1">
          {pending}
        </CardTitle>
      </div>
      <div className="p-3 rounded-full bg-blue-100 group-hover:scale-110 transition">
        <Clock className="text-blue-600" />
      </div>
    </CardHeader>
  </Card>

  {/* Waiting T&P */}
  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-2 border-dashed border-purple-500 bg-purple-600/20">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription className="dark:text-purple-300 text-purple-800 font-medium">
          Waiting T&P
        </CardDescription>
        <CardTitle className="text-3xl font-bold mt-1">
          {waitingTandP}
        </CardTitle>
      </div>
      <div className="p-3 rounded-full bg-purple-100 group-hover:scale-110 transition">
        <Send className="text-purple-600" />
      </div>
    </CardHeader>
  </Card>

</div>
  )
}

export default DashCards
