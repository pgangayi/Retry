import { createFileRoute } from '@tanstack/react-router'
import AnimalsPage from '../pages/AnimalsPage'

export const Route = createFileRoute('/animals')({
  component: AnimalsPage,
})