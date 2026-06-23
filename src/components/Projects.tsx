import { useEffect, useState } from "react";
import { SplitText } from "./SplitText";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
}

const fallback: Repo[] = [
  { id: 1, name: "Heitgh Logistic", description: "a minimalist logistic tracking web-based application.", html_url: "https://github.com/bntgwen/heitgh-logistic", homepage: "https://github.com/bntgwen/heitgh-logistic", stargazers_count: 0, language: "Blade & PHP" },
  { id: 2, name: "Lib App", description: "function-full library reporting desktop application.", html_url: "https://github.com/bntgwen/LoginForm", homepage: "https://github.com/bntgwen/LoginForm", stargazers_count: 0, language: "JAVA & MySQL" },
  { id: 3, name: "Stockables", description: "simple web-based application for manage your inventory.", html_url: "https://github.com/bntgwen/StockableTwo", homepage: "https://github.com/bntgwen/StockableTwo" , stargazers_count: 0, language: "Blade & PHP" },
  { id: 4, name: "Pebbly Finance App", description: "simple yet easy web-based app for manage your money.", html_url: "https://github.com/bntgwen/Pebbly", homepage: "https://pebbly-five.vercel.app/app", stargazers_count: 0, language: "glsl" },
];

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>(fallback);

  useEffect(() => {
    fetch("https://api.github.com/users/bntgwen/repos?sort=updated&per_page=20")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const namaRepoPilihan = ["heitgh-logistic", "loginform", "stockabletwo", "pebbly"];
          const filtered = data.filter(repo => 
            namaRepoPilihan.includes(repo.name.toLowerCase())
          );
          if (filtered.length) {
            setRepos(filtered.slice(0, 4));
          }
        }
      })
      .catch(() => {});
  }, []);

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
        { threshold: 0.1 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, [repos]);

  return (
    <section id="projects" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">02 — projects</div>
        
        <div className="max-w-3xl">
          <SplitText
            as="h2"
            text="things i've made, or am making."
            className="text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white tracking-tighter"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
            staggerSpeed={20}
          />
        </div>

        <div className="reveal-grid-cards mt-20 grid grid-cols-1 gap-px overflow-hidden border border-white/10 md:grid-cols-2 bg-white/10">
          {repos.map((r, i) => (
            <a
              key={r.id}
              href={r.homepage ?? r.html_url}
              target="_blank"
              rel="noreferrer"
              className="card-item group relative block bg-black p-8 transition-colors duration-500 hover:bg-white/[0.03] sm:p-12"
              style={{ minHeight: 260 }}
            >
              <div className="flex items-start justify-between text-xs text-white/40">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{r.language ?? "—"}</span>
              </div>
              <h3 className="mt-12 text-2xl text-white sm:text-3xl"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }}>
                {r.name.toLowerCase()}
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/60 sm:text-base" style={{ fontWeight: 200 }}>
                {r.description ?? "no description provided."}
              </p>
              <div className="mt-8 flex items-center gap-6 text-xs text-white/70">
                <span className="inline-flex items-center gap-2">
                  <i className="bi bi-star" /> {r.stargazers_count}
                </span>
                {r.homepage && (
                  <span className="inline-flex items-center gap-2 border-b border-white/20 pb-0.5 transition-colors group-hover:border-white">
                    live demo <i className="bi bi-arrow-up-right" />
                  </span>
                )}
              </div>

              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at 50% 100%, rgba(180,210,255,0.08), transparent 60%)",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}