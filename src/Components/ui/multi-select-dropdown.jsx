import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/Components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";

export function MultiSelectDropdown({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select options...",
  label = "Select",
}) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((o) => o.value));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 border-gray-300"
        >
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="p-2 border-b">
          <div className="flex items-center px-3 border rounded-md">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder={`Search ${label}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 px-0 h-9"
            />
          </div>
        </div>
        <div className="max-h-[200px] overflow-y-auto p-2 bg-white">
            {filteredOptions.length === 0 ? (
                <p className="text-sm text-center py-2 text-muted-foreground">No results found.</p>
            ) : (
                <div className="space-y-1">
                    <div
                        className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded cursor-pointer"
                        onClick={handleSelectAll}
                    >
                        <Checkbox 
                            checked={selectedValues.length === options.length && options.length > 0}
                            id="select-all"
                        />
                         <label
                            htmlFor="select-all"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Select All
                        </label>
                    </div>
                    {filteredOptions.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded cursor-pointer"
                            onClick={() => handleSelect(option.value)}
                        >
                            <Checkbox 
                                id={option.value}
                                checked={selectedValues.includes(option.value)}
                            />
                            <label
                                htmlFor={option.value}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
