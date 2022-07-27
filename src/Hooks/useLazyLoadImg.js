import React, { useEffect } from "react";
import useLazyLoadGroup from "./useLazyLoadGroup";

const useLazyLoadImg = () => {
  const { ref, scrollpoint } = useLazyLoadGroup();
  useEffect(() => {
    const img = ref.current;
    if (scrollpoint) {
      img.setAttribute("src", img.alt);
      img.classList.add("active");
    }
  }, [scrollpoint]);
  return { ref };
};

export default useLazyLoadImg;
