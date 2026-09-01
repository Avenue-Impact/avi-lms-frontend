import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Input } from "./input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from "libphonenumber-js/min";

// Initialize the display names API for country localized names
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

// Generate a static list of all countries supported by libphonenumber
const ALL_COUNTRIES = getCountries().map((countryCode) => {
  let countryName = countryCode;
  try {
    countryName = regionNames.of(countryCode) || countryCode;
  } catch (e) {
    // Fallback if region name parsing fails
  }
  return {
    code: countryCode, // e.g., 'US', 'GB'
    callingCode: `+${getCountryCallingCode(countryCode)}`, // e.g., '+1', '+44'
    name: countryName,
  };
}).sort((a, b) => a.name.localeCompare(b.name));

PhoneInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  name: PropTypes.string.isRequired,
  control: PropTypes.any,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  labelClass: PropTypes.string,
  absoluteError: PropTypes.bool,
};

export default function PhoneInput({
  name,
  label,
  control,
  className,
  placeholder,
  id,
  disabled,
  labelClass,
  absoluteError = false,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Default to UK if no value
        const [country, setCountry] = useState(ALL_COUNTRIES.find(c => c.code === "GB") || ALL_COUNTRIES[0]);
        const [localNumber, setLocalNumber] = useState("");
        const [isOpen, setIsOpen] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");

        const filteredCountries = useMemo(() => {
          if (!searchQuery) return ALL_COUNTRIES;
          const lowerQuery = searchQuery.toLowerCase();
          return ALL_COUNTRIES.filter((c) => 
            c.name.toLowerCase().includes(lowerQuery) || 
            c.callingCode.includes(lowerQuery) ||
            c.code.toLowerCase().includes(lowerQuery)
          );
        }, [searchQuery]);

        // Parse initial value from form state
        useEffect(() => {
          if (field.value) {
            const parsedNumber = parsePhoneNumberFromString(field.value);
            if (parsedNumber && parsedNumber.country) {
              const matchedCountry = ALL_COUNTRIES.find(c => c.code === parsedNumber.country);
              if (matchedCountry) {
                setCountry(matchedCountry);
                // Extract local part of the number without the calling code
                setLocalNumber(parsedNumber.nationalNumber);
              }
            } else {
              // Fallback logic if it couldn't be parsed properly by libphonenumber
              let matchedCode = "+44";
              let rest = field.value;
              
              // Sort codes by length descending so +234 matches before +2
              const sortedCodes = [...ALL_COUNTRIES].sort(
                (a, b) => b.callingCode.length - a.callingCode.length
              );
              for (const c of sortedCodes) {
                if (field.value.startsWith(c.callingCode)) {
                  matchedCode = c.callingCode;
                  rest = field.value.slice(c.callingCode.length);
                  break;
                }
              }
              const matchedCountry = ALL_COUNTRIES.find(c => c.callingCode === matchedCode);
              if (matchedCountry) {
                setCountry(matchedCountry);
              }
              setLocalNumber(rest);
            }
          }
        }, []);

        const handleNumberChange = (e) => {
          let val = e.target.value;

          // Auto-detect country code from typed input
          if (val.startsWith("+")) {
            const sortedCodes = [...ALL_COUNTRIES].sort(
              (a, b) => b.callingCode.length - a.callingCode.length
            );
            for (const c of sortedCodes) {
              if (val.startsWith(c.callingCode)) {
                setCountry(c);
                val = val.slice(c.callingCode.length); // strip it from local number
                break;
              }
            }
          }

          // Strip leading zero so users enter their phone number in peace
          if (val.startsWith("0")) {
            val = val.replace(/^0+/, "");
          }

          // Strip any non-digit/space/hyphen characters
          val = val.replace(/[^\d\s-]/g, "");

          setLocalNumber(val);
          // Combine and update react-hook-form
          field.onChange(country.callingCode + val.replace(/[\s-]/g, ""));
        };

        const handleCountrySelect = (selectedCountry) => {
          setCountry(selectedCountry);
          setIsOpen(false);
          setSearchQuery("");
          field.onChange(selectedCountry.callingCode + localNumber.replace(/[\s-]/g, ""));
        };

        return (
          <FormItem className={cn("w-full", absoluteError && "relative mb-2")}>
            {label && (
              <FormLabel
                className={cn(
                  "font-poppins text-sm font-semibold capitalize text-label",
                  labelClass
                )}
              >
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="flex gap-3">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      disabled={disabled}
                      className={cn(
                        "mt-0 flex h-10 w-[140px] shrink-0 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        !country && "text-muted-foreground"
                      )}
                    >
                      <span className="truncate flex-1 text-left">
                        {country ? `${country.code} (${country.callingCode})` : "Select country..."}
                      </span>
                      <svg
                        className="ml-2 h-4 w-4 shrink-0 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0 bg-background" align="start">
                    <div className="bg-background flex items-center border border-accent px-3">
                      <svg
                        className="mr-2 h-4 w-4 shrink-0 opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                      <input
                        placeholder="Search country or code..."
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto p-1">
                      {filteredCountries.length === 0 ? (
                        <p className="p-4 text-center text-sm text-muted-foreground">
                          No country found.
                        </p>
                      ) : (
                        filteredCountries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => handleCountrySelect(c)}
                            className={cn(
                              "relative flex cursor-pointer bg-background select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                              country?.code === c.code ? "bg-accent text-accent-foreground font-medium" : ""
                            )}
                          >
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className="ml-2 text-muted-foreground">{c.callingCode}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>

                <Input
                  className={cn("flex-1", className)}
                  type="tel"
                  placeholder={placeholder || "813 696 9006"}
                  id={id}
                  disabled={disabled}
                  value={localNumber}
                  onChange={handleNumberChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            </FormControl>
            <FormMessage
              className={cn(absoluteError && "absolute -bottom-5 left-0 text-xs")}
            />
          </FormItem>
        );
      }}
    />
  );
}
