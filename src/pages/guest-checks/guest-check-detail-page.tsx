import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, LoaderCircle, RefreshCw } from 'lucide-react'
import { useGuestCheck } from '@/cases/guest-checks/hooks/use-guest-check'
import { useOrders } from '@/cases/orders/hooks/use-order'
import { OrderCard } from '@/cases/orders/components/order-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { apiConfigurationError } from '@/lib/axios'
import { getApiErrorMessage } from '@/lib/api-error'
import { formatCurrency, formatDateTime } from '@/lib/formats'

function GuestCheckDetail({ id }: { id: string }) {
  const check = useGuestCheck(id)
  const orders = useOrders(id, check.isSuccess)
  if (apiConfigurationError) return null
  if (check.isPending) return <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="size-5 animate-spin" aria-hidden="true" />Carregando comanda…</p>
  if (check.isError) return <Alert variant="destructive"><AlertTitle>Não foi possível abrir a comanda</AlertTitle><AlertDescription><p>{getApiErrorMessage(check.error, 'Verifique a conexão e tente novamente.')}</p><Button className="mt-3" variant="outline" disabled={check.isFetching} onClick={() => void check.refetch()}>Tentar novamente</Button></AlertDescription></Alert>
  const data = check.data
  return <>
    <header className="mb-8 border-b pb-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">Comanda — {data.spot.name}</h1>
        <Badge variant={data.status === 'OPENED' ? 'default' : 'outline'}>{data.status === 'OPENED' ? 'Aberta' : 'Encerrada'}</Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Abertura: <time dateTime={data.createdAt}>{formatDateTime(data.createdAt)}</time></p>
      <p className="mt-3 text-lg">Total acumulado: <strong>{formatCurrency(data.total)}</strong></p>
      <Button variant="outline" className="mt-5" disabled={check.isFetching || orders.isFetching} onClick={() => { void check.refetch(); void orders.refetch() }}><RefreshCw aria-hidden="true" />Atualizar</Button>
    </header>
    {orders.isPending ? <p role="status" className="text-sm text-muted-foreground">Carregando pedidos…</p> :
      orders.isError ? <Alert variant="destructive"><AlertTitle>Não foi possível carregar os pedidos</AlertTitle><AlertDescription>Verifique a conexão e use Atualizar para tentar novamente.</AlertDescription></Alert> :
      !orders.data?.length ? <Alert role="status"><AlertTitle>Nenhum pedido nesta comanda</AlertTitle><AlertDescription>Os pedidos aparecerão aqui quando forem registrados.</AlertDescription></Alert> :
      <div className="space-y-6">{orders.data.map((order) => <OrderCard key={order.id} order={order} />)}</div>}
  </>
}

export function GuestCheckDetailPage() {
  const { id = '' } = useParams()
  const validId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  return <section aria-label="Detalhes da comanda">
    <Button variant="ghost" className="mb-6" render={<Link to="/guest-checks" />} nativeButton={false}><ArrowLeft aria-hidden="true" />Voltar para comandas</Button>
    {validId ? <GuestCheckDetail id={id} /> : <Alert variant="destructive"><AlertTitle>Endereço de comanda inválido</AlertTitle><AlertDescription>Volte para a lista e selecione uma comanda.</AlertDescription></Alert>}
  </section>
}
