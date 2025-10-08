"use client";
import React, { useEffect } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = () => setMatches(media.matches);

    setMatches(media.matches);

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};
