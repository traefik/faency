import { useEffect, RefObject } from 'react'

/**
 * Listens for clicks that doesn't have target inside a referenced element,
 * calls back a function when it happens.
 */
export default function useClickOutside(elementRef: RefObject<HTMLElement>, callback: () => void): void {
  useEffect(() => {
    const handleClickOutside: EventListener = (event: unknown) => {
      const { target } = event as MouseEvent
      if (elementRef.current && target instanceof Node && !elementRef.current.contains(target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return (): void => document.removeEventListener('mousedown', handleClickOutside)
  }, [elementRef, callback])
}
