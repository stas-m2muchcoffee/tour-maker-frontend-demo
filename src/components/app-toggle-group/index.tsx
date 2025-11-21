import { includes, map, pull, some, toLower, upperFirst } from "lodash";
import type { FieldValues } from "react-hook-form";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

import { AppButton } from "../app-button";
import { FormFieldLabel } from "../form-field-label";
import type { AppToggleGroupOption, AppToggleGroupProps } from "./types";

export const AppToggleGroup = <TFormData extends FieldValues = FieldValues>({
  name,
  labelText,
  options,
  displayCustomValue = false,
  customValuePlaceholder,
}: AppToggleGroupProps<TFormData>) => {
  const [internalOptions, setInternalOptions] = useState<
    AppToggleGroupOption[]
  >([]);

  const {
    control,
    formState: { disabled },
  } = useFormContext<TFormData>();

  const {
    register: customValueRegister,
    reset: resetCustomValue,
    getValues: getCustomValues,
    formState: { errors: customValueErrors },
  } = useForm<{ customValue: string }>();

  useEffect(() => {
    setInternalOptions(options);
  }, [options]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const handleOptionClick = (value: string) => {
          field.onChange(
            includes(field.value || [], value)
              ? pull(field.value || [], value)
              : [...(field.value || []), value]
          );
        };

        return (
          <div className="w-full">
            <FormFieldLabel
              labelText={labelText}
              fieldName={name}
              isInvalid={!!fieldState.invalid}
              isDisabled={disabled}
            />
            <div className="flex flex-wrap gap-2">
              {map(internalOptions, (option) => (
                <AppButton
                  key={option.value}
                  text={option.label}
                  color="primary"
                  fill={
                    includes(field.value || [], option.value)
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => handleOptionClick(option.value)}
                  disabled={disabled}
                  className="text-sm min-h-0"
                />
              ))}

              {displayCustomValue && (
                <div className="w-full relative">
                  <input
                    {...customValueRegister("customValue")}
                    type="text"
                    maxLength={40}
                    placeholder={customValuePlaceholder}
                    className={twMerge(
                      "w-full border rounded-lg pl-4 pr-10 py-[13px] text-sm bg-white text-text-primary border-border-primary focus:ring-primary hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:border-transparent transition-colors duration-200",
                      disabled
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-text",
                      customValueErrors.customValue
                        ? "border-danger focus:ring-danger"
                        : "border-border-primary focus:ring-primary"
                    )}
                  />
                  <AppButton
                    type="button"
                    iconName="plus"
                    color="primary"
                    fill="clear"
                    className="absolute right-0 top-0"
                    onClick={() => {
                      const customValue = upperFirst(
                        getCustomValues("customValue")
                      );
                      if (!customValue) return;

                      const isOptionAlreadyExists = some(
                        internalOptions,
                        (option) =>
                          toLower(option.value) === toLower(customValue)
                      );
                      if (!isOptionAlreadyExists)
                        setInternalOptions([
                          ...internalOptions,
                          { value: customValue, label: customValue },
                        ]);

                      const isOptionAlreadySelected = some(
                        field.value || [],
                        (option) => toLower(option) === toLower(customValue)
                      );
                      if (!isOptionAlreadySelected)
                        handleOptionClick(customValue);

                      resetCustomValue();
                    }}
                    disabled={disabled}
                  />
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};
