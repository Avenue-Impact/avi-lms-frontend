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

export function AdminDuration() {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  // Function to handle the change event
  const handleChange = (value) => {
    if (value === "selectDuration") {
      // Clear all other selections if "Select Duration" is chosen
      setSelectedOptions(["selectDuration"]);
    } else {
      // Toggle selection for multiple options, except "Select Duration"
      setSelectedOptions((prevSelectedOptions) => {
        // If "Select Duration" is selected, clear it
        if (prevSelectedOptions.includes("selectDuration")) {
          prevSelectedOptions = [];
        }

        if (prevSelectedOptions.includes(value)) {
          return prevSelectedOptions.filter((option) => option !== value);
        } else {
          return [...prevSelectedOptions, value];
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <Select className='p-0' onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          <SelectGroup>
            <SelectItem value="selectDuration">Select Duration</SelectItem>
            <SelectItem value="oneMonthAccess">One Month Access</SelectItem>
            <SelectItem value="threeMonthsAccess">3 Months Access</SelectItem>
            <SelectItem value="fourMonthsAccess">6 Months Access</SelectItem>
            <SelectItem value="AnnualYearlySubscription">Annual Yearly Subscription - £600</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Display the selected options, but don't show "Select Duration" */}
      {selectedOptions.length > 0 && selectedOptions[0] !== "selectDuration" && (
        <div className="mt-4 space-y-2">
          {selectedOptions.map((option) => (
            <p key={option} className="text-[#CC1747] capitalize">
              <FontAwesomeIcon icon={faCheck} className="text-[#CC1747] mr-2" />
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
