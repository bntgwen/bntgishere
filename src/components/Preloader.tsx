import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

export function Preloader({ onDone }: Props) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    document.documentElement.classList.add("lock-scroll");
    const t1 = setTimeout(() => setPhase(1), 50);     // "hello, there" in
    const t2 = setTimeout(() => setPhase(2), 1800);   // swap to "welcome"
    const t3 = setTimeout(() => setPhase(3), 3400);   // fade out
    const t4 = setTimeout(() => {
      document.documentElement.classList.remove("lock-scroll");
      onDone();
    }, 4000);
    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
      document.documentElement.classList.remove("lock-scroll");
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700"
      style={{ opacity: phase === 3 ? 0 : 1, pointerEvents: phase === 3 ? "none" : "auto" }}
      aria-hidden={phase === 3}
    >
      <div className="relative h-24 w-full text-center">
        <span
          className="absolute inset-0 flex items-center justify-center text-2xl tracking-wide text-white/90 sm:text-3xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 200,
            opacity: phase === 1 ? 1 : 0,
            transform: phase === 1 ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 700ms ease, transform 700ms ease",
          }}
        >
          hello, there
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center text-3xl tracking-wide text-white sm:text-5xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 100,
            opacity: phase === 2 ? 1 : 0,
            transform:
              phase === 2 ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
            filter: phase === 2 ? "blur(0)" : "blur(8px)",
            transition: "opacity 900ms ease, transform 900ms ease, filter 900ms ease",
          }}
        >
          welcome
        </span>
      </div>
    </div>
  );
}
