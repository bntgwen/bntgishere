import { useRef, useCallback, useEffect } from "react";
import { SiTypescript, SiReact, SiJavascript, SiTailwindcss, SiNodedotjs, SiLaravel, SiPostgresql } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { SplitText } from "./SplitText"; 

interface Item { 
  label: string; 
  meta: string; 
  icon: string | React.ComponentType<{ size?: number; className?: string }>; 
}

const hobbies: Item[] = [
  { label: "take a scene", meta: "took memories to my pocket", icon: "bi-camera-fill" },
  { label: "take a rest", meta: "sleep well baby", icon: "bi-moon-fill" },
  { label: "listen to something", meta: "pop, rap, jazz", icon: "bi-headphones" },
  { label: "take a game", meta: "valorant, minecraft, etc", icon: "bi-joystick" },
  { label: "read to something", meta: "manga, science, novel, etc", icon: "bi-book-half" },
  { label: "watching peak", meta: "anime, movies, series, etc", icon: "bi-tv" },
];

const tech: Item[] = [
  { label: "typescript", meta: "good but sometimes not", icon: SiTypescript }, 
  { label: "reactJS", meta: "favourite anytime", icon: SiReact },           
  { label: "JavaScript", meta: "good enough", icon: SiJavascript },       
  { label: "tailwind CSS", meta: "best stylist ever", icon: SiTailwindcss }, 
  { label: "nodeJS", meta: "good peak like it", icon: SiNodedotjs },         
  { label: "postgreSQL", meta: "secure and simple", icon: SiPostgresql },     
  { label: "Java", meta: "not my type but ok", icon: FaJava },      
  { label: "Laravel", meta: "greatest of all time baby", icon: SiLaravel },    
];

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} className={`card-item ${className}`}>
      <div className="card-glow" />
      {children}
    </div>
  );
}

export function Welcome() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = document.querySelectorAll(".reveal-grid-cards");

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
    <section id="welcome" className="relative px-4 py-24 sm:px-12 sm:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-6 text-xs tracking-[0.5em] text-white/40">01 — welcome</div>

        <div className="mb-24 lg:mb-32 max-w-4xl">
          <SplitText
            as="h2"
            text="i just wanna share what i like"
            className="text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.05] text-white tracking-tighter"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
            staggerSpeed={20}
          />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          
          <div className="lg:col-span-4 lg:col-start-2 flex flex-col gap-6">
            <div className="text-[12px] tracking-[0.4em] text-white/40">about</div>
            <SplitText
              as="p"
              text="hello, i am a junior developer exploring computing and ai. i focus deeply on information technology and computer engineering."
              className="text-lg leading-relaxed text-white/90 tracking-wide"
              style={{ fontWeight: 200 }}
              staggerSpeed={8}
            />
            <SplitText
              as="p"
              text="i love breaking down complex systems into quiet digital interfaces. chasing small details drives my daily curiosity. i hope to bridge human intent and machine intelligence."
              className="text-base leading-relaxed text-white/70 tracking-wide"
              style={{ fontWeight: 200 }}
              staggerSpeed={6}
            />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="text-[10px] tracking-[0.4em] text-white/40 mb-2">hobbies & things</div>
              <SplitText 
                as="p" 
                text="what i do every time" 
                className="text-lg text-white/60"
                staggerSpeed={15}
              />
            </div>
            <div className="reveal-grid-cards grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {hobbies.map((h) => (
                <GlowCard key={h.label} className="border-0">
                  <div className="card-icon">
                    {typeof h.icon === "string" ? <i className={`bi ${h.icon} text-lg`} /> : <h.icon size={20} />}
                  </div>
                  <div className="card-label tracking-wide">{h.label}</div>
                  <div className="card-meta">{h.meta}</div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-40 flex flex-col gap-6">
          <div>
            <div className="text-[10px] tracking-[0.4em] text-white/40 mb-2">stack & skills</div>
            <SplitText 
              as="p" 
              text="what i use every work" 
              className="text-lg text-white/60" 
              staggerSpeed={15}
            />
          </div>
          
          <div className="reveal-grid-cards grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tech.map((t) => (
              <GlowCard key={t.label} className="border-0">
                <div className="card-icon">
                  {typeof t.icon === "string" ? <i className={`bi ${t.icon} text-lg`} /> : <t.icon size={20} />}
                </div>
                <div className="card-label tracking-wide">{t.label}</div>
                <div className="card-meta">{t.meta}</div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}