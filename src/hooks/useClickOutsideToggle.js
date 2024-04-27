import { useEffect, useRef, useState } from "react";

// Custom hook to handle click events outside the toggle
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Function to handle click events outside the toggle
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    // Add event listener for mouseup events
    document.addEventListener("mouseup", handleClickOutside);
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;