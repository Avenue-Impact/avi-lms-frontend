import PropTypes from "prop-types";
import { Input } from "./input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { cn } from "../../lib/utils";
import { Textarea } from "./textarea";

FormInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "number",
    "password",
    "file",
    "email",
    "time",
    "date",
  ]).isRequired,
  control: PropTypes.any,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  isInput: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

export default function FormInput({
  name,
  label,
  type,
  control,
  className,
  placeholder,
  id,
  disabled,
  textarea = false,
  labelClass,
  absoluteError = false,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", absoluteError && "relative mb-2")}>
          {label && (
            <FormLabel
              className={cn(
                "font-poppins text-sm font-semibold capitalize text-label",
                labelClass,
              )}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            {textarea ? (
              <Textarea
                className={className}
                type={type}
                placeholder={placeholder}
                {...field}
                id={id}
                disabled={disabled}
              />
            ) : (
              <Input
                className={className}
                type={type}
                placeholder={placeholder}
                id={id}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage className={cn(absoluteError && "absolute -bottom-5 left-0 text-xs")} />
        </FormItem>
      )}
    />
  );
}
