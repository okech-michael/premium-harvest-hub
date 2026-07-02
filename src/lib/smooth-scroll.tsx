import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled || typeof window === "undefined") return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = window.requestAnimationFrame(loop);
      };
      raf = window.requestAnimationFrame(loop);
    };

    void initLenis();

    return () => {
      cancelled = true;
      if (raf) window.cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}