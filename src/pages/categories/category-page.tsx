import { CategoryList } from '@/cases/categories/components/category-list'
import { apiConfigurationError } from '@/lib/axios'
import { useState } from 'react'
import { CheckCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { CategoryFormDialog } from '@/cases/categories/components/category-form-dialog'
import { CategoryDeleteDialog } from '@/cases/categories/components/category-delete-dialog'
import type { CategoryDTO } from '@/cases/categories/dtos/category.dto'

export function CategoryPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [selected, setSelected] = useState<CategoryDTO | null>(null)
  const [notice, setNotice] = useState('')
  const [deleteCategory, setDeleteCategory] = useState<CategoryDTO | null>(null)

  function openForm(category: CategoryDTO | null) {
    setSelected(category)
    setNotice('')
    setFormOpen(true)
  }

  return (
    <section aria-labelledby="page-title">
      <header className="mb-8 border-b border-border pb-7">
        <h1 id="page-title" className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">Categorias</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Organização das categorias do cardápio.</p>
        <Button className="mt-5" disabled={!!apiConfigurationError} onClick={() => openForm(null)}><Plus aria-hidden="true" /> Nova categoria</Button>
      </header>
      {notice && <Alert role="status" className="mb-6"><CheckCircle aria-hidden="true" /><AlertTitle>{notice}</AlertTitle></Alert>}
      {!apiConfigurationError && <CategoryList onEdit={openForm} onDelete={(category) => { setNotice(''); setDeleteCategory(category) }} />}
      {formOpen && <CategoryFormDialog category={selected} onClose={() => setFormOpen(false)} onSuccess={(message) => { setNotice(message); setFormOpen(false) }} />}
      {deleteCategory && <CategoryDeleteDialog category={deleteCategory} onClose={() => setDeleteCategory(null)} onSuccess={(message) => { setNotice(message); setDeleteCategory(null) }} />}
    </section>
  )
}
