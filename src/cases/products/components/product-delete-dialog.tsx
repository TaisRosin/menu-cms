import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { getApiErrorMessage } from '@/lib/api-error'
import type { ProductDTO } from '../dtos/product.dto'
import { useDeleteProduct } from '../hooks/use-product'

type ProductDeleteDialogProps = {
  product: ProductDTO
  onClose: () => void
  onSuccess: (message: string) => void
}

export function ProductDeleteDialog({ product, onClose, onSuccess }: ProductDeleteDialogProps) {
  const remove = useDeleteProduct()
  const [error, setError] = useState('')

  async function handleDelete() {
    if (remove.isPending) return
    setError('')
    try {
      await remove.mutateAsync(product.id)
      onSuccess('Produto excluído com sucesso.')
    } catch (cause) {
      setError(getApiErrorMessage(cause, 'Não foi possível excluir o produto. Verifique a conexão e tente novamente.'))
    }
  }

  return (
    <AlertDialog open onOpenChange={(open) => { if (!open && !remove.isPending) onClose() }}>
      <AlertDialogContent>
        <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
        <AlertDialogDescription>
          O produto <strong className="wrap-anywhere text-foreground">{product.name}</strong> será removido. Esta ação não pode ser desfeita. Produtos usados em pedidos não podem ser excluídos.
        </AlertDialogDescription>
        {error && <Alert variant="destructive"><AlertCircle aria-hidden="true" /><AlertTitle>Não foi possível excluir</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <AlertDialogFooter>
          <Button variant="outline" disabled={remove.isPending} onClick={onClose} autoFocus>Cancelar</Button>
          <Button variant="destructive" disabled={remove.isPending} onClick={() => void handleDelete()}>{remove.isPending ? 'Excluindo…' : 'Excluir produto'}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
