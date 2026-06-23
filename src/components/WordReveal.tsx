import { useEffect, useRef } from "react";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  stagger?: number;
  delay?: number;
}

export function WordReveal({ text, className, style, as = "h2", stagger = 60, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".word-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((w, i) => {
              w.style.transitionDelay = `${delay + i * stagger}ms`;
              w.classList.add("in");
            });
          } else {
            words.forEach((w) => {
              w.style.transitionDelay = `0ms`;
              w.classList.remove("in");
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, stagger, delay]);

  const Tag = as as any;
  const words = text.split(" ");

  return (
    <Tag ref={ref as any} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} className="word-reveal-wrap">
          <span className="word-reveal">{w}</span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
