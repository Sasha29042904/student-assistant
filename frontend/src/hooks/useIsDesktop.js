import { useState, useEffect } from "react";

function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event) => setIsDesktop(event.matches);
    
    mediaQueryList.addEventListener("change", handleChange);
    
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, []);

  return isDesktop;
}

export default useIsDesktop;