import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
  delay?: number;
}

const AnimatedCounter = ({ value, label, delay = 0 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const [started, setStarted] = useState(false);

  // Extract numeric part and suffix (e.g. "400+" → 400, "+")
  const numericMatch = value.match(/^([\d\s]+)(.*)/);
  const targetNum = numericMatch ? parseInt(numericMatch[1].replace(/\s/g, ""), 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1800;
    const startTime = performance.now() + delay;
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        raf = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * targetNum);
      
      // Format with spaces for thousands
      const formatted = current >= 1000 
        ? current.toLocaleString("pl-PL").replace(/,/g, " ") 
        : current.toString();
      setDisplayed(formatted);

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, targetNum, delay]);

  return (
    <div
      ref={ref}
      className="group relative bg-card border border-border rounded-2xl p-6 text-center overflow-hidden hover:border-accent/50 transition-all duration-500"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <span
          className={`font-heading text-4xl md:text-5xl text-accent block tabular-nums transition-all duration-700 ${
            started ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
          }`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {started ? displayed : "0"}{suffix}
        </span>
        <div className="my-2" />
        <span
          className={`font-body text-xs text-muted-foreground uppercase tracking-[0.15em] transition-all duration-700 ${
            started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDelay: `${delay + 200}ms` }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default AnimatedCounter;
