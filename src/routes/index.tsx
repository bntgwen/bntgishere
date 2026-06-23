import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/Hero";
import { NavPill } from "@/components/NavPill";
import { GridBackground } from "@/components/GridBackground";
import { Welcome } from "@/components/Welcome";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { useReveal } from "@/lib/useReveal";
import { useLenis } from "@/lib/useLenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "bntangishere — portfolio" },
      { name: "description", content: "bntangishere — design, code, and quiet craft. a personal portfolio." },
      { property: "og:title", content: "bntangishere — portfolio" },
      { property: "og:description", content: "design, code, and quiet craft." },
    ],
  }),
  component: Index,
}); 

function Index() {
  const [ready, setReady] = useState(false);
  useReveal();
  useLenis(ready);

  return (
    <main className="relative bg-black text-white">
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <GridBackground />
      <div className="relative z-10">
        <Hero />
        <Welcome />
        <Projects />
        <Certificates />
        <Gallery />
        <Contact />
      </div>
      <NavPill />
    </main>
  );
}
