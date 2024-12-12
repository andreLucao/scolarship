// app/types.ts
export interface University {
  id: number
  name: string
  country: string
  description: string
  website: string
  scholarships: {
    name: string
    amount: string
    deadline: string
  }[]
}