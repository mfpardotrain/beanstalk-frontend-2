import { useEffect } from 'react'

export const useOnClickOutside = (ref, handler, isSelected) => {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current.contains(event.target) || !isSelected) {
        return
      }
      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [isSelected])
}
