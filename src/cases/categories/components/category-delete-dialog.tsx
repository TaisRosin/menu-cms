import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { getApiErrorMessage } from '@/lib/api-error'
import type { CategoryDTO } from '../dtos/category.dto'
import { useDeleteCategory } from '../hooks/use-category'

type CategoryDeleteDialogProps = {
  category: CategoryDTO
  onClose: () => void
  onSuccess: (message: string) => void
}

export function CategoryDeleteDialog({ category, onClose, onSuccess }: CategoryDeleteDialogProps) {
  const remove = useDeleteCategory()
  const [error, setError] = useState('')

  async function handleDelete() {
    if (remove.isPending) return
    setError('')
    try {
      await remove.mutateAsync(category.id)
      onSuccess('Categoria excluída com sucesso.')
    } catch (cause) {
      setError(getApiErrorMessage(cause, 'Não foi possível excluir a categoria. Verifique a conexão e tente novamente.'))
    }
  }

  return (
    <AlertDialog open onOpenChange={(open) => { if (!open && !remove.isPending) onClose() }}>
      <AlertDialogContent>
        <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
        <AlertDialogDescription>
          A categoria <strong className="wrap-anywhere text-foreground">{category.name}</strong> será removida. Esta ação não pode ser desfeita. Categorias com produtos vinculados não podem ser excluídas.
        </AlertDialogDescription>
        {error && <Alert variant="destructive"><AlertCircle aria-hidden="true" /><AlertTitle>Não foi possível excluir</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <AlertDialogFooter>
          <Button variant="outline" disabled={remove.isPending} onClick={onClose} autoFocus>Cancelar</Button>
          <Button variant="destructive" disabled={remove.isPending} onClick={() => void handleDelete()}>{remove.isPending ? 'Excluindo…' : 'Excluir categoria'}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
