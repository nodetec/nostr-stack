import { cva } from "class-variance-authority";

type Props = {
  imgUrl?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
};

const Avatar = ({ imgUrl, size = "md", onClick }: Props) => {
  const classes = avatar({ size, className: onClick ? "cursor-pointer" : "" });
  if (imgUrl) {
    return (
      <img
        className={classes}
        src={imgUrl}
        alt=""
        onClick={() => onClick?.()}
      />
    );
  }
  return (
    <span className={`${classes} overflow-hidden bg-gray-100`}>
      <svg
        className="h-full w-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};

export default Avatar;

const avatar = cva(["inline-block", "rounded-full"], {
  variants: {
    size: {
      xs: ["h-6", "h-6"],
      sm: ["h-8", "h-8"],
      md: ["h-10", "h-10"],
      lg: ["h-12", "h-12"],
      xl: ["h-14", "h-14"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});
