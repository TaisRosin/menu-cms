import { SpotList } from '@/cases/spots/components/spot-list'
import { apiConfigurationError } from '@/lib/axios'
import { useState } from 'react'
import { CheckCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { SpotFormDialog } from '@/cases/spots/components/spot-form-dialog'
import { SpotDeleteDialog } from '@/cases/spots/components/spot-delete-dialog'
import type { SpotDTO } from '@/cases/spots/dtos/spot.dto'

export function SpotPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [selected, setSelected] = useState<SpotDTO | null>(null)
  const [notice, setNotice] = useState('')
  const [deleteSpot, setDeleteSpot] = useState<SpotDTO | null>(null)

  function openForm(spot: SpotDTO | null) {
    setSelected(spot)
    setNotice('')
    setFormOpen(true)
  }

  return (
    <section aria-labelledby="page-title">
      <header className="mb-8 border-b border-border pb-7">
        <h1 id="page-title" className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">Mesas</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Administre as mesas e sua disponibilidade.</p>
        <Button className="mt-5" disabled={!!apiConfigurationError} onClick={() => openForm(null)}><Plus aria-hidden="true" /> Nova mesa</Button>
      </header>
      {notice && <Alert role="status" className="mb-6"><CheckCircle aria-hidden="true" /><AlertTitle>{notice}</AlertTitle></Alert>}
      {!apiConfigurationError && <SpotList onEdit={openForm} onDelete={(spot) => { setNotice(''); setDeleteSpot(spot) }} />}
      {formOpen && <SpotFormDialog spot={selected} onClose={() => setFormOpen(false)} onSuccess={(message) => { setNotice(message); setFormOpen(false) }} />}
      {deleteSpot && <SpotDeleteDialog spot={deleteSpot} onClose={() => setDeleteSpot(null)} onSuccess={(message) => { setNotice(message); setDeleteSpot(null) }} />}
    </section>
  )
}
