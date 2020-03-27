import { useEffect } from 'react'

type UseKeyListener = (
  callback: (key: string) => void,
  options?: {
    eventName?: string
    preventDefault?: boolean
  },
) => void

/**
 * Listens for key events and calls back a function passing the key name as parameter.
 * The default event to listen is 'keydown', but it's possible to choose
 * another one by passing a second argument.
 */
const useKeyListener: UseKeyListener = (callback: (key: string) => void, options = {}): void => {
  const { eventName = 'keydown', preventDefault = false } = options
  useEffect(() => {
    const handleKeys: EventListener = (event: Event) => {
      const { key } = event as KeyboardEvent

      if (preventDefault) event.preventDefault()

      if (key) {
        callback(key)
      }
    }

    document.addEventListener(eventName, handleKeys)

    return (): void => document.removeEventListener(eventName, handleKeys)
  }, [callback])
}

export default useKeyListener
