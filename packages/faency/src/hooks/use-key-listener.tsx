import { useEffect } from 'react'

/**
 * Listens for key events and calls back a function passing the key name as parameter.
 * The default event to listen is 'keydown', but it's possible to choose
 * another one by passing a second argument.
 */
export default function useKeyListener(callback: (key: string) => void, eventName = 'keydown'): void {
  useEffect(() => {
    const handleKeys: EventListener = (event: unknown) => {
      const { key } = event as KeyboardEvent

      if (key) {
        callback(key)
      }
    }

    document.addEventListener(eventName, handleKeys)

    return (): void => document.removeEventListener(eventName, handleKeys)
  }, [callback])
}
