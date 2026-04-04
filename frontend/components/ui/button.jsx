import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-headline font-semibold text-sm transition-all focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-container text-white shadow-card hover:shadow-elevated hover:brightness-105 active:scale-95",
        ghost:
          "text-primary-container hover:bg-primary-container/10 active:scale-95",
        outline:
          "border border-outline-variant text-on-surface hover:bg-surface-container-low hover:border-outline active:scale-95",
        secondary:
          "bg-secondary-container text-on-secondary-container hover:brightness-95 active:scale-95",
        danger:
          "bg-error text-on-error hover:brightness-95 active:scale-95",
        success:
          "bg-success text-on-secondary hover:brightness-95 active:scale-95",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-xl",
        sm: "h-8 px-3 text-xs rounded-lg",
        lg: "h-12 px-8 py-3 text-base rounded-xl",
        xl: "h-14 px-10 py-4 text-lg font-extrabold rounded-2xl",
        icon: "h-10 w-10 p-0 flex items-center justify-center rounded-xl",
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
