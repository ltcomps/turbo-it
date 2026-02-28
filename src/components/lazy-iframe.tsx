"use client";

import { useState, useEffect, useRef } from "react";

interface LazyIframeProps {
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  /** Only load when this is true (e.g. active carousel card). Defaults to true. */
  active?: boolean;
  /** Delay in ms after becoming visible + active before loading. Defaults to 0. */
  delay?: number;
  /** Gradient color for placeholder. Defaults to a neutral gray. */
  placeholderColor?: string;
  scrolling?: string;
}

export function LazyIframe({
  src,
  title,
  className,
  style,
  active = true,
  delay = 0,
  placeholderColor,
  scrolling,
}: LazyIframeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Intersection Observer — track when the container enters the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When visible AND active, start the delay timer
  useEffect(() => {
    if (!isVisible || !active) return;
    if (delay <= 0) {
      setShouldLoad(true);
      return;
    }
    const timer = setTimeout(() => setShouldLoad(true), delay);
    return () => clearTimeout(timer);
  }, [isVisible, active, delay]);

  const placeholderBg = placeholderColor
    ? `linear-gradient(135deg, ${placeholderColor}15, ${placeholderColor}30)`
    : "linear-gradient(135deg, hsl(0 0% 50% / 0.08), hsl(0 0% 50% / 0.15))";

  return (
    <div ref={ref} className="relative h-full w-full">
      {/* Placeholder — visible until iframe loads */}
      {!hasLoaded && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: placeholderBg }}
        >
          {shouldLoad && (
            <div className="flex flex-col items-center gap-2">
              <div className="size-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
            </div>
          )}
        </div>
      )}

      {/* Actual iframe — only rendered when conditions met */}
      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          className={className}
          style={style}
          scrolling={scrolling}
          onLoad={() => setHasLoaded(true)}
        />
      )}
    </div>
  );
}
