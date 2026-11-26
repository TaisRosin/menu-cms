import { useState } from 'react'
import { CheckCircle, Plus } from 'lucide-react'
import { useCategories } from '@/cases/categories/hooks/use-category'
import { ProductList } from '@/cases/products/components/product-list'
import { ProductFormDialog } from '@/cases/products/components/product-form-dialog'
import { ProductDeleteDialog } from '@/cases/products/components/product-delete-dialog'
import type { ProductDTO } from '@/cases/products/dtos/product.dto'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/native-select'
import { apiConfigurationError } from '@/lib/axios'

export function ProductPage() {
  const [categoryId, setCategoryId] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [selected, setSelected] = useState<ProductDTO | null>(null)
  const [deleting, setDeleting] = useState<ProductDTO | null>(null)
  const [notice, setNotice] = useState('')
  const categories = useCategories()
  function openForm(product: ProductDTO | null) { setSelected(product); setNotice(''); setFormOpen(true) }
  return <section aria-labelledby="page-title">
    <header className="mb-8 border-b border-border pb-7">
      <h1 id="page-title" className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">Produtos</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Administre os produtos e suas informações no cardápio.</p>
      <Button className="mt-5" disabled={!!apiConfigurationError} onClick={() => openForm(null)}><Plus aria-hidden="true" />Novo produto</Button>
    </header>
    {notice && <Alert role="status" className="mb-6"><CheckCircle aria-hidden="true" /><AlertTitle>{notice}</AlertTitle></Alert>}
    {!apiConfigurationError && <>
      <div className="mb-6 max-w-sm space-y-2">
        <Label htmlFor="product-category-filter">Filtrar por categoria</Label>
        <NativeSelect id="product-category-filter" value={categoryId} disabled={categories.isPending || categories.isError} onChange={(event) => setCategoryId(event.target.value)}>
          <option value="">Todas as categorias</option>
          {categoryId && !categories.data?.some((category) => category.id === categoryId) && <option value={categoryId}>Categoria indisponível</option>}
          {categories.data?.map((category) => <option key={category.id} value={category.id}>{category.name}{!category.active ? ' (inativa)' : ''}</option>)}
        </NativeSelect>
        {categoryId && <Button variant="ghost" size="sm" onClick={() => setCategoryId('')}>Limpar filtro</Button>}
        {categories.isPending && <p role="status" className="text-sm text-muted-foreground">Carregando categorias…</p>}
      </div>
      {categories.isError && <Alert variant="destructive" className="mb-6"><AlertTitle>Filtro de categorias indisponível</AlertTitle><AlertDescription><p>Não foi possível carregar as categorias.</p><Button variant="outline" disabled={categories.isFetching} onClick={() => void categories.refetch()}>Recarregar categorias</Button></AlertDescription></Alert>}
      <ProductList categoryId={categoryId} onEdit={openForm} onDelete={(product) => { setNotice(''); setDeleting(product) }} />
    </>}
    {formOpen && <ProductFormDialog product={selected} onClose={() => setFormOpen(false)} onSuccess={(message) => { setNotice(message); setFormOpen(false) }} />}
    {deleting && <ProductDeleteDialog product={deleting} onClose={() => setDeleting(null)} onSuccess={(message) => { setNotice(message); setDeleting(null) }} />}
  </section>
}
