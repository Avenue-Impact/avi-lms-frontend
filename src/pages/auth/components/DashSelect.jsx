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
