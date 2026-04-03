import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-headline font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-container text-white rounded-lg shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95",
        ghost:
          "text-primary-container rounded-lg hover:bg-primary-container/10",
        outline:
          "border border-outline-variant text-on-surface rounded-lg hover:bg-surface-container-low hover:border-outline",
        secondary:
          "bg-secondary-container text-on-secondary-container rounded-lg hover:opacity-90",
        danger:
          "bg-error text-on-error rounded-lg hover:opacity-90",
        success:
          "bg-success text-on-secondary rounded-lg hover:opacity-90",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        xl: "h-14 px-10 py-4 text-lg font-extrabold",
        icon: "h-9 w-9 p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
