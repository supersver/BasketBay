import clsx from "clsx";
import { Spinner } from "phosphor-react";
import * as React from "react";

const variants = {
  primary: "bg-blue-600 text-white",
  inverse: "bg-white text-blue-600",
  danger: "bg-red-600 text-white",
  outline: "bg-transparent text-gray-700 border-gray-300",
};

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  onlyIcon?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      onlyIcon = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "flex justify-center items-center border border-gray-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading && (
          <Spinner size={14} className="text-current animate-spin" />
        )}
        {!isLoading && startIcon}
        {!isLoading && !onlyIcon && (
          <span className="mx-2">{props.children}</span>
        )}
        {!isLoading && endIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
