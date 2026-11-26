import { useState } from 'react'
import { ImageOff } from 'lucide-react'

export function ProductImage({ url }: { url: string | null }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null)

  return (
    <div className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
      {url && failedUrl !== url ? (
        <img src={url} alt="" className="size-12 rounded-lg object-cover" onError={() => setFailedUrl(url)} />
      ) : (
        <ImageOff className="size-5" aria-label="Sem imagem disponível" />
      )}
    </div>
  )
}
