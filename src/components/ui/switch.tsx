import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from '@/lib/utils'

export function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn('inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-input bg-muted p-0.5 outline-none data-checked:bg-primary focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50', className)} {...props}>
      <SwitchPrimitive.Thumb className="size-4 rounded-full bg-white shadow-sm transition-transform data-checked:translate-x-5" />
    </SwitchPrimitive.Root>
  )
}
