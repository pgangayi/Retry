import { createFileRoute } from '@tanstack/react-router'
import FieldsPage from '../pages/FieldsPage'

export const Route = createFileRoute('/fields')({
  component: FieldsPage,
})