import { useFormContext, type FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormFieldLabel } from "../form-field-label";
import type { AppSelectProps } from "./types";

export const AppSelect = <TFormData extends FieldValues = FieldValues>({
  name,
  labelText,
  options,
  placeholder,
}: AppSelectProps<TFormData>) => {
  const {
    register,
    formState: { errors, disabled },
  } = useFormContext<TFormData>();

  const isInvalid = !!errors[name];

  return (
    <div>
      <FormFieldLabel
        labelText={labelText}
        fieldName={name}
        isInvalid={!!errors[name]}
        isDisabled={disabled}
      />
      <select
        id={name}
        {...register(name)}
        className={twMerge(
          "w-full border rounded-lg px-4 py-[13px] text-sm bg-white text-text-primary hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:border-transparent transition-colors duration-200",
          isInvalid
            ? "border-danger focus:ring-danger"
            : "border-border-primary focus:ring-primary",
          disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
