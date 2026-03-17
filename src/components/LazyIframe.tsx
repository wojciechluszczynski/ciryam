import { useState, useRef, useEffect } from "react";

interface LazyIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  fallbackHeight?: string;
}

const LazyIframe = ({ fallbackHeight = "300px", height, width, className, ...props }: LazyIframeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // If height is a number or pixel string, use it as explicit height; otherwise use 100% for flex/aspect containers
  const isExplicitHeight = height && height !== "100%";

  useEffect(() => {
    const el = containerRef.current;
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

  return (
    <div
      ref={containerRef}
      style={{ minHeight: fallbackHeight, height: isExplicitHeight ? height : undefined }}
      className={isExplicitHeight ? "w-full" : "w-full h-full"}
    >
      {isVisible ? (
        <iframe
          {...props}
          width={width}
          height={isExplicitHeight ? height : undefined}
          className={className}
          style={{ display: "block", width: "100%", height: isExplicitHeight ? "100%" : "100%" }}
        />
      ) : null}
    </div>
  );
};

export default LazyIframe;
