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
      <Select className="p-0" onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Cohort" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          <SelectGroup>
            {/* <SelectLabel>Select Course</SelectLabel> */}
            <SelectItem value="august-cohort-2024">
              August 2024 Cohort
            </SelectItem>
            <SelectItem value="september-cohort-2024">
              September 2024 Cohort
            </SelectItem>
            <SelectItem value="october-cohort-2024">
              October 2024 Cohort
            </SelectItem>
            <SelectItem value="november-cohort-2024">
              November 2024 Cohort
            </SelectItem>
            <SelectItem value="december-cohort-2024">
              December 2024 Cohort
            </SelectItem>

            <SelectItem value="january-cohort-2025">
              January 2025 Cohort
            </SelectItem>
            <SelectItem value="february-cohort-2025">
              February 2025 Cohort
            </SelectItem>
            <SelectItem value="march-cohort-2025">March 2025 Cohort</SelectItem>
            <SelectItem value="april-cohort-2025">April 2025 Cohort</SelectItem>
            <SelectItem value="May-cohort-2025">May 2025 Cohort</SelectItem>
            <SelectItem value="June-cohort-2025">June 2025 Cohort</SelectItem>
            <SelectItem value="july-cohort-2025">July 2025 Cohort</SelectItem>
            <SelectItem value="august-cohort-2025">
              August 2025 Cohort
            </SelectItem>
            <SelectItem value="september-cohort-2025">
              September 2025 Cohort
            </SelectItem>
            <SelectItem value="october-cohort-2025">
              October 2025 Cohort
            </SelectItem>
            <SelectItem value="november-cohort-2025">
              November 2025 Cohort
            </SelectItem>
            <SelectItem value="december-cohort-2025">
              December 2025 Cohort
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Display the selected option */}
      {selectedOption && (
        <div className="mt-4">
          <p className="capitalize text-[#CC1747]">
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-[#CC1747]" />
            {selectedOption}
          </p>
        </div>
      )}
    </div>
  );
}
