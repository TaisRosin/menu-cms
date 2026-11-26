import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { NativeSelect } from '@/components/ui/native-select'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency, formatDateTime } from '@/lib/formats'
import { getApiErrorMessage } from '@/lib/api-error'
import type { OrderDTO, OrderStatus } from '../dtos/order.dto'
import { useUpdateOrderStatus } from '../hooks/use-order'

const statuses: { value: OrderStatus; label: string; className: string }[] = [
  { value: 'NEW', label: 'Novo', className: 'border-sky-200 bg-sky-50 text-sky-900' },
  { value: 'PREPARING', label: 'Em preparo', className: 'border-amber-200 bg-amber-50 text-amber-900' },
  { value: 'READY', label: 'Pronto', className: 'border-violet-200 bg-violet-50 text-violet-900' },
  { value: 'DELIVERED', label: 'Entregue', className: 'border-emerald-200 bg-emerald-50 text-emerald-900' },
]

export function OrderCard({ order }: { order: OrderDTO }) {
  const update = useUpdateOrderStatus()
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const status = statuses.find((item) => item.value === order.status)
  async function changeStatus(value: OrderStatus) {
    if (update.isPending || value === order.status) return
    setError(''); setNotice('')
    try {
      await update.mutateAsync({ id: order.id, status: value })
      setNotice('Status atualizado para ' + statuses.find((item) => item.value === value)?.label + '.')
    } catch (cause) {
      setError(getApiErrorMessage(cause, 'Não foi possível atualizar o status. Tente novamente.'))
    }
  }
  return <article className="overflow-hidden rounded-xl border bg-card" aria-labelledby={'order-' + order.id}>
    <header className="flex flex-wrap items-start justify-between gap-4 border-b p-5">
      <div>
        <h2 id={'order-' + order.id} className="text-lg font-semibold">Pedido #{order.id.slice(0, 8)}</h2>
        <p className="mt-1 text-sm text-muted-foreground"><time dateTime={order.createdAt}>{formatDateTime(order.createdAt)}</time></p>
      </div>
      <Badge variant="outline" className={status?.className}>{status?.label ?? order.status}</Badge>
    </header>
    <div className="space-y-4 p-5">
      {error && <Alert variant="destructive"><AlertTitle>Não foi possível alterar o status</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      {notice && <Alert role="status"><AlertTitle>{notice}</AlertTitle></Alert>}
      {order.items.length ? <Table>
        <TableCaption className="sr-only">Itens do pedido e valores registrados na compra</TableCaption>
        <TableHeader><TableRow><TableHead scope="col">Produto</TableHead><TableHead scope="col" className="text-right">Quantidade</TableHead><TableHead scope="col" className="text-right">Preço unitário</TableHead><TableHead scope="col" className="text-right">Subtotal</TableHead></TableRow></TableHeader>
        <TableBody>{order.items.map((item) => <TableRow key={item.id}>
          <TableCell className="min-w-40 max-w-64 wrap-anywhere">{item.product?.name ?? 'Produto indisponível'}</TableCell>
          <TableCell className="text-right tabular-nums">{item.quantity}</TableCell>
          <TableCell className="text-right whitespace-nowrap tabular-nums">{formatCurrency(item.price)}</TableCell>
          <TableCell className="text-right whitespace-nowrap tabular-nums">{formatCurrency(item.subtotal)}</TableCell>
        </TableRow>)}</TableBody>
      </Table> : <p className="text-sm text-muted-foreground">Nenhum item registrado neste pedido.</p>}
      <div className="flex flex-wrap items-end justify-between gap-4 border-t pt-4">
        <div className="w-full space-y-2 sm:w-52">
          <Label htmlFor={'status-' + order.id}>Status do pedido</Label>
          <NativeSelect id={'status-' + order.id} value={order.status} disabled={update.isPending} onChange={(event) => void changeStatus(event.target.value as OrderStatus)}>
            {statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </NativeSelect>
          {update.isPending && <p role="status" className="text-sm text-muted-foreground">Atualizando status…</p>}
        </div>
        <p className="text-right text-sm text-muted-foreground">Total do pedido <strong className="ml-2 text-lg text-foreground">{formatCurrency(order.total)}</strong></p>
      </div>
    </div>
  </article>
}
