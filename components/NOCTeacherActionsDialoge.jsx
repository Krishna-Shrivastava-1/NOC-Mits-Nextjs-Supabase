'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { toast } from "sonner"
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const NOCTeacherActionsDialoge = ({ currentStatus = "pending",applicationId,isTandP=false }) => {

  const [status, setStatus] = useState(currentStatus)
  const [comment, setComment] = useState("")
  const [allowEdit, setAllowEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
const router = useRouter()
  // 🔥 Sync allowEdit with status
  useEffect(() => {
    if (allowEdit) {
      setStatus("edit_requested")
    }
  }, [allowEdit])

  const handleApprove = () => {
    setAllowEdit(false)
    setStatus("approved")
  }

  const handleReject = () => {
    setAllowEdit(false)
    setStatus("rejected")
  }

  const handleSave = async () => {

    if (status === "edit_requested" && !comment.trim()) {
      toast.error("Comment is required when requesting edit")
      return
    }

    setIsLoading(true)

    try {
     if(isTandP){
       const {data,error} =    await supabase
        .from("noc_requests")
        .update({
        
          nocstatustandp:status,
        })
        .eq("id", applicationId)

        if (error) {
  console.log("Update error:", error)
} else {
  console.log("Updated row:", data)
}
//   console.log(data)
     }else{
       const {data,error} =    await supabase
            .from("noc_requests")
            .update({
              nocstatusdepartment: status,
              comment: status === "edit_requested" ? comment : comment || null,
              allowededit: status === "edit_requested",
              nocstatustandp:status === "rejected" ? "rejected" : "pending",
            })
            .eq("id", applicationId)
    
            if (error) {
      console.log("Update error:", error)
    } else {
      console.log("Updated row:", data)
    }

    //   console.log(data)
     }

      toast.success("Decision saved successfully")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const getBadgeVariant = () => {
    switch (status) {
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      case "edit_requested":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold">Actions</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            NOC Application Action
          </DialogTitle>
          <DialogDescription>
            Review the application and take appropriate action.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">

          {/* Status Buttons */}
          <div>
            <Label className="mb-2 block font-semibold">Status</Label>

            <div className="flex gap-3">
              <Button
                variant={status === "approved" ? "default" : "outline"}
                className="flex-1"
                onClick={handleApprove}
              >
                Approve
              </Button>

              <Button
                variant={status === "rejected" ? "destructive" : "outline"}
                className="flex-1"
                onClick={handleReject}
              >
                Reject
              </Button>
            </div>

            <div className="mt-3">
              <Badge variant={getBadgeVariant()}>
                Current: {status.replace("_", " ")}
              </Badge>
            </div>
          </div>
          {
            !isTandP &&
<div>
  {/* Allow Edit Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Allow Student to Edit</Label>
              <p className="text-sm text-muted-foreground">
                Enable if student needs to update application.
              </p>
            </div>
            <Switch
              checked={allowEdit}
              onCheckedChange={setAllowEdit}
            />
          </div>

          {/* Comment */}
          <div>
            <Label className="font-semibold mb-2 block">
              Comment {status === "edit_requested" && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              placeholder={
                status === "edit_requested"
                  ? "Explain clearly what needs correction..."
                  : "Optional feedback..."
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
</div>
          }
          

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline">
              Cancel
            </Button>
            <Button
              className="font-bold"
              disabled={isLoading}
              onClick={handleSave}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NOCTeacherActionsDialoge