import { useEffect, useRef } from "react";

interface SplitProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  staggerSpeed?: number;
}

export function SplitText({ text, className, style, delay = 0, as = "h2", staggerSpeed = 16 }: SplitProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".split-char");
    
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((c, i) => {
              c.style.transitionDelay = `${delay + i * staggerSpeed}ms`;
              c.classList.add("in");
            });
          } else {
            chars.forEach((c) => {
              c.style.transitionDelay = `0ms`;
              c.classList.remove("in");
            });
          }
        });
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, text, staggerSpeed]);

  const Tag = as as any;
  const words = text.split(" ");

  return (
    <Tag ref={ref as any} className={`flex flex-wrap items-baseline ${className || ""}`} style={style}>
      {words.map((word, wi) => (
        <span key={wi} className="split-word-wrap inline-flex items-baseline select-none">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} className="split-char">
              {ch}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}