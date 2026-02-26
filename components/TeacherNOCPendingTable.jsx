import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { createClient } from '@/lib/supabase/server'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { format } from 'date-fns'
import NOCTeacherActionsDialoge from './NOCTeacherActionsDialoge'
const TeacherNOCPendingTable = async ({columnsName,data,toShowAction=true,tandpAction=false}) => {
    //  const supabase = await createClient()
    //    const { data, error } = await supabase
    //   .from("noc_requests")
    //   .select(`
    //     *,
    //     users (
    //       name,
    //       rollnum
    //     )
    //   `)
    //   .order("createdat", { ascending: false }).eq('nocstatusdepartment','pending')
        //  console.log(data)
  return (
       <div>
        <Table className='rounded-md'>
      <TableHeader className='bg-card'>
        <TableRow>
          {
            columnsName?.map((e,id)=>(
              <TableHead key={id}>{e}</TableHead>
            ))
          }
          {/* <TableHead>Sr No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Coordinator of Department</TableHead> */}
          {/* <TableHead>Status</TableHead> */}
          {/* <TableHead className="text-right">Actions</TableHead> */}
        </TableRow>
      </TableHeader>
   

     
  <TableBody>
         {!data || data.length === 0 ?
 <TableRow>
    {/* colSpan should match the total number of columns in your header */}
    <TableCell colSpan={10} className="h-24 text-center">
      <p className="text-muted-foreground">No Data here</p>
    </TableCell>
  </TableRow>
         :
             data?.map((e,id)=>(
 <TableRow key={id}>
           <TableCell className="font-medium">{id+1}.</TableCell>
           <TableCell className="font-medium">{e?.users?.name}</TableCell>
           <TableCell className="font-medium">{e?.users?.rollnum}</TableCell>
           {
            tandpAction&&
           <TableCell className="font-medium">{e?.department}</TableCell>
           }
           <TableCell className="font-medium">{e?.companyname}</TableCell>
           <TableCell><Badge className={
                e.nocstatusdepartment === "approved"
                  ? "bg-green-100 text-green-700"
                  : e.nocstatusdepartment === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              } variant='secondary'>{e.nocstatusdepartment}</Badge></TableCell>
           <TableCell><Badge className={
                e.nocstatustandp === "approved"
                  ? "bg-green-100 text-green-700"
                  : e.nocstatustandp === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              } variant='secondary'>{e.nocstatustandp}</Badge></TableCell>
           <TableCell>{format(new Date(e.createdat), "dd MMM yyyy")}</TableCell>
           <TableCell>{e?.comment ? e?.comment : 'No Comments'}</TableCell>
           {
            toShowAction &&
           <TableCell>
            <NOCTeacherActionsDialoge isTandP={tandpAction} currentStatus={tandpAction ? e?.nocstatustandp :e.nocstatusdepartment} applicationId={e?.id}/>
           </TableCell>
           }
           {/* <TableCell>{e.coordinator ? <p className="text-green-600 font-bold">Active</p> : <p className="text-red-600 font-bold">Not Active</p>}</TableCell> */}
          <TableCell className="">
       <Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">More</Button>
  </SheetTrigger>

  <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
    <SheetHeader>
      <SheetTitle>NOC Application Details</SheetTitle>
      <SheetDescription>
        Complete overview of your NOC application
      </SheetDescription>
    </SheetHeader>

    <div className="mt-3 space-y-8 text-sm p-3 mb-8">

      {/* Company Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Company Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-xs">Company Name</p>
            <p className="font-medium">{e.companyname}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">Location</p>
            <p className="font-medium">{e.location}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">Role</p>
            <p className="font-medium">{e.roleincompany}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">Work Type</p>
            <p className="font-medium capitalize">{e.worktype}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">Duration</p>
            <p className="font-medium">{e.duration} days</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">Stipend</p>
            <p className="font-medium">₹ {e.stipend}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Internship Timeline</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-xs">Start Date</p>
            <p className="font-medium">{e.startdate}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">End Date</p>
            <p className="font-medium">{e.enddate}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">Session</p>
            <p className="font-medium">
              {e.sessionhalf} {e.sessionyear}
            </p>
          </div>
        </div>
      </div>

      {/* Academic Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Academic Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-xs">Year of Study</p>
            <p className="font-medium">{e.yearofstudy}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">Semester</p>
            <p className="font-medium">{e.semester}</p>
          </div>
        </div>
      </div>

      {/* Receiver */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Company Receiver</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-xs">Receiver Name</p>
            <p className="font-medium">{e.companyrecievername}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">Designation</p>
            <p className="font-medium">{e.companyrecieverdesignation}</p>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {e.jobdescription}
        </p>
      </div>

      {/* Offer Letter */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Offer Letter</h3>
        <a
          href={e.offerletteruri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Uploaded PDF
        </a>
      </div>

      {/* Status */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Approval Status</h3>

        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-muted-foreground text-xs">Department</p>
            <Badge
              className={
                e.nocstatusdepartment === "approved"
                  ? "bg-green-100 text-green-700"
                  : e.nocstatusdepartment === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            >
              {e.nocstatusdepartment}
            </Badge>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">T&P Cell</p>
            <Badge
              className={
                e.nocstatustandp === "approved"
                  ? "bg-green-100 text-green-700"
                  : e.nocstatustandp === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            >
              {e.nocstatustandp}
            </Badge>
          </div>
        </div>
      </div>

    </div>
  </SheetContent>
</Sheet>
           </TableCell>
           </TableRow>
          
             ))
         }
       
      </TableBody>

    </Table>
    </div>
  )
}

export default TeacherNOCPendingTable
