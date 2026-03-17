import { useState, useRef, useEffect } from "react";

interface LazyIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  fallbackHeight?: string;
}

const LazyIframe = ({ fallbackHeight = "300px", ...props }: LazyIframeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} style={{ minHeight: fallbackHeight }} className="w-full h-full">
      {isVisible ? <iframe {...props} style={{ display: "block", width: "100%", height: "100%" }} /> : null}
    </div>
  );
};

export default LazyIframe;
