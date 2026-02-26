'use client'
import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ComboBoxSelector } from './ComboBoxSelector'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
const ComboBoxWithPopOver = ({prevDept,teacherId}) => {
    const [coordinateDept, setcoordinateDept] = useState("")
    const [open, setOpen] = useState(false);
const router = useRouter()
    // console.log(coordinateDept)
    const handleSave = async () => {
  if (!teacherId) return;

  const finalDept = coordinateDept === "None" ? null : coordinateDept;

  const { error } = await supabase
    .from("users")
    .update({ departmentcoordinator: finalDept ,coordinator:coordinateDept=== null?false:true })
    .eq("id", teacherId);

  if (error) {
    console.error(error.message);
    setOpen(false);
if (error.message?.split(" ")[0] === "duplicate") {
  toast.error("Cannot provide assigned department to other faculty")
}else{
  toast.error("Failed to update department");
}
  } else {
    setOpen(false);
    toast.success("Department updated successfully");
    router.refresh()
  }
};

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Edit</PopoverTitle>
      <PopoverDescription>Select Department for teacher to coordinate.</PopoverDescription>
    </PopoverHeader>
<ComboBoxSelector   prevDept={prevDept}
                    id="department"
                    context={"department"}
                    stateCapture={setcoordinateDept}
                     />
                    <Button onClick={handleSave}>Save</Button>
  </PopoverContent>
</Popover>
    </div>
  )
}

export default ComboBoxWithPopOver
