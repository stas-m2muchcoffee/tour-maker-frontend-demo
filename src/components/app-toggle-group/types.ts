import type { FieldValues, Path } from "react-hook-form";

export type AppToggleGroupOption = {
  value: string;
  label: string;
};

export type AppToggleGroupProps<TFormData extends FieldValues = FieldValues> = {
  name: Path<TFormData>;
  labelText: string;
  options: AppToggleGroupOption[];
  displayCustomValue?: boolean;
  customValuePlaceholder?: string;
};
