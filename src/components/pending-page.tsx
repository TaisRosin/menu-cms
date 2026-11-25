import { Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type PendingPageProps = {
  title: string
  description: string
}

export function PendingPage({ title, description }: PendingPageProps) {
  return (
    <section aria-labelledby="page-title">
      <header className="mb-8 border-b border-border pb-7">
        <h1 id="page-title" className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      </header>
      <Alert className="max-w-2xl">
        <Info aria-hidden="true" />
        <AlertTitle>Funcionalidade ainda não implementada</AlertTitle>
        <AlertDescription>Esta seção será disponibilizada em uma próxima etapa do projeto.</AlertDescription>
      </Alert>
    </section>
  )
}
