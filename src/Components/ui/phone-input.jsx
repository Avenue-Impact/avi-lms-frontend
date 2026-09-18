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
          const clean = val.replace(/[\s-]/g, "");
          field.onChange(clean ? country.callingCode + clean : "");
        };

        const handleCountrySelect = (selectedCountry) => {
          setCountry(selectedCountry);
          setIsOpen(false);
          setSearchQuery("");
          const clean = localNumber.replace(/[\s-]/g, "");
          field.onChange(clean ? selectedCountry.callingCode + clean : "");
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
              <div className="flex gap-2.5">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      disabled={disabled}
                      className={cn(
                        "mt-0 flex h-11 w-[130px] shrink-0 items-center justify-between rounded-xl border border-[#D0D5DD] bg-white px-3 py-2 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#D7195A]/20 focus:border-[#D7195A] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                        !country && "text-muted-foreground"
                      )}
                    >
                      <span className="truncate flex-1 text-left font-medium">
                        {country ? `${country.code} (${country.callingCode})` : "Country..."}
                      </span>
                      <svg
                        className="ml-1.5 h-4 w-4 shrink-0 opacity-50"
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
                  <PopoverContent className="w-[300px] p-0 bg-white rounded-xl border border-gray-200 shadow-xl z-50" align="start">
                    <div className="bg-white flex items-center border-b border-gray-100 px-3">
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
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="max-h-[260px] overflow-y-auto p-1">
                      {filteredCountries.length === 0 ? (
                        <p className="p-4 text-center text-sm text-gray-500">
                          No country found.
                        </p>
                      ) : (
                        filteredCountries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => handleCountrySelect(c)}
                            className={cn(
                              "relative flex cursor-pointer select-none items-center rounded-lg px-2.5 py-2 text-sm outline-none hover:bg-gray-100 hover:text-gray-900 transition-colors",
                              country?.code === c.code ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700"
                            )}
                          >
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className="ml-2 text-xs font-mono text-gray-400">{c.callingCode}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>

                <Input
                  className={cn(
                    "flex-1 h-11 rounded-xl border-[#D0D5DD] px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-[#98A2B3] focus-visible:ring-2 focus-visible:ring-[#D7195A]/20 focus-visible:border-[#D7195A] transition-all",
                    className
                  )}
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
