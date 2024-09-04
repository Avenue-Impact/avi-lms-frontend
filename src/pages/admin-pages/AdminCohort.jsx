import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export function AdminCohort() {
  const [selectedOption, setSelectedOption] = React.useState("");

  // Function to handle the change event
  const handleChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="space-y-4">
      <Select className='p-0' onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Cohort" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          <SelectGroup>
            {/* <SelectLabel>Select Course</SelectLabel> */}
            <SelectItem value="january">January</SelectItem>
            <SelectItem value="february">February</SelectItem>
            <SelectItem value="march">March</SelectItem>
            <SelectItem value="april">April</SelectItem>
            <SelectItem value="May">May</SelectItem>
            <SelectItem value="June">June</SelectItem>
            <SelectItem value="july">July</SelectItem>
            <SelectItem value="august">August</SelectItem>
            <SelectItem value="september">September</SelectItem>
            <SelectItem value="october">October</SelectItem>
            <SelectItem value="november">November</SelectItem>
            <SelectItem value="december">December</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Display the selected option */}
      {selectedOption && (
        <div className="mt-4">
          <p className="text-[#CC1747] capitalize">
            <FontAwesomeIcon icon={faCheck} className="text-[#CC1747] mr-2" />
            {selectedOption}
          </p>
        </div>
      )}
    </div>
  );
}
