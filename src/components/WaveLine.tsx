// import { useEffect, useRef } from "react";

// /**
//  * A single fixed full-height SVG wave line that runs from top to bottom of the viewport,
//  * positioned over the page. The wave animates via dash offset and subtle path morph.
//  */
// export function WaveLine() {
//   const pathRef = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     let raf = 0;
//     let t = 0;
//     const animate = () => {
//       t += 0.008;
//       const p = pathRef.current;
//       if (p) {
//         // generate a soft sinusoidal vertical path
//         const w = 100;
//         const segments = 40;
//         let d = `M ${50 + Math.sin(t) * 8} 0`;
//         for (let i = 1; i <= segments; i++) {
//           const y = (i / segments) * 100;
//           const x =
//             50 +
//             Math.sin(t + i * 0.4) * 18 +
//             Math.cos(t * 0.7 + i * 0.2) * 8;
//           d += ` L ${x} ${y}`;
//         }
//         p.setAttribute("d", d);
//         void w;
//       }
//       raf = requestAnimationFrame(animate);
//     };
//     raf = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(raf);
//   }, []);

//   return (
//     <svg
//       className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
//       viewBox="0 0 100 100"
//       preserveAspectRatio="none"
//       aria-hidden
//     >
//       <defs>
//         <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="rgba(180,210,255,0)" />
//           <stop offset="20%" stopColor="rgba(180,210,255,0.7)" />
//           <stop offset="50%" stopColor="rgba(255,180,230,0.6)" />
//           <stop offset="80%" stopColor="rgba(140,255,220,0.6)" />
//           <stop offset="100%" stopColor="rgba(140,255,220,0)" />
//         </linearGradient>
//         <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
//           <feGaussianBlur stdDeviation="0.6" result="b" />
//           <feMerge>
//             <feMergeNode in="b" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>
//       <path
//         ref={pathRef}
//         d="M50 0 L50 100"
//         fill="none"
//         stroke="url(#waveGrad)"
//         strokeWidth="0.18"
//         strokeLinecap="round"
//         filter="url(#waveGlow)"
//         vectorEffect="non-scaling-stroke"
//         style={{ mixBlendMode: "screen" }}
//       />
//     </svg>
//   );
// }
