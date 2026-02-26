import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useEffect, useState } from "react";
const departments = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Electrical & Electronics Engineering",
  "Civil Engineering",
  "Information Technology",
  "Applied Sciences & Humanities",
  "Management Studies",
  "Artificial Intelligence & Data Science",
];
const branch = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Electrical & Electronics Engineering",
  "Civil Engineering",
  "Information Technology",
  "Applied Sciences & Humanities",
  "Management Studies",
  "Artificial Intelligence & Data Science",
];

export function ComboBoxSelector({ context, stateCapture,prevDept }) {
  const [value, setValue] = useState(prevDept || "");

  // Sync when prevDept changes (important for dialog reuse)
  useEffect(() => {
    if (prevDept) {
      
      setValue(prevDept);
    }
  }, [prevDept]);


  // Send value back to parent
  // useEffect(() => {
  //   stateCapture(value);
  // }, [value]);
  useEffect(() => {
  if (typeof stateCapture === "function") {
    stateCapture(value);
  }
}, [value]);
  return (
    <Combobox
    
      value={value}
      onValueChange={setValue}
      items={context == "department" ? prevDept ? ['None',...departments] : departments : branch}
    >
      <ComboboxInput
        placeholder={
          context == "department" ? "Select a department" : "Select a branch"
        }
      />
      <ComboboxContent>
        {context == "department" ? (
          <ComboboxEmpty>No department found.</ComboboxEmpty>
        )
        :
    (
          <ComboboxEmpty>No branch found.</ComboboxEmpty>
        )

        }

        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
