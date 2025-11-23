// components/Masonry.tsx
"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";

// === useMedia Hook ===
const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = useCallback(() => {
    if (typeof window !== "undefined") {
      const index = queries.findIndex((q) => window.matchMedia(q).matches);
      return values[index] ?? defaultValue;
    }
    return defaultValue;
  }, [queries, values, defaultValue]);

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setValue(get);
    const mediaQueryLists = queries.map((q) => window.matchMedia(q));
    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));
    setValue(get());
    return () => {
      mediaQueryLists.forEach((mql) => mql.removeEventListener("change", handler));
    };
  }, [queries, get]);

  return value;
};

// === useMeasure Hook ===
const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const initialRect = ref.current.getBoundingClientRect();
    setSize({ width: initialRect.width, height: initialRect.height });

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

// === preloadImages ===
const preloadImages = async (urls: string[]): Promise<void> => {
  if (!urls || urls.length === 0) return;
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

// ==============================
// ITEM TANPA TEKS — Hanya gambar
// ==============================
export interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

// === Props Masonry ===
interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  gaps?: number[];
  columns?: {
    default: number;
    [breakpoint: number]: number;
  };
}

// === Masonry Component ===
const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  gaps = [4, 8, 16, 24],
  columns: userColumns,
}) => {
  // Sort breakpoints
  const sortedBreakpoints = Object.keys(userColumns ?? {})
    .filter((k) => k !== "default")
    .map((n) => parseInt(n))
    .sort((a, b) => a - b);

  const mediaQueries = sortedBreakpoints.map((bp) => `(min-width:${bp}px)`);
  const mediaValues = sortedBreakpoints.map(
    (bp) => userColumns?.[bp] ?? userColumns?.default ?? 3
  );

  const columns = useMedia(mediaQueries, mediaValues, userColumns?.default ?? 3);

  // Responsive gap
  const gap = useMedia(
    ["(min-width:1000px)", "(min-width:768px)", "(min-width:480px)", "(min-width:320px)"],
    [gaps[3] ?? 24, gaps[2] ?? 16, gaps[1] ?? 8, gaps[0] ?? 4],
    gaps[0] ?? 4
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  // Preload images
  useEffect(() => {
    if (items.length > 0) {
      preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
    }
  }, [items]);

  // Get initial animation position
  const getInitialPosition = useCallback(
    (item: GridItem) => {
      if (typeof window === "undefined") return { x: item.x, y: item.y + 100 };
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return { x: item.x, y: item.y + 100 };

      let direction = animateFrom;
      if (animateFrom === "random") {
        const dirs = ["top", "bottom", "left", "right"];
        direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
      }

      switch (direction) {
        case "top":
          return { x: item.x, y: -containerRect.height / 2 };
        case "bottom":
          return { x: item.x, y: containerRect.height * 1.5 };
        case "left":
          return { x: -containerRect.width / 2, y: item.y };
        case "right":
          return { x: containerRect.width * 1.5, y: item.y };
        case "center":
          return {
            x: containerRect.width / 2 - item.w / 2,
            y: containerRect.height / 2 - item.h / 2,
          };
        default:
          return { x: item.x, y: item.y + 100 };
      }
    },
    [animateFrom, containerRef]
  );

  // Generate grid
  const grid = useMemo<GridItem[]>(() => {
    if (!width || items.length === 0 || columns === 0) return [];

    const colHeights = new Array(columns).fill(0);
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const calculatedHeight = columnWidth * child.height;
      const y = colHeights[col];

      colHeights[col] += calculatedHeight + gap;
      return { ...child, x, y, w: columnWidth, h: calculatedHeight };
    });
  }, [columns, items, width, gap]);

  // Animate
  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) {
      hasMounted.current = false;
      return;
    }

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: duration,
            ease: ease,
            delay: index * stagger,
            overwrite: "auto",
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    if (!hasMounted.current) {
      const maxDelay = grid.length > 0 ? (grid.length - 1) * stagger : 0;
      gsap.to({}, {
        delay: maxDelay + duration,
        onComplete: () => {
          hasMounted.current = true;
        },
      });
    }
  }, [grid, imagesReady]);

  // Hover animation
  const handleMouseEnter = useCallback(
    (id: string, element: HTMLElement) => {
      gsap.to(`[data-key="${id}"]`, {
        scale: scaleOnHover ? hoverScale : 1,
        duration: 0.3,
        ease: "power2.out",
        zIndex: 10,
        boxShadow: "0px 15px 60px -15px rgba(0,0,0,0.4)",
      });
    },
    [scaleOnHover, hoverScale]
  );

  const handleMouseLeave = useCallback((id: string) => {
    gsap.to(`[data-key="${id}"]`, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      zIndex: 1,
      boxShadow: "0px 10px 50px -10px rgba(0,0,0,0.2)",
    });
  }, []);

  // Render
  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: Math.max(0, ...grid.map((item) => item.y + item.h)) }}
    >
      {!imagesReady && items.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Loading Images...
        </div>
      )}

      {grid.map((item) => (
        <div
  key={item.id}
  data-key={item.id}
  className="absolute box-border cursor-default overflow-hidden rounded-[10px]"
  style={{
    opacity: imagesReady && hasMounted.current ? 1 : 0,
    transform: `translate3d(${item.x}px, ${item.y}px, 0px)`,
    width: item.w,
    height: item.h,
  }}
  onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
  onMouseLeave={() => handleMouseLeave(item.id)}
>
  <div
    className="w-full h-full bg-cover bg-center rounded-[10px]"
    style={{ backgroundImage: `url(${item.img})` }}
  />
</div>

      ))}
    </div>
  );
};

export default Masonry;
