import { useRef, useCallback } from "react";
import { SiFigma } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { SlCursor, SlScreenDesktop } from "react-icons/sl";
import { SplitText } from "./SplitText";

interface GalleryImg { src: string; ratio: string; }

const images: GalleryImg[] = [
  { src: "/images/67w.webp", ratio: "3/4" },
  { src: "/images/sdroof.webp", ratio: "4/3" },
  { src: "/images/landscapemosque.webp", ratio: "1/1" },
  { src: "/images/mosque.webp", ratio: "2/3" },
  { src: "/images/lampagain.webp", ratio: "16/9" },
  { src: "/images/sd.webp", ratio: "1/1" },
  { src: "/images/lampcropped.webp", ratio: "3/5" },
  { src: "/images/roofagainandagain.webp", ratio: "5/4" },
  { src: "/images/idek.webp", ratio: "16/10" },
  { src: "/images/roofandcables.webp", ratio: "2/3" },
  { src: "/images/roofagain.webp", ratio: "1/1" },
];

interface GearItem { 
  label: string; 
  meta: string; 
  icon: string | React.ComponentType<{ size?: number; className?: string }>; 
}

const hardware: GearItem[] = [
  { label: "Thinkpad X260", meta: "everyday use", icon: "bi-laptop" },
  { label: "Custom Desktop PCs", meta: "Intel Core i5 Gen 10th (10400f) with NVidia GTX 1660 6GB", icon: SlScreenDesktop },
  { label: "Vivo Y12S", meta: "main phone", icon: "bi-phone-fill" },
];

const software: GearItem[] = [
  { label: "figma", meta: "for designing (sometimes)", icon: SiFigma },
  { label: "vs code", meta: "fav text editor (current)", icon: VscCode },
  { label: "cursor", meta: "best text editor (just once)", icon: SlCursor },
];

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || ticking.current) return;

    ticking.current = true;
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      ticking.current = false;
    });
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} className={`card-item ${className}`}>
      <div className="card-glow" />
      {children}
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">04 — gallery & gear</div>
        
        <SplitText
          as="h2"
          text="fragments of taste."
          className="block max-w-3xl text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white tracking-tighter"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
          staggerSpeed={20}
        />

        <div className="mt-20 columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:_balance]">
          {images.map((img, i) => (
            <div
              key={i}
              className="reveal group relative mb-4 inline-block w-full overflow-hidden border border-white/10 break-inside-avoid description-card-fix"
            >
              <div style={{ aspectRatio: img.ratio }} className="w-full overflow-hidden">
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="gallery-image block h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="mt-32 space-y-20">
          {[
            { title: "hardware", items: hardware },
            { title: "software", items: software },
          ].map((group) => (
            <div key={group.title} className="reveal">
              <div className="mb-6 text-[10px] tracking-[0.4em] text-white/40">{group.title}</div>
              <div className="grid grid-cols-1 gap-px border border-white/10 sm:grid-cols-2 lg:grid-cols-3 bg-white/10">
                {group.items.map((g) => {
                  return (
                    <GlowCard key={g.label} className="border-0">
                      <div className="card-icon flex items-center justify-center">
                        {typeof g.icon === "string" ? (
                          <i className={`bi ${g.icon} text-lg`} />
                        ) : (
                          <g.icon size={20} />
                        )}
                      </div>
                      <div className="card-label">{g.label}</div>
                      <div className="card-meta">{g.meta}</div>
                    </GlowCard>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}