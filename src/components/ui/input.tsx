import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const inputVariants = cva(
  "flex items-center h-10 has-[input:disabled]:bg-muted text-sm bg-transparent  file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border border-transparent focus-within:outline-hidden aria-invalid:ring-1 aria-invalid:ring-destructive aria-invalid:focus-within:ring-2 aria-invalid:focus-within:ring-destructive",
  {
    variants: {
      rounded: {
        none: "rounded-none ",
        md: "rounded-md",
      },
      variant: {
        outline:
          "border-borde focus-within:border-primary focus-within:shadow-input-shadow aria-invalid:border-transparent",
        filled:
          "border-2 bg-background focus-within:border-primary focus-within:bg-transparent",
        underlined:
          "rounded-none  border-b-border focus-within:border-b-primary focus-within:shadow-input-shadow",
          transparent:"focus-within:shadow-primary-shadow-foreground bg-white/50",
        unstyled: "",
      },
    },
    defaultVariants: {
      rounded: "md",
      variant: "outline",
    },
  }
)

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const Input = 
  (
    { className, rounded, variant, startAdornment, endAdornment, ...props } : InputProps,
  ) => {
    return (
      <div
        className={cn(
          inputVariants({ variant, rounded, className }),
          className,     {
            "pl-1.5": !!startAdornment,
            "pr-1.5": !!endAdornment,
          }
        )}
      >
        {startAdornment && (
          <span className="flex items-center pointer-events-none text-muted-foreground">
            {startAdornment}
          </span>
        )}
        <input
          {...props}
          className={cn(
            "file:text-foreground  grow placeholder:text-muted-foreground px-3 py-5 selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0  bg-transparent  text-base  outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
       
          )}
        />
        {endAdornment && (
          <span className="flex items-center pointer-events-none text-muted-foreground">
            {endAdornment}
          </span>
        )}
      </div>
    )
  }
Input.displayName = "Input"

export { Input }