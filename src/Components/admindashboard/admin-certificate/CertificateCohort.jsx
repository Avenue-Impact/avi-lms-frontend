// DashSelect.jsx

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export function CertificateCohort() {
  return (
    <Select className='p-0'>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Cohort" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectGroup>
          {/* <SelectLabel>Select Course</SelectLabel> */}
          <SelectItem value="mc">May Cohort 2024</SelectItem>
          <SelectItem value="cc">June Cohort 2024</SelectItem>
          <SelectItem value="ipc">October Cohort 2024</SelectItem>
          <SelectItem value="jan">January Cohort 2025</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}