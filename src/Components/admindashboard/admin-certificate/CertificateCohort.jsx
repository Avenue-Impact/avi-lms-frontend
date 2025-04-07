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

const CertificateCohort = ({ cohorts, isLoading, selectedCourseId, setSelectedCourseId }) => {
  console.log("The data under certificate issue", cohorts);

  return (
    <Select className="p-0" onValueChange={(value) => setSelectedCourseId(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={isLoading ? "" : "Select Cohort"} />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectGroup>
          {isLoading ? (
            <SelectItem disabled>Loading...</SelectItem>
          ) : cohorts?.data?.data?.length > 0 ? (
            cohorts.data?.data?.map((cohort) => (
              <SelectItem key={cohort.id} value={cohort.cohort}>
                {cohort.cohort}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled>No Cohorts Available</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CertificateCohort;
