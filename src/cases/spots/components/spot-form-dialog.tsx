import { useState, type FormEvent } from 'react'
import { getApiErrorMessage } from '@/lib/api-error'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { SpotDTO, SpotInputDTO } from '../dtos/spot.dto'
import { useCreateSpot, useUpdateSpot } from '../hooks/use-spot'

type SpotFormDialogProps = {
  spot: SpotDTO | null
  onClose: () => void
  onSuccess: (message: string) => void
}

export function SpotFormDialog({ spot, onClose, onSuccess }: SpotFormDialogProps) {
  const [name, setName] = useState(spot?.name ?? '')
  const [active, setActive] = useState(spot?.active ?? true)
  const [error, setError] = useState('')
  const create = useCreateSpot()
  const update = useUpdateSpot()
  const pending = create.isPending || update.isPending

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setError('')
    const trimmedName = name.trim()
    if (!trimmedName || trimmedName.length > 60) {
      setError('Informe um nome de 1 a 60 caracteres, sem contar espaços nas extremidades.')
      return
    }
    const data: SpotInputDTO = { name: trimmedName, active }
    try {
      if (spot) await update.mutateAsync({ id: spot.id, data })
      else await create.mutateAsync(data)
      onSuccess(spot ? 'Mesa atualizada com sucesso.' : 'Mesa cadastrada com sucesso.')
    } catch (cause) {
      setError(getApiErrorMessage(cause, 'Não foi possível salvar a mesa. Verifique a conexão e tente novamente.'))
    }
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open && !pending) onClose() }}>
      <DialogContent showCloseButton={!pending}>
        <DialogHeader>
          <DialogTitle>{spot ? 'Editar mesa' : 'Nova mesa'}</DialogTitle>
          <DialogDescription>Informe o nome e a situação da mesa.</DialogDescription>
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
              <Label htmlFor="spot-name">Nome</Label>
              <Input id="spot-name" value={name} onChange={(event) => setName(event.target.value)} required autoFocus />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="spot-active">Mesa ativa</Label>
              <Switch id="spot-active" checked={active} onCheckedChange={setActive} disabled={pending} />
            </div>
          </fieldset>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={pending} onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={pending}>{pending ? 'Salvando…' : 'Salvar mesa'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
