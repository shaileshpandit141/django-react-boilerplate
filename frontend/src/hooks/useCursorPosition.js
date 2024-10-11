import { useState, useEffect } from 'react'

export function useCursorPosition() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return cursorPosition
}
