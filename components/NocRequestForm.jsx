
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs } from "./ui/tabs";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { ComboBoxSelector } from "./ComboBoxSelector";
import { toast } from "sonner";
import NocFormSelect from "./NocFormSelect";
import { CalendarRange } from "./CalendarRange";
import FileUpload from "./FileUpload";
import { Textarea } from "./ui/textarea";
import { supabase } from "@/lib/supabase";
import { uploadNocFile } from "@/lib/uploadNocFile";
const NocRequestForm = ({application =null}) => {
    const [companyName, setcompanyName] = useState("")
    const [yearOfStudy, setyearOfStudy] = useState('')
    const [semester, setsemester] = useState("")
    const [sessionhalf, setsessionhalf] = useState("")
    const [sessionyear, setsessionyear] = useState("")
    const [duration, setduration] = useState("")
    const [location, setlocation] = useState("")
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [stipend, setstipend] = useState("")
    const [worktype, setworktype] = useState("")
    const [jobrole, setjobrole] = useState("")
    const [jobdescription, setjobdescription] = useState("")
    const [companyrecievername, setcompanyrecievername] = useState("")
    const [companyrecieverdesignation, setcompanyrecieverdesignation] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [existingFilePath, setExistingFilePath] = useState(null)
    const [teacherComment, setteacherComment] = useState(null)

const [isLoading, setIsLoading] = useState(false)

// console.log(application)
useEffect(() => {
  // console.log(application)
  if (application) {
    setcompanyName(application.companyname || "")
    setyearOfStudy(application.yearofstudy || "")
    setsemester(application.semester || "")
    setsessionhalf(application.sessionhalf || "")
    setsessionyear(application.sessionyear || "")
    setduration(application.duration || "")
    setlocation(application.location || "")
    setstartDate(application.startdate || "")
    setendDate(application.enddate || "")
    setstipend(application.stipend || "")
    setteacherComment(application?.comment || null)
     setExistingFilePath(application.offerletterurl) 
    setworktype(
      application.worktype
        ? application.worktype.charAt(0).toUpperCase() + application.worktype.slice(1)
        : ""
    )
    setjobrole(application.roleincompany || "")
    setjobdescription(application.jobdescription || "")
    setcompanyrecievername(application.companyrecievername || "")
    setcompanyrecieverdesignation(application.companyrecieverdesignation || "")
  }
}, [application])

    const yearofstudyarr = [1,2,3,4];
    const yearofsemesterarr = [1,2,3,4,5,6,7,8];
    const sessionhalfarr = ["Jan-Jun","Jul-Dec"];
    const worktypearr= ["Remote",'Onsite',"Hybrid"]
    const sessionyeararr =[];
    const date = new Date().getFullYear()
    for(let i=date -2;i <= date;i++ ){
        sessionyeararr.push(i);
    }
const resetForm = () => {
  setcompanyName('')
  setyearOfStudy('')
  setsemester('')
  setsessionhalf('')
  setsessionyear('')
  setduration('')
  setlocation('')
  setstartDate('')
  setendDate('')
  setstipend('')
  setworktype('')
  setjobrole('')
  setjobdescription('')
  setcompanyrecievername('')
  setcompanyrecieverdesignation('')
  setSelectedFile(null)
}
// const handleApplicationCreation=async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//         let fileUrl = null
// let userId
// let depatmentOfStudent
//     // 🔥 Upload file only when submitting
//     if (selectedFile) {
//       const { data: {user},error: authError } = await supabase.auth.getUser()
//        const dept = await supabase.from('users').select("department").eq('id',user.id).single()
//       if (authError || !user) {
//       throw new Error("Please log in first")
//     }

//        userId = user.id
//        depatmentOfStudent = dept?.data?.department
// // console.log(userId)
//       fileUrl = await uploadNocFile(selectedFile, userId,supabase)
//     }
// if (application) {
//   // 🔥 EDIT MODE
//   const { error } = await supabase
//     .from("noc_requests")
//     .update({
//       companyname: companyName,
//       yearofstudy: yearOfStudy,
//       semester,
//       sessionhalf,
//       sessionyear,
//       duration,
//       location,
//       startdate: startDate,
//       enddate: endDate,
//       stipend,
//       worktype: worktype.charAt(0).toLowerCase() + worktype.slice(1),
//       roleincompany: jobrole,
//       jobdescription,
//       companyrecievername,
//       companyrecieverdesignation,
//       offerletteruri: fileUrl ?? application.offerletteruri,

//       // 🔥 RESET WORKFLOW
//       nocstatusdepartment: "pending",
//       allowededit: false,
//     })
//     .eq("id", application.id)

//   if (error) throw error

//   toast.success("Application updated and resubmitted!")
// } else {
//   // 🔥 CREATE MODE
//   const { error } = await supabase
//     .from("noc_requests")
//     .insert({
//       student_id: userId,
//       companyname: companyName,
//       yearofstudy: yearOfStudy,
//       semester,
//       sessionhalf,
//       sessionyear,
//       duration,
//       location,
//       startdate: startDate,
//       enddate: endDate,
//       stipend,
//       worktype: worktype.charAt(0).toLowerCase() + worktype.slice(1),
//       roleincompany: jobrole,
//       jobdescription,
//       companyrecievername,
//       companyrecieverdesignation,
//       offerletteruri: fileUrl,
//       department: depatmentOfStudent
//     })

//   if (error) throw error

//   toast.success("Application submitted successfully!")
// }
//     resetForm()

//   } catch (error) {
//     console.error(error)
//     toast.error("Something went wrong")
//   } finally {
//     setIsLoading(false)
//   }
// }
function extractPathFromUrl(url) {
  if (!url) return null
  const parts = url.split("/noc-files/")
  return parts[1] || null
}
const handleApplicationCreation = async (e) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    // 1️⃣ Simple required check
if (
  !companyName ||
  !yearOfStudy ||
  !semester ||
  !sessionhalf ||
  !sessionyear ||
  !duration ||
  !location ||
  !startDate ||
  !endDate ||
  !stipend ||
  !worktype ||
  !jobrole ||
  !jobdescription ||
  !companyrecievername ||
  !companyrecieverdesignation
) {
  toast.error("Please fill all fields")
  setIsLoading(false)
  return
}
    const year = Number(yearOfStudy)
const sem = Number(semester)

if (
  (year === 1 && ![1, 2].includes(sem)) ||
  (year === 2 && ![3, 4].includes(sem)) ||
  (year === 3 && ![5, 6].includes(sem)) ||
  (year === 4 && ![7, 8].includes(sem))
) {
  toast.error("Semester does not match selected year")
  setIsLoading(false)
  return
}
if (new Date(startDate) >= new Date(endDate)) {
  toast.error("End date must be after start date")
  setIsLoading(false)
  return
}
    let fileData = null
    let userId
    let depatmentOfStudent

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error("Please log in first")
    }

    userId = user.id

    const dept = await supabase
      .from("users")
      .select("department")
      .eq("id", user.id)
      .single()

    depatmentOfStudent = dept?.data?.department

    // 🔥 If new file selected
    if (selectedFile) {

      // 🗑 DELETE OLD FILE (EDIT MODE ONLY)
      if (application?.offerletteruri) {
        const oldPath = extractPathFromUrl(application.offerletteruri)

        if (oldPath) {
          await supabase.storage
            .from("noc-files")
            .remove([oldPath])
        }
      }

      // ⬆ Upload new file
      fileData = await uploadNocFile(selectedFile, userId, supabase)
    }

    if (application) {
      //  EDIT MODE
      const { error } = await supabase
        .from("noc_requests")
        .update({
          companyname: companyName,
          yearofstudy: yearOfStudy,
          semester,
          sessionhalf,
          sessionyear,
          duration,
          location,
          startdate: startDate,
          enddate: endDate,
          stipend,
          worktype: worktype.charAt(0).toLowerCase() + worktype.slice(1),
          roleincompany: jobrole,
          jobdescription,
          companyrecievername,
          companyrecieverdesignation,

          offerletteruri: fileData?.publicUrl ?? application.offerletteruri,

          nocstatusdepartment: "pending",
          allowededit: false,
        })
        .eq("id", application.id)

      if (error) throw error

      toast.success("Application updated and resubmitted!")
    } else {
      //  CREATE MODE
      if (!fileData) {
        throw new Error("Offer letter required")
      }

      const { error } = await supabase
        .from("noc_requests")
        .insert({
          student_id: userId,
          companyname: companyName,
          yearofstudy: yearOfStudy,
          semester,
          sessionhalf,
          sessionyear,
          duration,
          location,
          startdate: startDate,
          enddate: endDate,
          stipend,
          worktype: worktype.charAt(0).toLowerCase() + worktype.slice(1),
          roleincompany: jobrole,
          jobdescription,
          companyrecievername,
          companyrecieverdesignation,
          offerletteruri: fileData.publicUrl,
          department: depatmentOfStudent,
        })

      if (error) throw error

      toast.success("Application submitted successfully!")
    }

    resetForm()

  } catch (error) {
    console.error(error)
    toast.error("Something went wrong")
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-4xl">
        <CardHeader>
          <CardTitle>{application ? 'Update Application' : 'NOC Request Application'}</CardTitle>
          <CardDescription>{application ? 'Edit NOC Application' :'Create NOC Request'}</CardDescription>
        </CardHeader>
        <CardContent>
       {
  application && teacherComment && (
    <div className="mb-4 rounded-lg border bg-muted p-4 relative">
      <div className="absolute left-0 top-0 h-full w-1 bg-amber-500 rounded-l-lg" />
      <h2 className="font-semibold mb-1 ml-3">
        Teacher Comment
      </h2>
      <p className="text-sm text-muted-foreground ml-3">
        {teacherComment}
      </p>
    </div>
  )
}
          <form  >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Company Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Company Name"
                  value={companyName}
                  onChange={(e) => setcompanyName(e.target.value)}
                  required
                />
              </Field>
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
>
              <Field>
                <FieldLabel htmlFor="yearstudy">Year of Study</FieldLabel>
                <NocFormSelect id='yearstudy' placeholder={"Select year of study"} arr={yearofstudyarr} stateCapture={setyearOfStudy} defaultState={yearOfStudy} />
              </Field>
              <Field>
                <FieldLabel htmlFor="semesterstudy">Semester</FieldLabel>
                <NocFormSelect id='semesterstudy' placeholder={"Select semester"} arr={yearofsemesterarr} stateCapture={setsemester} defaultState={semester} />
              </Field>
              <Field>
                <FieldLabel htmlFor="sessionhalf">Session Half</FieldLabel>
                <NocFormSelect id='sessionhalf' placeholder={"Select session half"} arr={sessionhalfarr} stateCapture={setsessionhalf} defaultState={sessionhalf} />
              </Field>
              <Field>
                <FieldLabel htmlFor="sessionyear">Session Year</FieldLabel>
                <NocFormSelect id='sessionyear' placeholder={"Select session year"} arr={sessionyeararr} stateCapture={setsessionyear} defaultState={sessionyear} />
              </Field>

</div>
              

              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  type="text"
                  placeholder="xyz address ,Banglore, Karnataka"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  required
                />
              </Field>
              
                <Field>
                  <FieldLabel htmlFor="startandenddate">Select Start and End Date</FieldLabel>
                  <div className="w-sm">
                 <CalendarRange defaultstartdate={startDate} defaultenddate={endDate} startdate={setstartDate} enddate={setendDate}duration={duration} setduration={setduration} />

                  </div>
                </Field>
                
                <div className="w-full flex items-center gap-x-3">
<Field>
                  <FieldLabel htmlFor="stipend">Stipend (in rs.)</FieldLabel>
                   <Input
                  id="stipend"
                  type="number"
                  placeholder="20,000"
                  value={stipend}
                  onChange={(e) => setstipend(e.target.value)}
                  required
                />
                </Field>
                  <Field>
                <FieldLabel htmlFor="worktype">Select Work Type</FieldLabel>
                <NocFormSelect id='worktype' placeholder={"Select Work Type"} arr={worktypearr} defaultState={worktype} stateCapture={setworktype} />
              </Field>
              </div>
                  <Field>
                <FieldLabel htmlFor="fileupload">Select Offer Letter</FieldLabel>
                <FileUpload existingFileUrl={application?.offerletteruri} onFileSelect={setSelectedFile} />
              </Field>
               <Field>
                <FieldLabel htmlFor="jobrole">Job Role</FieldLabel>
                <Input
                  id="jobrole"
                  type="text"
                  placeholder="AI/ML Engineer"
                  value={jobrole}
                  onChange={(e) => setjobrole(e.target.value)}
                  required
                />
              </Field>
               <Field>
                <FieldLabel htmlFor="jobdescr">Job Description</FieldLabel>
                <Textarea
                  id="jobdescr"
                  type="text"
                  placeholder="Tell us something about your job..."
                  value={jobdescription}
                  onChange={(e) => setjobdescription(e.target.value)}
                  required
                />
              </Field>
               <Field>
                <FieldLabel htmlFor="recivname">Reciever Name</FieldLabel>
                <p className="text-[#FF6166] font-semibold">Note: That Person name who is want to check NOC certificate from your Company</p>
                <Input
                  id="recivname"
                  type="text"
                  placeholder="Name of person"
                  value={companyrecievername}
                  onChange={(e) => setcompanyrecievername(e.target.value)}
                  required
                />
              </Field>
               <Field>
                <FieldLabel htmlFor="designame">Reciever Designation</FieldLabel>
                <p className="text-[#FF6166] font-semibold">Note: That Person designation who is want to check NOC certificate from your Company</p>
                <Input
                  id="designame"
                  type="text"
                  placeholder="Person Designation"
                  value={companyrecieverdesignation}
                  onChange={(e) => setcompanyrecieverdesignation(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button
                onClick={handleApplicationCreation}
                  type="submit"
                  className="w-full cursor-pointer font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting" : "Submit Application"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        {/* <CardFooter>
    <Button>Create Teacher</Button>
  </CardFooter> */}
      </Card>
    </div>
  )
}

export default NocRequestForm
