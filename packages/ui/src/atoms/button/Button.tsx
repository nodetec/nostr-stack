import { cva } from "class-variance-authority";

type Props = {
  intent?: "primary" | "secondary" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "button" | "submit";
  compact?: boolean;
  onClick?: () => void;
};
type ButtonProps = React.PropsWithChildren<Props>;
const Button = ({
  children,
  intent = "primary",
  size = "md",
  type = "submit",
  compact = false,
  onClick,
}: ButtonProps) => {
  const classes = button({ intent, size, compact });
  return (
    <button type={type} className={classes} onClick={() => onClick?.()}>
      {children}
    </button>
  );
};

export default Button;

const button = cva(
  [
    "rounded",
    "text-sm",
    "font-semibold",
    "shadow-sm",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
  ],
  {
    variants: {
      intent: {
        primary: [
          "text-white",
          "bg-indigo-600",
          "hover:bg-indigo-500",
          "dark:bg-indigo-500",
          "dark:hover:bg-indigo-400",
          "focus-visible:outline-indigo-600",
        ],
        secondary: [
          "dark:text-white",
          "text-gray-900",
          "shadow-sm",
          "ring-1",
          "ring-inset",
          "ring-gray-300",
          "hover:bg-gray-50",
          "dark:hover:bg-gray-800",
        ],
        danger: [
          "text-white",
          "bg-red-600",
          "hover:bg-red-500",
          "dark:bg-red-500",
          "dark:hover:bg-red-400",
          "focus-visible:outline-red-600",
        ],
      },
      size: {
        xs: ["text-xs", "py-1", "px-2"],
        sm: ["py-1", "px-2"],
        md: ["py-1.5", "px-2.5", "rounded-md"],
        lg: ["py-2", "px-3", "rounded-md"],
        xl: ["py-2.5", "px-3.5", "rounded-md"],
      },
      compact: {
        true: ["!py-0.5", "!px-1.5"],
        false: [],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);
