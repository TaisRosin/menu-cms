import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DndContext, DragOverlay, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { GripVertical, RefreshCw } from 'lucide-react'
import { useOrders, useUpdateOrderStatus } from '@/cases/orders/hooks/use-order'
import type { OrderDTO, OrderStatus } from '@/cases/orders/dtos/order.dto'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { NativeSelect } from '@/components/ui/native-select'
import { apiConfigurationError } from '@/lib/axios'
import { getApiErrorMessage } from '@/lib/api-error'
import { formatCurrency, formatDateTime } from '@/lib/formats'
import { cn } from '@/lib/utils'

const columns: { status: OrderStatus; label: string; color: string }[] = [
  { status: 'NEW', label: 'Novo', color: 'border-t-sky-500' },
  { status: 'PREPARING', label: 'Em preparo', color: 'border-t-amber-500' },
  { status: 'READY', label: 'Pronto', color: 'border-t-violet-500' },
  { status: 'DELIVERED', label: 'Entregue', color: 'border-t-emerald-500' },
]

function CardContent({ order }: { order: OrderDTO }) {
  return <>
    <p className="font-semibold wrap-anywhere">{order.guestCheck.spot.name}</p>
    <p className="mt-1 text-xs text-muted-foreground">Pedido #{order.id.slice(0, 8)}</p>
    <time className="mt-2 block text-xs text-muted-foreground" dateTime={order.createdAt}>{formatDateTime(order.createdAt)}</time>
    <ul className="my-4 space-y-2 border-y py-3 text-sm">{order.items.map((item) => <li key={item.id} className="wrap-anywhere"><strong>{item.quantity}×</strong> {item.product?.name ?? 'Produto indisponível'}</li>)}</ul>
    <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
  </>
}

function KanbanCard({ order, disabled, move }: { order: OrderDTO; disabled: boolean; move: (order: OrderDTO, status: OrderStatus) => void }) {
  const { setNodeRef, setActivatorNodeRef, listeners, attributes, isDragging } = useDraggable({ id: order.id, disabled })
  return <article ref={setNodeRef} aria-label={'Pedido ' + order.id.slice(0, 8)} className={cn('relative rounded-lg border bg-card p-4 shadow-sm', isDragging && 'opacity-30')}>
    <button ref={setActivatorNodeRef} {...attributes} {...listeners} disabled={disabled} aria-label={'Arrastar pedido ' + order.id.slice(0, 8)} className="float-right -mr-2 -mt-2 flex size-11 touch-none items-center justify-center rounded-md cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-40"><GripVertical aria-hidden="true" className="size-5" /></button>
    <CardContent order={order} />
    <label className="mt-4 block text-xs text-muted-foreground" htmlFor={'kanban-' + order.id}>Mover para</label>
    <NativeSelect id={'kanban-' + order.id} className="mt-1" value={order.status} disabled={disabled} onChange={(event) => move(order, event.target.value as OrderStatus)}>{columns.map((column) => <option key={column.status} value={column.status}>{column.label}</option>)}</NativeSelect>
    <Link className="mt-3 inline-block text-sm underline underline-offset-4" to={'/guest-checks/' + order.guestCheck.id}>Ver comanda</Link>
  </article>
}

function Column({ column, orders, disabled, move }: { column: typeof columns[number]; orders: OrderDTO[]; disabled: boolean; move: (order: OrderDTO, status: OrderStatus) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.status, disabled })
  return <section ref={setNodeRef} aria-label={column.label} className={cn('min-h-64 min-w-0 rounded-lg border border-t-4 bg-muted/40 p-3', column.color, isOver && 'ring-2 ring-ring bg-accent')}>
    <h2 className="mb-4 flex items-center justify-between gap-2 font-semibold">{column.label}<span className="rounded-full bg-background px-2 py-0.5 text-xs tabular-nums">{orders.length}</span></h2>
    <div className="space-y-3">{orders.map((order) => <KanbanCard key={order.id} order={order} disabled={disabled} move={move} />)}</div>
    {!orders.length && <p className="py-8 text-center text-sm text-muted-foreground">Nenhum pedido</p>}
  </section>
}

export function OrderKanbanPage() {
  const query = useOrders()
  const mutation = useUpdateOrderStatus()
  const lock = useRef(false)
  const [active, setActive] = useState<OrderDTO | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  async function move(order: OrderDTO, status: OrderStatus) {
    if (lock.current || order.status === status || !columns.some((column) => column.status === status)) return
    lock.current = true
    setMessage(''); setError('')
    try {
      await mutation.mutateAsync({ id: order.id, status })
      setMessage('Pedido #' + order.id.slice(0, 8) + ' atualizado para ' + columns.find((column) => column.status === status)?.label + '.')
    } catch (cause) {
      setError(getApiErrorMessage(cause, 'Não foi possível mover o pedido. Tente novamente.'))
    } finally { lock.current = false }
  }
  function drop({ active: dragged, over }: DragEndEvent) {
    setActive(null)
    const order = query.data?.find((item) => item.id === dragged.id)
    if (order && over) void move(order, over.id as OrderStatus)
  }
  return <section aria-labelledby="kanban-title">
    <header className="mb-6 border-b pb-6">
      <h1 id="kanban-title" className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">Pedidos</h1>
      <p className="mt-3 text-sm text-muted-foreground">Arraste pela alça para mudar o status ou use “Mover para” em cada cartão. Todos os pedidos, atualizados a cada 30 segundos.</p>
      <Button className="mt-4" variant="outline" disabled={!!apiConfigurationError || query.isFetching || mutation.isPending} onClick={() => void query.refetch()}><RefreshCw aria-hidden="true" />Atualizar</Button>
    </header>
    {error && <Alert variant="destructive" className="mb-4"><AlertTitle>Pedido não movido</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
    <p role="status" className="mb-4 text-sm">{mutation.isPending ? 'Salvando status…' : message}</p>
    {!apiConfigurationError && (query.isPending ? <p role="status">Carregando pedidos…</p> : query.isError ? <Alert variant="destructive"><AlertTitle>Não foi possível carregar os pedidos</AlertTitle><AlertDescription>Verifique a conexão e use Atualizar para tentar novamente.</AlertDescription></Alert> : <>
      {!query.data.length && <p className="mb-4 text-sm text-muted-foreground">Os pedidos registrados pelo cardápio aparecerão aqui.</p>}
      <DndContext sensors={sensors} onDragStart={({ active: dragged }) => setActive(query.data.find((order) => order.id === dragged.id) ?? null)} onDragEnd={drop} onDragCancel={() => setActive(null)}>
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">{columns.map((column) => <Column key={column.status} column={column} orders={query.data.filter((order) => order.status === column.status)} disabled={mutation.isPending} move={(order, status) => void move(order, status)} />)}</div>
        <DragOverlay>{active && <div className="rounded-lg border bg-card p-4 shadow-xl"><CardContent order={active} /></div>}</DragOverlay>
      </DndContext>
    </>)}
  </section>
}
