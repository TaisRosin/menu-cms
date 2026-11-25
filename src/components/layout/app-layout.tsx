import { AlertCircle, Armchair, Layers, ReceiptText, Utensils, UtensilsCrossed } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { apiConfigurationError } from '@/lib/axios'
import { cn } from '@/lib/utils'

const navigation = [
  { to: '/categories', label: 'Categorias', icon: Layers },
  { to: '/products', label: 'Produtos', icon: UtensilsCrossed },
  { to: '/spots', label: 'Mesas', icon: Armchair },
  { to: '/guest-checks', label: 'Comandas', icon: ReceiptText },
]

export function AppLayout() {
  return (
    <div className="min-h-svh md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:p-3">
        Ir para o conteúdo
      </a>
      <aside className="border-b border-border bg-sidebar p-5 md:sticky md:top-0 md:flex md:h-svh md:flex-col md:border-r md:border-b-0 md:p-6">
        <div className="mb-6 flex items-center gap-3 md:mb-12">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
            <Utensils className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand">Cardápio Digital</p>
            <p className="text-xs text-muted-foreground">Administração</p>
          </div>
        </div>
        <nav aria-label="Navegação principal" className="grid grid-cols-2 gap-2 md:grid-cols-1">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => cn(
              'flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
            )}>
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <p className="mt-auto hidden border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground md:block">
          Gestão do cardápio<br />e da operação do restaurante.
        </p>
      </aside>
      <main id="conteudo" tabIndex={-1} className="min-w-0 px-5 py-8 sm:px-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-5xl">
          {apiConfigurationError && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle aria-hidden="true" />
              <AlertTitle>Configure o endereço da API</AlertTitle>
              <AlertDescription>{apiConfigurationError}</AlertDescription>
            </Alert>
          )}
          <Outlet />
        </div>
      </main>
    </div>
  )
}
