import { AlertCircle, Layers, LoaderCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCategories } from '../hooks/use-spot'
import type { SpotDTO } from '../dtos/spot.dto'

type SpotListProps = {
  onEdit: (spot: SpotDTO) => void
  onDelete: (spot: SpotDTO) => void
}

export function SpotList({ onEdit, onDelete }: SpotListProps) {
  const { data: spots, isPending, isError, isFetching, refetch } = useCategories()

  if (isPending) {
    return (
      <div role="status" className="flex items-center gap-3 py-8 text-sm text-muted-foreground">
        <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        Carregando mesas…
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle aria-hidden="true" />
        <AlertTitle>Não foi possível carregar as mesas</AlertTitle>
        <AlertDescription>
          <p>Verifique a conexão e tente novamente.</p>
          <Button variant="outline" className="mt-3 text-foreground" disabled={isFetching} onClick={() => void refetch()}>
            {isFetching ? 'Tentando novamente…' : 'Tentar novamente'}
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!spots?.length) {
    return (
      <Alert role="status">
        <Layers aria-hidden="true" />
        <AlertTitle>Nenhuma mesa cadastrada</AlertTitle>
        <AlertDescription>As mesas cadastradas aparecerão aqui.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableCaption className="sr-only">Mesas cadastradas em ordem de nome</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Nome</TableHead>
            <TableHead scope="col" className="w-28">Situação</TableHead>
            <TableHead scope="col" className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spots.map((spot) => (
            <TableRow key={spot.id}>
              <TableCell className="min-w-40 max-w-64 font-medium wrap-anywhere">{spot.name}</TableCell>
              <TableCell>
                <Badge variant={spot.active ? 'default' : 'outline'}>{spot.active ? 'Ativa' : 'Inativa'}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" aria-label={`Editar ${spot.name}`} onClick={() => onEdit(spot)}>Editar</Button>
                  <Button variant="destructive" size="sm" aria-label={`Excluir ${spot.name}`} onClick={() => onDelete(spot)}>Excluir</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
