import React from "react";
import { CommonButton } from "./button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({ name, className, control, label, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);

  // const { control } = useFormContext();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className={cn("pr-10", className)}
                {...field}
                {...props}
              />
              <CommonButton
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                ) : (
                  <Eye
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </CommonButton>
            </div>
          </FormControl>
          {/* <FormDescription>
            Password must be at least 8 characters long and include a number, a
            lowercase letter, an uppercase letter, and a special character.
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
