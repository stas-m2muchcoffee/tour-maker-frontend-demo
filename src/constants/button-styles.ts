import type { ButtonColor, ButtonFill } from "../components/app-button/types";

export const baseClasses =
  "rounded-lg font-[1rem] transition-colors duration-200 flex items-center justify-center gap-2 min-h-[48px]";
export const textButtonClasses = "px-3 py-2";
export const iconOnlyButtonClasses = "p-3";
export const enabledButtonClasses = "cursor-pointer hover:opacity-90";
export const disabledButtonClasses = "opacity-70 cursor-not-allowed";

export const buttonColorConfig: Record<
  ButtonColor,
  Record<ButtonFill, string>
> = {
  primary: {
    solid: "bg-primary text-white",
    clear: "bg-transparent text-primary",
    outline: "bg-transparent text-primary border border-border-primary",
  },
  danger: {
    solid: "bg-danger text-white",
    clear: "bg-transparent text-danger",
    outline: "bg-transparent text-danger border border-border-danger",
  },
};
