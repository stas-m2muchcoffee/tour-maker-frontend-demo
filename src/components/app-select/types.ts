import type { FieldValues, Path } from "react-hook-form";

export type AppSelectOption = {
  value: string;
  label: string;
};

export type AppSelectProps<TFormData extends FieldValues = FieldValues> = {
  name: Path<TFormData>;
  labelText: string;
  options: AppSelectOption[];
  placeholder?: string;
};
