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

export function PreviewVideoSelect() {
  return (
    <Select className='p-0'>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Cohort" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectGroup>
          {/* <SelectLabel>Select Course</SelectLabel> */}
          <SelectItem value="mc">May Cohort</SelectItem>
          <SelectItem value="cc">June Cohort</SelectItem>
          <SelectItem value="ipc">October</SelectItem>
          <SelectItem value="jan">January</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}



function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="All courses" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectGroup>
          <SelectLabel>Select Course</SelectLabel>
          <SelectItem value="ac">All courses</SelectItem>
          <SelectItem value="cc">Completed courses</SelectItem>
          <SelectItem value="ipc">In progress courses</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectScrollable;
