import { AlertCircle, LoaderCircle, Package } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/lib/formats'
import type { ProductDTO } from '../dtos/product.dto'
import { useProducts } from '../hooks/use-product'
import { ProductImage } from './product-image'

type Props = { categoryId: string; onEdit: (product: ProductDTO) => void; onDelete: (product: ProductDTO) => void }

export function ProductList({ categoryId, onEdit, onDelete }: Props) {
  const { data: products, isPending, isError, isFetching, refetch } = useProducts(categoryId)
  if (isPending) return <div role="status" className="flex items-center gap-3 py-8 text-sm text-muted-foreground"><LoaderCircle aria-hidden="true" className="size-5 animate-spin" />Carregando produtos…</div>
  if (isError) return <Alert variant="destructive"><AlertCircle aria-hidden="true" /><AlertTitle>Não foi possível carregar os produtos</AlertTitle><AlertDescription><p>Verifique a conexão e tente novamente.</p><Button variant="outline" className="mt-3" disabled={isFetching} onClick={() => void refetch()}>{isFetching ? 'Tentando novamente…' : 'Tentar novamente'}</Button></AlertDescription></Alert>
  if (!products?.length) return <Alert role="status"><Package aria-hidden="true" /><AlertTitle>{categoryId ? 'Nenhum produto nesta categoria' : 'Nenhum produto cadastrado'}</AlertTitle><AlertDescription>{categoryId ? 'Escolha outra categoria ou cadastre um produto.' : 'Os produtos cadastrados aparecerão aqui.'}</AlertDescription></Alert>
  return <div className="overflow-hidden rounded-xl border bg-card">
    <Table>
      <TableCaption className="sr-only">Produtos cadastrados, incluindo ativos e inativos</TableCaption>
      <TableHeader><TableRow>
        <TableHead scope="col">Imagem</TableHead><TableHead scope="col">Nome</TableHead><TableHead scope="col">Categoria</TableHead><TableHead scope="col" className="text-right">Preço</TableHead><TableHead scope="col">Indicadores</TableHead><TableHead scope="col">Situação</TableHead><TableHead scope="col">Ações</TableHead>
      </TableRow></TableHeader>
      <TableBody>{products.map((product) => <TableRow key={product.id}>
        <TableCell><ProductImage url={product.picture} /></TableCell>
        <TableCell className="min-w-40 max-w-64 font-medium wrap-anywhere">{product.name}</TableCell>
        <TableCell className="min-w-32 max-w-48 wrap-anywhere">{product.category?.name ?? 'Sem categoria'}{product.category && !product.category.active && <span className="block text-xs text-muted-foreground">Categoria inativa</span>}</TableCell>
        <TableCell className="text-right whitespace-nowrap tabular-nums">{formatCurrency(product.price)}</TableCell>
        <TableCell><div className="flex flex-wrap gap-1">{product.vegetarian && <Badge variant="outline">Vegetariano</Badge>}{product.isNew && <Badge>Novidade</Badge>}{!product.vegetarian && !product.isNew && <span className="text-muted-foreground">—</span>}</div></TableCell>
        <TableCell><Badge variant={product.active ? 'default' : 'outline'}>{product.active ? 'Ativo' : 'Inativo'}</Badge></TableCell>
        <TableCell><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" aria-label={'Editar ' + product.name} onClick={() => onEdit(product)}>Editar</Button><Button size="sm" variant="destructive" aria-label={'Excluir ' + product.name} onClick={() => onDelete(product)}>Excluir</Button></div></TableCell>
      </TableRow>)}</TableBody>
    </Table>
  </div>
}
