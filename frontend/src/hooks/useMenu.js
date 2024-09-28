import { useState, useEffect, useCallback } from "react";

export function useMenu(menuButtonRef, menuRef) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleStyle, setVisibleStyle] = useState({
    opacity: 1,
    visibility: "visible"
  });
  const [hiddenStyle, setHiddenStyle] = useState({
    opacity: 0,
    visibility: "hidden"
  });

  // Toggle the menu visibility when the button is clicked
  const toggleMenu = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // Close menu if clicked outside
  const handleClickOutside = useCallback((event) => {
    // Get all class names as an array from ref.current.classList
    function getMenuButtonClassName() {
      if (menuButtonRef.current) {
        const classNamesArray = Array.from(menuButtonRef.current.classList);
        if (classNamesArray.length > 0) {
          return classNamesArray[0];
        } else {
          throw new Error("Set at least one class name in the menu button.");
        }
      }
      return " ";
    }

    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.closest(`.${getMenuButtonClassName()}`)
    ) {
      setIsVisible(false);
    }
  }, [menuButtonRef, menuRef]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);


  useEffect(() => {
    if (menuRef.current) {
      let menuStyleWithState = isVisible ? visibleStyle : hiddenStyle;

      menuRef.current.style["position"] = "absolute";
      menuRef.current.style["visibility"] = "hidden";
      menuRef.current.style["z-index"] = "999";
      Object.assign(menuRef.current.style, menuStyleWithState)
    }
  }, [hiddenStyle, visibleStyle, isVisible, menuRef]);

  return { toggleMenu, setVisibleStyle, setHiddenStyle };
}
