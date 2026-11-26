import { AlertCircle, Layers, LoaderCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCategories } from '../hooks/use-category'
import { CategoryIcon } from './category-icon'
import type { CategoryDTO } from '../dtos/category.dto'

type CategoryListProps = {
  onEdit: (category: CategoryDTO) => void
  onDelete: (category: CategoryDTO) => void
}

export function CategoryList({ onEdit, onDelete }: CategoryListProps) {
  const { data: categories, isPending, isError, isFetching, refetch } = useCategories()

  if (isPending) {
    return (
      <div role="status" className="flex items-center gap-3 py-8 text-sm text-muted-foreground">
        <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        Carregando categorias…
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle aria-hidden="true" />
        <AlertTitle>Não foi possível carregar as categorias</AlertTitle>
        <AlertDescription>
          <p>Verifique a conexão e tente novamente.</p>
          <Button variant="outline" className="mt-3 text-foreground" disabled={isFetching} onClick={() => void refetch()}>
            {isFetching ? 'Tentando novamente…' : 'Tentar novamente'}
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!categories?.length) {
    return (
      <Alert role="status">
        <Layers aria-hidden="true" />
        <AlertTitle>Nenhuma categoria cadastrada</AlertTitle>
        <AlertDescription>As categorias cadastradas aparecerão aqui.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableCaption className="sr-only">Categorias cadastradas em ordem de exibição</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col" className="w-16">Ícone</TableHead>
            <TableHead scope="col">Nome</TableHead>
            <TableHead scope="col" className="w-20 text-right">Ordem</TableHead>
            <TableHead scope="col" className="w-28">Situação</TableHead>
            <TableHead scope="col" className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell><CategoryIcon url={category.icon} /></TableCell>
              <TableCell className="min-w-40 max-w-64 font-medium wrap-anywhere">{category.name}</TableCell>
              <TableCell className="text-right tabular-nums">{category.displayOrder}</TableCell>
              <TableCell>
                <Badge variant={category.active ? 'default' : 'outline'}>{category.active ? 'Ativa' : 'Inativa'}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" aria-label={`Editar ${category.name}`} onClick={() => onEdit(category)}>Editar</Button>
                  <Button variant="destructive" size="sm" aria-label={`Excluir ${category.name}`} onClick={() => onDelete(category)}>Excluir</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
