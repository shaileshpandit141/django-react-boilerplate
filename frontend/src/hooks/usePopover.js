import { useState, useEffect } from "react"

export function usePopover(popoverButtonRef, popoverRef) {

  const [isVisible, setIsVisible] = useState(false)
  const [initialVisibleStyle, setInitialVisibleStyle] = useState(
    {
      opacity: 1,
      visibility: "visible",
      transform: "scale(1)"
    }
  )
  const [initialHiddenStyle, setInitialHiddenStyles] = useState(
    {
      opacity: 0,
      visibility: "hidden",
      transform: "scale(.98)"
    }
  )

  // Toggle the popover visibility when button is clicked
  const togglePopover = () => {
    setIsVisible(prev => !prev)
  }

  // Close popover if clicked outside
  useEffect(() => {
    // Get all class names as an array from ref.current.classList
    function getPopoverButtonClassName() {
      if (popoverButtonRef.current) {
        const classNamesArray = Array.from(popoverButtonRef.current.classList)
        if (classNamesArray.length > 0) {
          return classNamesArray[0]
        } else {
          throw new Error("set at least one class name in popover button.")
        }
      }
      return ' '
    }

    const handleClickOutside = (event) => {
      if (popoverRef.current
        && !popoverRef.current.contains(event.target)
        && !event.target.closest(`.${getPopoverButtonClassName()}`)) {
        setIsVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [popoverButtonRef, popoverRef, setIsVisible])

  let popoverStyleWithState = isVisible ? initialVisibleStyle : initialHiddenStyle

  useEffect(() => {
    if ((initialHiddenStyle || initialVisibleStyle) && popoverRef.current) {
      popoverRef.current.style["position"] = "absolute"
      popoverRef.current.style["visibility"] = "hidden"
      popoverRef.current.style["transition"] = "transform 0.3s ease-in-out, visibility 0.3s ease-in-out"
      Object.entries(popoverStyleWithState).forEach(([key, value]) => {
        popoverRef.current.style[key] = value
      })
    }
  }, [initialHiddenStyle, initialVisibleStyle, popoverRef, popoverStyleWithState])
 
  return { togglePopover, setInitialVisibleStyle, setInitialHiddenStyles }
}
