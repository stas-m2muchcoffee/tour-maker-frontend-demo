import type { FieldValues, Path } from "react-hook-form";

export type AppToggleGroupProps<TFormData extends FieldValues = FieldValues> = {
  name: Path<TFormData>;
  labelText: string;
  options: string[];
  customValuePlaceholder: string;
};
