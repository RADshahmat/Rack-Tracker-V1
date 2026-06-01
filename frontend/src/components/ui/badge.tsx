import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
        secondary:
          "border border-transparent bg-gray-100 text-gray-800 dark:bg-dark-border dark:text-gray-300",
        destructive:
          "border border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        outline: "border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-300",
        success:
          "border border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        warning:
          "border border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
