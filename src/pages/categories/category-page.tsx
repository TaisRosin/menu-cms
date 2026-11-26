import { CategoryList } from '@/cases/categories/components/category-list'
import { apiConfigurationError } from '@/lib/axios'

export function CategoryPage() {
  return (
    <section aria-labelledby="page-title">
      <header className="mb-8 border-b border-border pb-7">
        <h1 id="page-title" className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">Categorias</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Organização das categorias do cardápio.</p>
      </header>
      {!apiConfigurationError && <CategoryList />}
    </section>
  )
}
