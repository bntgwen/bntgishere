import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SplitText } from "./SplitText";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(100, "name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "email is required")
    .email("please enter a valid email")
    .max(255, "email must be under 255 characters"),
  message: z
    .string()
    .trim()
    .min(1, "message is required")
    .max(1000, "message must be under 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = document.querySelectorAll(".reveal");

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const closeModal = useCallback(() => {
    setOpen(false);
    if (sent) {
      setTimeout(() => {
        setSent(false);
        reset();
      }, 500);
    }
  }, [sent, reset]);

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/bntgjoe00@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: "new message from bntangishere portfolio",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("failed to send");
      setSent(true);
      reset();
      toast.success("message sent — talk soon.");
    } catch {
      toast.error("couldn't send — try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors";
  const inputError = "border-red-400/70";
  const inputNormal = "border-white/15";

  return (
    <section id="contact" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-xs tracking-[0.5em] text-white/40">
          05 — contact
        </div>

        <div className="max-w-4xl">
          <SplitText
            as="h2"
            text="wanna talk more? hit me up here."
            className="text-[clamp(2rem,7vw,6rem)] leading-[1.02] text-white tracking-tighter"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
            staggerSpeed={20}
          />
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-6">
          <button
            onClick={() => setOpen(true)}
            className="group relative overflow-hidden rounded-full border border-white/30 bg-white px-8 py-4 text-sm text-black transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(255,255,255,0.35)] sm:px-10 sm:py-5 sm:text-base cursor-pointer"
            style={{ fontWeight: 400 }}
          >
            <span className="relative z-10 inline-flex items-center gap-3">
              contact me <i className="bi bi-arrow-up-right" />
            </span>
          </button>

          <div className="flex items-center gap-2">
            {[
              { icon: "bi-github", href: "https://github.com/bntgwen", label: "github" },
              { icon: "bi-instagram", href: "https://instagram.com/bntangaaulia", label: "instagram" },
              { icon: "bi-linkedin", href: "https://www.linkedin.com/in/bntang-a-8a97843a6?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "linkedin" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:scale-110 hover:border-white hover:text-white"
              >
                <i className={`bi ${s.icon} text-lg`} />
              </a>
            ))}
          </div>
        </div>

        <div className="reveal mt-32 border-t border-white/10 pt-10 text-xs text-white/40">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} bntang — is here</span>
            <span>made by me, bntang</span>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 z-[90] flex items-center justify-center p-4 transition-all duration-500"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backdropFilter: open ? "blur(20px)" : "blur(0)",
          background: open ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        }}
        onClick={closeModal}
      >
        <div
          className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-black/85 p-8 transition-all duration-500 sm:p-10"
          style={{
            transform: open ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
            opacity: open ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute -top-3 -right-3 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black text-white/80 transition-colors hover:bg-white hover:text-black cursor-pointer"
            aria-label="close"
          >
            <i className="bi bi-x-lg text-sm" />
          </button>

          <h3
            className="text-2xl text-white sm:text-3xl"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }}
          >
            say hello
          </h3>
          <p className="mt-2 text-sm text-white/50" style={{ fontWeight: 200 }}>
            i read every message — usually reply within a day.
          </p>

          {sent ? (
            <div className="mt-8 rounded-xl border border-white/15 bg-white/[0.03] p-6 text-center">
              <i className="bi bi-check2-circle text-3xl text-white" />
              <p className="mt-3 text-sm text-white/80" style={{ fontWeight: 200 }}>
                message sent. talk soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
              <div>
                <input
                  {...register("name")}
                  placeholder="your name"
                  className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-300" style={{ fontWeight: 200 }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your email"
                  className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-300" style={{ fontWeight: 200 }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="what's on your mind?"
                  className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-300" style={{ fontWeight: 200 }}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 cursor-pointer"
                style={{ fontWeight: 400 }}
              >
                {sending && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                )}
                {sending ? "sending..." : "send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}