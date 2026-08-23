import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-soft text-accent-foreground",
        neutral: "border-border bg-muted text-muted-foreground",
        success: "border-transparent bg-jade-soft text-[color:var(--accent-jade)]",
        warning: "border-transparent bg-warning/15 text-[color:var(--warning)]",
        danger: "border-transparent bg-destructive/12 text-destructive",
        violet: "border-transparent bg-violet/12 text-[color:var(--violet)]",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({
  className, variant, asChild = false, ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
