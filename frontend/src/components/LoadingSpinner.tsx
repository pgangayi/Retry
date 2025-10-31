import { Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <Loader2
      className={cn('animate-spin text-gray-600', sizeClasses[size], className)}
    />
  )
}

interface LoadingStateProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingState = ({ message = 'Loading...', size = 'md', className }: LoadingStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-4', className)}>
      <LoadingSpinner size={size} />
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  )
}

interface LoadingOverlayProps {
  message?: string
  isVisible: boolean
}

export const LoadingOverlay = ({ message = 'Loading...', isVisible }: LoadingOverlayProps) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <LoadingState message={message} />
      </div>
    </div>
  )
}