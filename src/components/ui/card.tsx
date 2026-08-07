import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const cardVariants = cva("rounded-xl border bg-card text-card-foreground ",{
  variants:{
    variant:{
      default:"shadow-sm",
      filter:"shadow-filter-drop"
    },
    size:{
      small:"px-3 py-2"
    },
  rounded:{
    default:"rounded-xl"
  }
  },
  defaultVariants:{
    variant:"default",
    size:"small",
    rounded:"default",
  }
})

const Card = ({ className,variant,size ,...props }: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) => (
  <div
    className={cn(
      cardVariants({variant,size,className})
    )}
    {...props}
  />
)

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
)

const CardTitle = ({ className, ...props }: React.ComponentProps<"div"> ) => (
  <h3
    className={cn("font-semibold leading-none tracking-tight ", className)}
    {...props}
  />
)

const CardDescription = ({ className, ...props }: React.ComponentProps<"div">) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
)

const CardContent = ({ className, ...props }:React.ComponentProps<"div"> ) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)

const CardFooter = ({ className, ...props }:React.ComponentProps<"div">  ) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
