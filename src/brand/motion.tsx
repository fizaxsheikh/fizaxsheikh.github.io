import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type From = "up" | "left" | "right" | "pop" | "zoom" | "curtain";

// Animates its children in (see .reveal in brand.css) the first time they scroll into view.
export function Reveal({
  as: Tag = "div",
  from = "up",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  from?: From;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag {...rest} ref={ref} data-from={from} className={`reveal ${className}`} style={{ "--delay": `${delay}ms`, ...style } as CSSProperties}>
      {children}
    </Tag>
  );
}

// Calls onProgress(p) on every animation frame while scrolling, where p is how far the
// element has travelled through the viewport: 0 = its top at the bottom of the screen,
// 1 = its bottom at the top of the screen.
export function useScrollProgress<T extends HTMLElement>(onProgress: (p: number, el: T) => void) {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      cb.current(1, el);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      cb.current(Math.min(1, Math.max(0, (window.innerHeight - r.top) / total)), el);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return ref;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

// A ring that follows the mouse and grows into a label over anything with data-cursor="Label".
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const fine = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || prefersReducedMotion()) return;
    let x = -100, y = -100, cx = -100, cy = -100, frame = 0;
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      frame = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(loop);
    document.documentElement.classList.add("has-cursor");
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [fine]);

  if (!fine) return null;
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className={`cursor-dot ${label ? "is-big" : ""}`}>
        <span>{label}</span>
      </div>
    </div>
  );
}
