import type { ComponentProps } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
export function NativeSelect({ className, children, ...props }: ComponentProps<'select'>) {
  return <div className="relative">
    <select data-slot="native-select" className={cn('h-10 w-full min-w-0 appearance-none rounded-md border border-input bg-background py-2 pr-9 pl-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50', className)} {...props}>{children}</select>
    <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-3 right-3 size-4 text-muted-foreground" />
  </div>
}
