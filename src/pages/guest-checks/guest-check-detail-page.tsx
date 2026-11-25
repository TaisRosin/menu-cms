import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PendingPage } from '@/components/pending-page'
import { Button } from '@/components/ui/button'

export function GuestCheckDetailPage() {
  return (
    <>
      <Button variant="ghost" className="mb-6" render={<Link to="/guest-checks" />} nativeButton={false}>
        <ArrowLeft aria-hidden="true" /> Voltar para comandas
      </Button>
      <PendingPage title="Detalhes da comanda" description="Consulta dos pedidos e itens da comanda selecionada." />
    </>
  )
}
