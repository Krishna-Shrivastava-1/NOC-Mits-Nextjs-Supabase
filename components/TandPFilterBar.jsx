"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useState } from "react";

const TandPFilterBar = ({showFilterByTandP=false}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pendingFilters, setPendingFilters] = useState(
    new URLSearchParams(searchParams.toString()),
  );

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(pendingFilters.toString());
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setPendingFilters(newParams); // Update local state, not the URL yet
  };

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
  const sessionyeararr = [];
  const date = new Date().getFullYear();
  for (let i = date - 2; i <= date; i++) {
    sessionyeararr.push(i);
  }
  const applyFilter = () => {
    router.replace(`?${pendingFilters.toString()}`);
  };

  return (
    <div className="flex gap-4 mb-2 justify-end">
      <Select
        value={pendingFilters.get("department") || "all"}
        onValueChange={(val) => updateFilter("department", val)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">All Departments</SelectItem>
          {departments?.map((e, id) => (
            <SelectItem key={id} value={e}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={pendingFilters.get("semester") || "all"}
        onValueChange={(val) => updateFilter("semester", val)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semester" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">All Semesters</SelectItem>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="6">6</SelectItem>
          <SelectItem value="7">7</SelectItem>
          <SelectItem value="8">8</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={pendingFilters.get("yearofstudy") || "all"}
        onValueChange={(val) => updateFilter("yearofstudy", val)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Year of Study" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">All Years of Study</SelectItem>
          {[1, 2, 3, 4]?.map((e, id) => (
            <SelectItem key={id} value={e?.toString()}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={pendingFilters.get("sessionyear") || "all"}
        onValueChange={(val) => updateFilter("sessionyear", val)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Session Years" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">All Session Years</SelectItem>
          {sessionyeararr?.map((e, id) => (
            <SelectItem key={id} value={e?.toString()}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {
        showFilterByTandP &&
         <Select
        value={pendingFilters.get("nocstatustandp") || "all"}
        onValueChange={(val) => updateFilter("nocstatustandp", val)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">All</SelectItem>
          {['approved','rejected']?.map((e, id) => (
            <SelectItem key={id} value={e?.toString()}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      }
     
      <Button onClick={applyFilter}>Apply Filter</Button>
    </div>
  );
};

export default TandPFilterBar;
