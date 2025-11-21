import type { HTMLInputTypeAttribute } from "react";
import type { FieldValues, Path } from "react-hook-form";

export type AppInputProps<TFormData extends FieldValues = FieldValues> = {
  name: Path<TFormData>;
  type: HTMLInputTypeAttribute;
  labelText: string;
  placeholder: string;
};
