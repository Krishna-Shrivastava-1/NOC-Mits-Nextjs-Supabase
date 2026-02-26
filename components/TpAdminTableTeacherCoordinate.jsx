import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClient } from "@/lib/supabase/server"
import { MoreHorizontalIcon } from "lucide-react"

import ComboBoxWithPopOver from "./ComboBoxWithPopOver"

export async function TpAdminTableTeacherCoordinate() {
    const supabase  = await createClient()
   const {data,error} =await  supabase.from("users")
  .select("id, name, department,departmentcoordinator,coordinator")
  .eq("role", "teacher")
  // console.log(data[0])
  return (
    <Table className='rounded-md'>
      <TableHeader className='bg-card'>
        <TableRow>
          <TableHead>Sr No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Coordinator of Department</TableHead>
          {/* <TableHead>Status</TableHead> */}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
            data?.map((e,id)=>(
<TableRow key={id}>
          <TableCell className="font-medium">{id+1}.</TableCell>
          <TableCell className="font-medium">{e?.name}</TableCell>
          <TableCell>{e.department}</TableCell>
          <TableCell>{e.departmentcoordinator ? e.departmentcoordinator : 'None'}</TableCell>
          {/* <TableCell>{e.coordinator ? <p className="text-green-600 font-bold">Active</p> : <p className="text-red-600 font-bold">Not Active</p>}</TableCell> */}
          <TableCell className="text-right">
            <ComboBoxWithPopOver teacherId={e?.id}  prevDept={e.departmentcoordinator} />
        
          </TableCell>
          </TableRow>
          
            ))
        }
       
      </TableBody>
    </Table>
  )
}




    {/*  */}