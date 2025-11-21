import type { IconName } from "lucide-react/dynamic";

import type { ButtonHTMLAttributes } from "react";

export type ButtonColor = "primary" | "danger";
export type ButtonFill = "solid" | "clear" | "outline";

export type AppButtonProps = {
  text?: string;
  iconName?: IconName;
  color?: ButtonColor;
  fill?: ButtonFill;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: (e: React.MouseEvent) => void;
  to?: string;
  className?: string;
};
