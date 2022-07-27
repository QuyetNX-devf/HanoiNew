import React, { useEffect, useState } from "react";
import { useRef } from "react";

const useLazyLoadGroup = () => {
  const [scrollpoint, setScrollpoint] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const anchor = ref.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!scrollpoint) {
          setScrollpoint(true);
        }
      }
    });
    if (anchor) observer.observe(anchor);
    return () => {
      if (anchor) observer.unobserve(anchor);
    };
  }, []);

  return { ref, scrollpoint };
};

export default useLazyLoadGroup;
