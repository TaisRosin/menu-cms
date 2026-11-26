export interface CategoryDTO {
  id: string
  name: string
  icon: string | null
  active: boolean
  displayOrder: number
}

export interface CategoryInputDTO {
  name: string
  icon: string | null
  active: boolean
  displayOrder: number
}
