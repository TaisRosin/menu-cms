import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-brand">Página não encontrada</h1>
      <p className="mt-3 mb-6 text-muted-foreground">Confira o endereço ou retorne ao início.</p>
      <Button render={<Link to="/categories" />} nativeButton={false}>Ir para categorias</Button>
    </section>
  )
}
