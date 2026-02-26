
import { Tabs } from "./ui/tabs";
import TeacherForm from "./TeacherForm";
import StudentForm from "./StudentForm";

export function TabsSwitcherAccounts() {

  const tabs = [
    {
      title: "Teacher",
      value: "teacher",
      content: (
         <div><TeacherForm  /></div>
      ),
    },
    {
      title: "Student",
      value: "student",
      content: (
        <div> <StudentForm  /> </div>
      ),
    }
  ];



  return (
    <div
      className="w-lg">
      <Tabs  tabs={tabs} />
    </div>
  );
}

