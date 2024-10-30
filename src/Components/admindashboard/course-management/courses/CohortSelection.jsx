import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const CohortSelection = ({ data, setCohort, text }) => {
  return (
    <Select onValueChange={setCohort}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a cohort" />
      </SelectTrigger>
      <SelectContent className="pb-8 capitalize">
        <SelectGroup>
          <SelectLabel>{text}</SelectLabel>
          {data.map((singleCohort, i) => (
            <SelectItem
              key={i}
              value={`${singleCohort.month} ${singleCohort.year}`}
              className="capitalize text-[#8F8F8E] hover:accent-primary-color-600"
            >
              {`${singleCohort.month} ${singleCohort.year}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CohortSelection;
