// "use client"

// import * as React from "react"
// import { Calendar } from "@/components/ui/calendar"
// import { Card, CardContent } from "@/components/ui/card"
// import { format } from "date-fns"
// import { Field, FieldLabel } from "./ui/field"
// import { Input } from "./ui/input"

// export function CalendarRange({startdate,enddate,duration,setduration,defaultstartdate,defaultenddate}) {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   const nextYear = new Date(today)
//   nextYear.setFullYear(today.getFullYear() + 1)

//   const [dateRange, setDateRange] = React.useState({
//     from:defaultstartdate|| undefined,
//     to:defaultenddate|| undefined,
//   })
// React.useEffect(() => {
//   if(dateRange?.from){
//     startdate(defaultstartdate)
//   }
//   if(dateRange?.to){
//     enddate(defaultenddate)
//   }
// }, [defaultstartdate,defaultenddate])
// React.useEffect(() => {
//   if(dateRange?.from){
//     startdate(dateRange?.from)
//   }
//   if(dateRange?.to){
//     enddate(dateRange?.to)
//   }
// }, [dateRange])

//   return (
//     <div className="flex gap-6 items-start flex-wrap">
      
//       {/* Calendar */}
//       <Card className="p-0">
//         <CardContent className="p-0">
//           <Calendar
//             mode="range"
//             defaultMonth={today}
//             selected={dateRange}
//             onSelect={setDateRange}
//             numberOfMonths={2}
//             disabled={(date) =>
//               date < today || date > nextYear
//             }
//           />
//         </CardContent>
//       </Card>

//       {/* Selected Dates Panel */}
//       <Card className="p-4 min-w-[250px]">
//         <h3 className="font-semibold mb-4">Selected Internship Duration</h3>

//         <div className="space-y-3">
//           <div>
//             <p className="text-sm text-muted-foreground">Start Date</p>
//             <p className="font-medium">
//               {dateRange?.from
//                 ? format(dateRange.from, "PPP")
//                 : "Not selected"}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">End Date</p>
//             <p className="font-medium">
//               {dateRange?.to
//                 ? format(dateRange.to, "PPP")
//                 : "Not selected"}
//             </p>
//           </div>
         

//         </div>
//         <Field>
//                         <FieldLabel htmlFor="duration">Duration (in days)</FieldLabel>
//                         <Input
//                           id="duration"
//                           type="number"
//                           placeholder="90"
//                           value={duration}
//                           onChange={(e) => setduration(e.target.value)}
//                           required
//                         />
//                       </Field>
//       </Card>

//     </div>
//   )
// }



'use client'

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { format, differenceInDays, isSameDay } from "date-fns" 
import { Field, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"

export function CalendarRange({startdate, enddate, duration, setduration, defaultstartdate, defaultenddate}) {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const nextYear = React.useMemo(() => {
    const d = new Date(today);
    d.setFullYear(today.getFullYear() + 1);
    return d;
  }, [today]);

  const [dateRange, setDateRange] = React.useState({
    from: defaultstartdate || undefined,
    to: defaultenddate || undefined,
  })

  // 1. Sync from Prop to State ONLY if values actually differ
  React.useEffect(() => {
    const isFromChanged = !isSameDay(dateRange?.from, defaultstartdate);
    const isToChanged = !isSameDay(dateRange?.to, defaultenddate);

    if (isFromChanged || isToChanged) {
      setDateRange({
        from: defaultstartdate || undefined,
        to: defaultenddate || undefined,
      });
    }
  }, [defaultstartdate, defaultenddate]); // Don't include dateRange here!

  // 2. Handle User Interaction
  const handleSelect = (range) => {
    setDateRange(range);
    
    // Notify parent immediately instead of using a useEffect
    if (range?.from) startdate(range.from);
    if (range?.to) {
        enddate(range.to);
        const days = differenceInDays(range.to, range.from);
        setduration(days.toString());
    }
  };


  return (
    <div className="flex gap-6 items-start flex-wrap">
      <Card className="p-0">
        <CardContent className="p-0">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from || today}
            selected={dateRange}
            onSelect={handleSelect} // Use the wrapper function
            numberOfMonths={2}
            disabled={(date) => date < today || date > nextYear}
          />
        </CardContent>
      </Card>

      <Card className="p-4 min-w-[250px]">
        <h3 className="font-semibold mb-4">Selected Internship Duration</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="font-medium">
              {dateRange?.from ? format(dateRange.from, "PPP") : "Not selected"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">End Date</p>
            <p className="font-medium">
              {dateRange?.to ? format(dateRange.to, "PPP") : "Not selected"}
            </p>
          </div>
        </div>
        <Field className="mt-4">
          <FieldLabel htmlFor="duration">Duration (in days)</FieldLabel>
          <Input
            id="duration"
            type="number"
            placeholder="90"
            value={duration}
            onChange={(e) => setduration(e.target.value)}
            required
          />
        </Field>
      </Card>
    </div>
  )
}