import { useEffect, useRef, useState } from "react";

const items = [
  { id: "welcome", label: "welcome", icon: "bi-person" },
  { id: "certificates", label: "certificates", icon: "bi-award" },
  { id: "gallery", label: "gallery", icon: "bi-images" },
  { id: "contact", label: "contact", icon: "bi-envelope" },
];

export function NavPill() {
  const [show, setShow] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // magnetic effect
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const onMove = (e: MouseEvent) => {
      const r = pill.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 180) {
        const f = (1 - dist / 180) * 10;
        pill.style.transform = `translate(calc(-50% + ${(dx / dist) * f}px), ${(dy / dist) * f * 0.4}px)`;
      } else {
        pill.style.transform = "translate(-50%, 0)";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={pillRef}
      className="fixed bottom-6 left-1/2 z-50 transition-all duration-500 ease-out"
      style={{
        transform: "translate(-50%, 0)",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        translate: show ? "0 0" : "0 30px",
      }}
    >
      <nav className="glass flex items-center gap-0.5 rounded-full px-1.5 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => go(it.id)}
            className="group grid h-9 w-9 place-items-center rounded-full text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
            aria-label={it.label}
            title={it.label}
          >
            <i className={`bi ${it.icon} text-[13px]`} />
          </button>
        ))}
      </nav>
    </div>
  );
}
