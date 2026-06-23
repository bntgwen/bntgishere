import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // Default awal portfolio kamu (misal: gelap)
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 99,
        display: "grid",
        height: "48px",
        width: "48px",
        placeItems: "center",
        borderRadius: "50%",
        border: "1px solid var(--border-color)",
        backgroundColor: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
        color: isDark ? "#000000" : "#ffffff",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <i className="bi bi-sun-fill" style={{ fontSize: "18px", color: "#eab308" }} />
      ) : (
        <i className="bi bi-moon-fill" style={{ fontSize: "18px", color: "#4f46e5" }} />
      )}
    </button>
  );
}