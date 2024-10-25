import { useCallback, useEffect } from 'react'
import { useBlocker } from 'react-router-dom'
import { useExitConfirm } from './useExitConfirm'

export interface UseExitPromptProps {
  title?: string
  subtitle?: string
  confirmText?: string
  cancelText?: string
}

export const useExitPrompt = ({
  isDirty = false,
  title = 'You have unsaved changes',
  subtitle = 'Are you sure you want to leave this page without saving?',
  confirmText = 'Leave',
  cancelText = 'Stay'
}: UseExitPromptProps & { isDirty?: boolean }) => {
  const blocker = useBlocker(isDirty)
  const { show } = useExitConfirm()

  const confirm = useCallback(() => {
    if (!isDirty) return Promise.resolve(true)
    return new Promise<boolean>(resolve => {
      show({
        title,
        subtitle,
        confirmText,
        cancelText,
        onConfirm: () => {
          resolve(true)
        },
        onCancel: () => {
          resolve(false)
        }
      })
    })
  }, [cancelText, confirmText, isDirty, show, subtitle, title])

  // handle route change
  useEffect(() => {
    if (blocker.state === 'blocked') {
      confirm().then(result => {
        if (result) blocker.proceed()
        else blocker.reset()
      })
    }
  }, [blocker, confirm])

  // handle page exit
  useEffect(() => {
    const onBeforeUnload = (e: Event) => {
      if (isDirty) {
        e.preventDefault()
        return subtitle
      }
    }

    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [isDirty, subtitle])

  return {
    confirm
  }
}
