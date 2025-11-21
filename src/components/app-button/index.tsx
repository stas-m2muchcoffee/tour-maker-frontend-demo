import React, { useMemo } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

import {
  baseClasses,
  buttonColorConfig,
  disabledButtonClasses,
  enabledButtonClasses,
  iconOnlyButtonClasses,
  textButtonClasses,
} from "../../constants/button-styles.ts";
import type { AppButtonProps } from "./types";

export const AppButton: React.FC<AppButtonProps> = ({
  text,
  iconName,
  color = "primary",
  fill = "solid",
  disabled = false,
  onClick,
  type = "button",
  to,
  className,
}) => {
  const buttonContent = useMemo(
    () => (
      <>
        {!!iconName && <DynamicIcon name={iconName} size={22} />}
        {!!text && <span className="whitespace-nowrap">{text}</span>}
      </>
    ),
    [iconName, text]
  );

  const buttonClasses = useMemo(() => {
    const colorConfig = buttonColorConfig[color] || buttonColorConfig.primary;
    const colorClasses = colorConfig[fill];

    return twMerge(
      baseClasses,
      !!iconName && !text ? iconOnlyButtonClasses : textButtonClasses,
      colorClasses,
      disabled ? disabledButtonClasses : enabledButtonClasses,
      className
    );
  }, [color, fill, disabled, iconName, text, className]);

  return to ? (
    <Link className={buttonClasses} to={to}>
      {buttonContent}
    </Link>
  ) : (
    <button
      className={buttonClasses}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};
