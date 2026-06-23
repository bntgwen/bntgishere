import { useEffect, useRef } from "react";

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let rx = 0, ry = 0, tx = 0, ty = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      tx = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30));
      ty = Math.max(-1, Math.min(1, (e.beta ?? 0) / 45));
    };

    const tick = () => {
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      orbRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i + 1) * 18;
        el.style.setProperty("--mx", `${rx * depth}px`);
        el.style.setProperty("--my", `${ry * depth}px`);
      });
      const title = wrap.querySelector<HTMLElement>("[data-hero-title]");
      if (title) {
        title.style.transform = `translate3d(${rx * -8}px, ${ry * -8}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener("mousemove", onMove);
    window.addEventListener("deviceorientation", onOrient);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  const setOrb = (i: number) => (el: HTMLDivElement | null) => {
    if (el) orbRefs.current[i] = el;
  };

  return (
    <section
      ref={wrapRef}
      id="home"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >

      <div className="relative z-10 px-6 text-center" data-hero-title>
        <p
          className="mb-6 text-xs tracking-[0.5em] text-white/50"
          style={{ fontWeight: 200 }}
        >
         welcome
        </p>
        <h1
          className="text-[clamp(2.4rem,9vw,8rem)] leading-[1.02] text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
        >
          nice to meet you
        </h1>
        <p className="mx-auto mt-8 max-w-md text-sm text-white/60 sm:text-base" style={{ fontWeight: 200 }}>
          hello there whoever you are, introduce my name is bintang
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/40">
        scroll
      </div>
    </section>
  );
}
