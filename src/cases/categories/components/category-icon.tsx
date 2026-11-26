import { useState } from 'react'
import { Layers } from 'lucide-react'

export function CategoryIcon({ url }: { url: string | null }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null)

  return (
    <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
      {url && failedUrl !== url ? (
        <img src={url} alt="" className="size-8 object-contain" onError={() => setFailedUrl(url)} />
      ) : (
        <Layers className="size-5" aria-label="Sem ícone disponível" />
      )}
    </div>
  )
}
