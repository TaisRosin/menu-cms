import { useState, type FormEvent } from 'react'
import { getApiErrorMessage } from '@/lib/api-error'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { CategoryDTO, CategoryInputDTO } from '../dtos/category.dto'
import { useCreateCategory, useUpdateCategory } from '../hooks/use-category'

type CategoryFormDialogProps = {
  category: CategoryDTO | null
  onClose: () => void
  onSuccess: (message: string) => void
}

export function CategoryFormDialog({ category, onClose, onSuccess }: CategoryFormDialogProps) {
  const [name, setName] = useState(category?.name ?? '')
  const [icon, setIcon] = useState(category?.icon ?? '')
  const [order, setOrder] = useState(String(category?.displayOrder ?? 0))
  const [active, setActive] = useState(category?.active ?? true)
  const [error, setError] = useState('')
  const create = useCreateCategory()
  const update = useUpdateCategory()
  const pending = create.isPending || update.isPending

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setError('')
    const trimmedName = name.trim()
    const trimmedIcon = icon.trim()
    const displayOrder = Number(order)
    if (!trimmedName || trimmedName.length > 60) {
      setError('Informe um nome de 1 a 60 caracteres, sem contar espaços nas extremidades.')
      return
    }
    if (trimmedIcon) {
      try {
        const url = new URL(trimmedIcon)
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
      } catch {
        setError('Informe uma URL HTTP ou HTTPS válida para o ícone, ou deixe o campo vazio.')
        return
      }
    }
    if (!order.trim() || !Number.isInteger(displayOrder) || displayOrder < 0 || displayOrder > 2147483647) {
      setError('Informe uma ordem inteira entre 0 e 2147483647.')
      return
    }
    const data: CategoryInputDTO = { name: trimmedName, icon: trimmedIcon || null, active, displayOrder }
    try {
      if (category) await update.mutateAsync({ id: category.id, data })
      else await create.mutateAsync(data)
      onSuccess(category ? 'Categoria atualizada com sucesso.' : 'Categoria cadastrada com sucesso.')
    } catch (cause) {
      setError(getApiErrorMessage(cause, 'Não foi possível salvar a categoria. Verifique a conexão e tente novamente.'))
    }
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open && !pending) onClose() }}>
      <DialogContent showCloseButton={!pending}>
        <DialogHeader>
          <DialogTitle>{category ? 'Editar categoria' : 'Nova categoria'}</DialogTitle>
          <DialogDescription>Preencha as informações da categoria. O ícone é opcional.</DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={(event) => void handleSubmit(event)} className="space-y-5">
          {error && (
            <Alert variant="destructive">
              <AlertCircle aria-hidden="true" />
              <AlertTitle>Não foi possível salvar</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <fieldset disabled={pending} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="category-name">Nome</Label>
              <Input id="category-name" value={name} onChange={(event) => setName(event.target.value)} required autoFocus />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-icon">URL do ícone (opcional)</Label>
              <Input id="category-icon" type="url" value={icon} onChange={(event) => setIcon(event.target.value)} placeholder="https://..." />
              {category && <p className="text-xs text-muted-foreground">Deixe vazio para remover o ícone atual.</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-order">Ordem de exibição</Label>
              <Input id="category-order" type="number" min={0} max={2147483647} step={1} value={order} onChange={(event) => setOrder(event.target.value)} required />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="category-active">Categoria ativa</Label>
              <Switch id="category-active" checked={active} onCheckedChange={setActive} disabled={pending} />
            </div>
          </fieldset>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={pending} onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={pending}>{pending ? 'Salvando…' : 'Salvar categoria'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
