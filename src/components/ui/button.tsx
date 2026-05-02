import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-light shadow-[0_4px_16px_-4px_hsl(215,85%,16%/0.15)] hover:shadow-[0_8px_24px_-6px_hsl(215,85%,16%/0.25)] hover:-translate-y-1 active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "border-2 border-border bg-background/50 text-foreground hover:bg-muted hover:border-primary/30 backdrop-blur-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        ghost: "hover:bg-muted/50 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-light",
        hero: "bg-gradient-to-r from-accent to-accent-light text-accent-foreground hover:from-accent-light hover:to-accent shadow-[0_8px_24px_-6px_hsl(38,95%,52%/0.35)] hover:shadow-[0_12px_32px_-8px_hsl(38,95%,52%/0.45)] hover:-translate-y-1 font-bold text-base active:translate-y-0",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-13 rounded-xl px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
