import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { getApiErrorMessage } from '@/lib/api-error'
import type { SpotDTO } from '../dtos/spot.dto'
import { useDeleteSpot } from '../hooks/use-spot'

type SpotDeleteDialogProps = {
  spot: SpotDTO
  onClose: () => void
  onSuccess: (message: string) => void
}

export function SpotDeleteDialog({ spot, onClose, onSuccess }: SpotDeleteDialogProps) {
  const remove = useDeleteSpot()
  const [error, setError] = useState('')

  async function handleDelete() {
    if (remove.isPending) return
    setError('')
    try {
      await remove.mutateAsync(spot.id)
      onSuccess('Mesa excluída com sucesso.')
    } catch (cause) {
      setError(getApiErrorMessage(cause, 'Não foi possível excluir a mesa. Verifique a conexão e tente novamente.'))
    }
  }

  return (
    <AlertDialog open onOpenChange={(open) => { if (!open && !remove.isPending) onClose() }}>
      <AlertDialogContent>
        <AlertDialogTitle>Excluir mesa?</AlertDialogTitle>
        <AlertDialogDescription>
          A mesa <strong className="wrap-anywhere text-foreground">{spot.name}</strong> será removida. Esta ação não pode ser desfeita. Mesas com comandas vinculadas não podem ser excluídas.
        </AlertDialogDescription>
        {error && <Alert variant="destructive"><AlertCircle aria-hidden="true" /><AlertTitle>Não foi possível excluir</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <AlertDialogFooter>
          <Button variant="outline" disabled={remove.isPending} onClick={onClose} autoFocus>Cancelar</Button>
          <Button variant="destructive" disabled={remove.isPending} onClick={() => void handleDelete()}>{remove.isPending ? 'Excluindo…' : 'Excluir mesa'}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
