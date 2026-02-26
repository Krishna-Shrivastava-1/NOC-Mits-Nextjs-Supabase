// 'use client'
// import React, { useEffect, useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// const NocFormSelect = ({arr,stateCapture,placeholder,id,defaultState=""}) => {
//     const [value, setvalue] = useState(defaultState||"")
//       useEffect(() => {
//     if (defaultState !== undefined && defaultState !== null) {
//       setvalue(defaultState)
//     }
//   }, [defaultState,value])
//     useEffect(() => {
//      if(typeof stateCapture === "function"){
//         stateCapture(value)
//      }
//     }, [value])
    
//   return (
//     <div>
//       <Select  value={value} onValueChange={setvalue}>
//   <SelectTrigger id={id} className="w-[150px]">
//     <SelectValue placeholder={placeholder} />
//   </SelectTrigger>
//   <SelectContent position='popper'>
//     <SelectGroup>
//         {
//             arr?.map((e,id)=>(
// <SelectItem key={id} value={e?.toString()}>{e?.toString()}</SelectItem>
//             ))
//         }

//     </SelectGroup>
//   </SelectContent>
// </Select>
//     </div>
//   )
// }

// export default NocFormSelect




'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const NocFormSelect = ({ arr, stateCapture, placeholder, id, defaultState }) => {
  
  // 1. Ensure the value is always a string or undefined (never null/0)
  const safeValue = defaultState?.toString() || undefined;

  return (
    <div>
      {/* 2. Adding a key={safeValue} forces the component to 
          re-render properly if the parent state resets or loads late */}
      <Select 
        key={safeValue} 
        value={safeValue} 
        onValueChange={(val) => stateCapture?.(val)}
      >
        <SelectTrigger id={id} className="w-[150px]">
          {/* 3. Explicitly check if we have a value to show */}
          <SelectValue placeholder={placeholder}>
            {safeValue} 
          </SelectValue>
        </SelectTrigger>
        
        <SelectContent position='popper'>
          <SelectGroup>
            {arr?.map((e, index) => {
              const itemValue = e?.toString();
              return (
                <SelectItem key={index} value={itemValue}>
                  {itemValue}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default NocFormSelect