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
// import { Textarea } from "./textarea";

// interface InputLabelProps {
//   label?: string;
//   name: string;
//   type: HTMLInputTypeAttribute;
//   control: any;
//   className?: string;
//   placeholder?: string;
//   isInput?: boolean;
//   id?: string;
// }
FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "password", "file", "email"])
    .isRequired,
  control: PropTypes.any,
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
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
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel
              className={cn(
                "font-poppins text-sm font-semibold capitalize text-label",
              )}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              className={className}
              type={type}
              placeholder={placeholder}
              {...field}
              id={id}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
