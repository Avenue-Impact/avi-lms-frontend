import PropType from "prop-types";
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CommonButton as Button } from "./button";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

const PasswordInput = React.forwardRef(
  ({ className, control, label, placeholder, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const disabled = props.value === "" || props.value === undefined;
          return (
            <FormItem className="w-full">
              {label && (
                <FormLabel
                  className={cn(
                    "font-poppins text-sm font-semibold capitalize text-[#101928]",
                  )}
                >
                  {label}
                </FormLabel>
              )}
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className={cn("hide-password-toggle pr-10", className)}
                    ref={ref}
                    placeholder={placeholder}
                    id={id}
                    {...props}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                    // disabled={disabled}
                  >
                    {showPassword && !disabled ? (
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>

                  {/* hides browsers password toggles */}
                  <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

PasswordInput.propTypes = {
  name: PropType.string.isRequired,
  control: PropType.any.isRequired,
  label: PropType.string,
  placeholder: PropType.string,
  id: PropType.string,
  className: PropType.string,
  value: PropType.string,
  disabled: PropType.bool,
};
