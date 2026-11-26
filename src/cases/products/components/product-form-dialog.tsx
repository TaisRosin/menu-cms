import { useState, type FormEvent } from 'react'
import { AlertCircle } from 'lucide-react'
import { useCategories } from '@/cases/categories/hooks/use-category'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { getApiErrorMessage } from '@/lib/api-error'
import type { ProductDTO, ProductInputDTO } from '../dtos/product.dto'
import { useCreateProduct, useUpdateProduct } from '../hooks/use-product'

type Props = { product: ProductDTO | null; onClose: () => void; onSuccess: (message: string) => void }

export function ProductFormDialog({ product, onClose, onSuccess }: Props) {
  const [name, setName] = useState(product?.name ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [price, setPrice] = useState(product ? String(product.price).replace('.', ',') : '')
  const [picture, setPicture] = useState(product?.picture ?? '')
  const [categoryId, setCategoryId] = useState(product?.category?.id ?? '')
  const [active, setActive] = useState(product?.active ?? true)
  const [vegetarian, setVegetarian] = useState(product?.vegetarian ?? false)
  const [isNew, setIsNew] = useState(product?.isNew ?? false)
  const [error, setError] = useState('')
  const categories = useCategories()
  const create = useCreateProduct()
  const update = useUpdateProduct()
  const pending = create.isPending || update.isPending
  const originalCategory = product?.category
  const options = categories.data?.filter((category) => category.active || category.id === originalCategory?.id) ?? []
  const missingOriginal = originalCategory && !options.some((category) => category.id === originalCategory.id)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setError('')
    const trimmedName = name.trim()
    const trimmedPicture = picture.trim()
    const normalizedPrice = price.trim().replace(',', '.')
    const numericPrice = Number(normalizedPrice)
    if (!trimmedName || trimmedName.length > 60) {
      setError('Informe um nome de 1 a 60 caracteres, sem contar espaços nas extremidades.')
      return
    }
    if (!/^\d+(\.\d{1,2})?$/.test(normalizedPrice) || numericPrice < 0.01 || numericPrice > 99999999.99) {
      setError('Informe um preço de R$ 0,01 a R$ 99.999.999,99, com até duas casas decimais e sem separador de milhar.')
      return
    }
    if (trimmedPicture) {
      try {
        const url = new URL(trimmedPicture)
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
      } catch {
        setError('Informe uma URL HTTP ou HTTPS válida para a imagem, ou deixe vazio.')
        return
      }
    }
    if (categoryId && categoryId !== originalCategory?.id && !categories.data?.some((category) => category.id === categoryId && category.active)) {
      setError('Selecione uma categoria ativa disponível ou deixe sem categoria.')
      return
    }
    const data: ProductInputDTO = {
      name: trimmedName, description: description.trim() || null, price: numericPrice,
      picture: trimmedPicture || null, categoryId: categoryId || null, active, vegetarian, isNew,
    }
    try {
      if (product) await update.mutateAsync({ id: product.id, data })
      else await create.mutateAsync(data)
      onSuccess(product ? 'Produto atualizado com sucesso.' : 'Produto cadastrado com sucesso.')
    } catch (cause) {
      setError(getApiErrorMessage(cause, 'Não foi possível salvar o produto. Verifique a conexão e tente novamente.'))
    }
  }

  return <Dialog open onOpenChange={(open) => { if (!open && !pending) onClose() }}>
    <DialogContent showCloseButton={!pending} className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>{product ? 'Editar produto' : 'Novo produto'}</DialogTitle>
        <DialogDescription>Informe nome e preço. Imagem, descrição e categoria são opcionais.</DialogDescription>
      </DialogHeader>
      <form noValidate className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
        {error && <Alert variant="destructive"><AlertCircle aria-hidden="true" /><AlertTitle>Não foi possível salvar</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <fieldset disabled={pending} className="space-y-4">
          <div className="space-y-2"><Label htmlFor="product-name">Nome</Label><Input id="product-name" value={name} onChange={(event) => setName(event.target.value)} required autoFocus /></div>
          <div className="space-y-2"><Label htmlFor="product-description">Descrição (opcional)</Label><Textarea id="product-description" value={description} onChange={(event) => setDescription(event.target.value)} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="product-price">Preço (R$)</Label><Input id="product-price" inputMode="decimal" placeholder="Ex.: 29,90" value={price} onChange={(event) => setPrice(event.target.value)} required /></div>
            <div className="space-y-2">
              <Label htmlFor="product-category">Categoria (opcional)</Label>
              <NativeSelect id="product-category" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} disabled={categories.isPending || categories.isError}>
                <option value="">Sem categoria</option>
                {missingOriginal && <option value={originalCategory.id}>{originalCategory.name} (atual)</option>}
                {options.map((category) => <option key={category.id} value={category.id}>{category.name}{!category.active ? ' (inativa — vínculo atual)' : ''}</option>)}
              </NativeSelect>
            </div>
          </div>
          {categories.isPending && <p role="status" className="text-sm text-muted-foreground">Carregando categorias…</p>}
          {categories.isError && <Alert variant="destructive"><AlertTitle>Não foi possível carregar as categorias</AlertTitle><AlertDescription><p>Tente novamente para escolher uma categoria. O vínculo atual será preservado.</p><Button type="button" variant="outline" disabled={categories.isFetching} onClick={() => void categories.refetch()}>Tentar novamente</Button></AlertDescription></Alert>}
          {!categories.isPending && !categories.isError && !categories.data?.some((category) => category.active) && <p className="text-sm text-muted-foreground">Nenhuma categoria ativa disponível. Você pode salvar sem categoria ou manter o vínculo atual.</p>}
          <div className="space-y-2"><Label htmlFor="product-picture">URL da imagem (opcional)</Label><Input id="product-picture" type="url" placeholder="https://..." value={picture} onChange={(event) => setPicture(event.target.value)} /><p className="text-xs text-muted-foreground">Deixe vazio para remover a imagem.</p></div>
          <div className="grid gap-3 rounded-lg border p-3">
            <div className="flex items-center justify-between"><Label htmlFor="product-active">Produto ativo</Label><Switch id="product-active" checked={active} onCheckedChange={setActive} disabled={pending} /></div>
            <div className="flex items-center justify-between"><Label htmlFor="product-vegetarian">Vegetariano</Label><Switch id="product-vegetarian" checked={vegetarian} onCheckedChange={setVegetarian} disabled={pending} /></div>
            <div className="flex items-center justify-between"><Label htmlFor="product-new">Novidade</Label><Switch id="product-new" checked={isNew} onCheckedChange={setIsNew} disabled={pending} /></div>
          </div>
        </fieldset>
        <DialogFooter><Button type="button" variant="outline" disabled={pending} onClick={onClose}>Cancelar</Button><Button type="submit" disabled={pending}>{pending ? 'Salvando…' : 'Salvar produto'}</Button></DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
}
