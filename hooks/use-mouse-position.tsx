"use client"

import { useState, useEffect, useRef } from "react"

export function useMousePosition() {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
    }
    };

    ref.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { ...position, ref };
}
