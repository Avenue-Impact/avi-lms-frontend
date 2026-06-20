import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input } from "./input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { cn } from "@/lib/utils";

const COUNTRY_CODES = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+234", country: "NG" },
  { code: "+254", country: "KE" },
  { code: "+27", country: "ZA" },
  { code: "+91", country: "IN" },
  { code: "+61", country: "AU" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+86", country: "CN" },
  { code: "+971", country: "AE" },
];

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
        // field.value represents the full phone number string e.g. "+2348136969006"
        const [countryCode, setCountryCode] = useState("+44");
        const [localNumber, setLocalNumber] = useState("");

        // Parse initial value from form state
        useEffect(() => {
          if (field.value) {
            let matchedCode = "+44";
            let rest = field.value;
            // Sort codes by length descending so +234 matches before +2
            const sortedCodes = [...COUNTRY_CODES].sort(
              (a, b) => b.code.length - a.code.length
            );
            for (const { code } of sortedCodes) {
              if (field.value.startsWith(code)) {
                matchedCode = code;
                rest = field.value.slice(code.length);
                break;
              }
            }
            setCountryCode(matchedCode);
            setLocalNumber(rest);
          }
        }, []);

        const handleNumberChange = (e) => {
          let val = e.target.value;

          // Auto-detect country code from typed input
          if (val.startsWith("+")) {
            const sortedCodes = [...COUNTRY_CODES].sort(
              (a, b) => b.code.length - a.code.length
            );
            for (const { code } of sortedCodes) {
              if (val.startsWith(code)) {
                setCountryCode(code);
                val = val.slice(code.length); // strip it from local number
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
          field.onChange(countryCode + val.replace(/[\s-]/g, ""));
        };

        const handleCodeChange = (e) => {
          const newCode = e.target.value;
          setCountryCode(newCode);
          field.onChange(newCode + localNumber.replace(/[\s-]/g, ""));
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
                <div className="relative w-28 shrink-0">
                  <select
                    className="mt-0 h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    value={countryCode}
                    onChange={handleCodeChange}
                    disabled={disabled}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.country})
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow to replace native one */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                    <svg
                      className="h-4 w-4"
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
                  </div>
                </div>
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
