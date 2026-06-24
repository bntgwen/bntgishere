import { useState, useEffect } from "react";
import { SplitText } from "./SplitText";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
}

const certs: Cert[] = [
  {
    id: "c1",
    title: "JAVA Foundation - Oracle Academy 2026",
    issuer: "Java Fundamentals",
    year: "2026",
    image: "/images/Muhammad Bintang Aulia_Java_Foundations_–_Bahasa_Indonesia_Award_Of_Completion_on_the_27th_of_May__2-1.webp",
  },
];

export function Certificates() {
  const [open, setOpen] = useState<Cert | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = document.querySelectorAll(".reveal-list");

    elements.forEach((el) => {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
          } else {
            el.classList.remove("in");
          }
        },
        { threshold: 0.15 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  return (
    <section id="certificates" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">03 — certificates</div>
        
        <div className="max-w-3xl">
          <SplitText
            as="h2"
            text="some of what i've earned."
            className="text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white tracking-tighter"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
            staggerSpeed={20}
          />
        </div>

        <ul className="mt-20 divide-y divide-white/10 border-y border-white/10">
          {certs.map((c, i) => (
            <li
              key={c.id}
              className="reveal-list group flex flex-wrap items-center justify-between gap-6 py-8 transition-colors duration-500 hover:bg-white/[0.02]"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-xs text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-xl text-white sm:text-2xl"
                       style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }}>
                    {c.title}
                  </div>
                  <div className="mt-1 text-xs text-white/50" style={{ fontWeight: 200 }}>
                    {c.issuer} · {c.year}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(c)}
                className="group/btn flex items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-xs text-white/80 transition-all duration-300 hover:border-white hover:bg-white hover:text-black cursor-pointer"
              >
                show <i className="bi bi-arrow-up-right transition-transform group-hover/btn:rotate-45" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4 transition-all duration-500"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backdropFilter: open ? "blur(20px)" : "blur(0px)",
          background: open ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0)",
        }}
        onClick={() => setOpen(null)}
      >
        <div
          className="relative w-full max-w-xl rounded-xl border border-white/15 bg-black p-2 transition-all duration-500 flex flex-col overflow-hidden"
          style={{
            transform: open ? "scale(1)" : "scale(0.96)",
            opacity: open ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >

          <button
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black text-white/80 transition-colors hover:bg-white hover:text-black cursor-pointer"
            aria-label="close"
          >
            <i className="bi bi-x-lg text-[10px]" />
          </button>

          {open && (
            <div>
              <div className="w-full bg-neutral-900 rounded-lg overflow-hidden mt-10 flex items-center justify-center">
                <img
                  src={open.image}
                  alt={open.title}
                  className="w-full h-auto max-h-[55vh] object-contain block"
                />
              </div>
              
              <div className="px-3 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                <div className="text-base text-white" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }}>
                  {open.title}
                </div>
                <div className="text-xs text-white/40" style={{ fontWeight: 200 }}>{open.issuer} · {open.year}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}