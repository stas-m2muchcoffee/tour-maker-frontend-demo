import type { FormFieldLabelProps } from "./types";
import { twMerge } from "tailwind-merge";

export const FormFieldLabel: React.FC<FormFieldLabelProps> = ({
  labelText,
  fieldName,
  isInvalid,
  isDisabled,
}) => {
  return (
    <label
      htmlFor={fieldName}
      className={twMerge(
        "flex items-center gap-1 mb-1 text-sm",
        isInvalid
          ? "text-danger"
          : isDisabled
          ? "text-text-disabled"
          : "text-text-primary"
      )}
    >
      {labelText}
    </label>
  );
};
