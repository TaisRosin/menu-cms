import { Link } from 'react-router-dom'
import { LoaderCircle, RefreshCw, Receipt } from 'lucide-react'
import { useOpenedGuestChecks } from '@/cases/guest-checks/hooks/use-guest-check'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiConfigurationError } from '@/lib/axios'
import { formatCurrency, formatDateTime } from '@/lib/formats'

export function GuestCheckPage() {
  const query = useOpenedGuestChecks()
  return <section aria-labelledby="page-title">
    <header className="mb-8 border-b pb-7">
      <h1 id="page-title" className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">Comandas abertas</h1>
      <p className="mt-3 text-sm text-muted-foreground">Acompanhe os pedidos e o total acumulado de cada mesa. Atualização automática a cada 30 segundos.</p>
      <Button variant="outline" className="mt-5" disabled={!!apiConfigurationError || query.isFetching} onClick={() => void query.refetch()}><RefreshCw aria-hidden="true" className={query.isFetching ? 'animate-spin' : ''} />Atualizar</Button>
    </header>
    {!apiConfigurationError && (
      query.isPending ? <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle aria-hidden="true" className="size-5 animate-spin" />Carregando comandas…</p> :
      query.isError ? <Alert variant="destructive"><AlertTitle>Não foi possível carregar as comandas</AlertTitle><AlertDescription>Verifique a conexão e use Atualizar para tentar novamente.</AlertDescription></Alert> :
      !query.data?.length ? <Alert role="status"><Receipt aria-hidden="true" /><AlertTitle>Nenhuma comanda aberta</AlertTitle><AlertDescription>As comandas abertas pelo fluxo de pedidos aparecerão aqui.</AlertDescription></Alert> :
      <div className="overflow-hidden rounded-xl border bg-card"><Table>
        <TableCaption className="sr-only">Comandas abertas em ordem de abertura</TableCaption>
        <TableHeader><TableRow><TableHead scope="col">Mesa</TableHead><TableHead scope="col">Abertura</TableHead><TableHead scope="col" className="text-right">Total acumulado</TableHead><TableHead scope="col">Ações</TableHead></TableRow></TableHeader>
        <TableBody>{query.data.map((check) => <TableRow key={check.id}>
          <TableCell className="min-w-32 max-w-64 font-medium wrap-anywhere">{check.spot.name}{!check.spot.active && <span className="block text-xs text-muted-foreground">Mesa inativa</span>}</TableCell>
          <TableCell className="whitespace-nowrap"><time dateTime={check.createdAt}>{formatDateTime(check.createdAt)}</time></TableCell>
          <TableCell className="text-right whitespace-nowrap tabular-nums">{formatCurrency(check.total)}</TableCell>
          <TableCell><Button size="sm" variant="outline" render={<Link to={'/guest-checks/' + check.id} />} nativeButton={false} aria-label={'Ver pedidos de ' + check.spot.name}>Ver pedidos</Button></TableCell>
        </TableRow>)}</TableBody>
      </Table></div>
    )}
  </section>
}
