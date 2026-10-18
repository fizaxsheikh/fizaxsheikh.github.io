import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { about, book, cover, issue, nextIssue, profile, ticker } from "./content";
import { Cursor, Reveal, prefersReducedMotion, useMediaQuery, useScrollProgress } from "./motion";
import moodboard from "../assets/photos/moodboard.jpg";
import pink from "../assets/photos/pink.jpg";

type Photo = { src: string; caption: string };

// Any photo can open full-screen through this.
const LightboxContext = createContext<(photo: Photo) => void>(() => {});

export function BrandSite() {
  const [open, setOpen] = useState<Photo | null>(null);
  return (
    <LightboxContext.Provider value={setOpen}>
      <div className="grain overflow-x-clip">
        <Cursor />
        <Nav />
        <main>
          <Cover />
          <Ticker />
          <About />
          <TheBook />
          <MoodBoard />
          <NextIssue />
          <BackCover />
        </main>
        <Footer />
        {open && <Lightbox photo={open} onClose={() => setOpen(null)} />}
      </div>
    </LightboxContext.Provider>
  );
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#book", label: "The Book" },
  { href: "#moodboard", label: "Mood Board" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="pointer-events-auto flex items-center justify-between px-5 py-4 text-white md:px-10 md:py-6" aria-label="Main">
        <a href="#cover" className="font-serif-display text-xl font-semibold tracking-tight md:text-2xl">
          {profile.name}
        </a>
        <ul className="font-mono-caps flex gap-5 text-[10px] md:gap-9 md:text-xs">
          {navLinks.map((l) => (
            <li key={l.href} className={l.href === "#contact" ? "" : "hidden md:block"}>
              <a href={l.href} className="group relative">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Cover() {
  const ref = useScrollProgress<HTMLElement>((p, el) => {
    // p is ~0.5 while the cover fills the screen; --out grows from 0 as it scrolls away
    el.style.setProperty("--out", (Math.max(0, p - 0.5) * 2).toFixed(4));
  });
  const letters = profile.first.toUpperCase().split("");

  return (
    <section id="cover" ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-paper">
      <h1 className="sr-only">
        {profile.name}: {profile.titles.join(", ")}
      </h1>

      {/* Cover photo: full-bleed on phones, a centered column under the masthead on desktop */}
      <div className="absolute inset-0 md:bottom-0 md:left-1/2 md:right-auto md:top-[calc(7.5rem+11vw)] md:w-[min(42vw,600px)] md:-translate-x-1/2">
        <div className="cover-in h-full w-full overflow-hidden md:[-webkit-mask-composite:source-in] md:[mask-composite:intersect] md:[mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent),linear-gradient(to_bottom,transparent,black_10%)]">
          <img
            src={cover.photo}
            alt={`${profile.name}, cover portrait in a cobalt halter top`}
            className="h-full w-full object-cover object-[50%_20%]"
            style={{ transform: "scale(calc(1 + var(--out, 0) * 0.15))" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 md:hidden" />
      </div>

      {/* Issue line */}
      <div
        className="font-mono-caps fade-up absolute inset-x-0 top-16 flex justify-between px-5 text-[10px] text-white md:top-24 md:px-10 md:text-xs md:text-[color:var(--ink)]"
        style={{ animationDelay: "1.2s" }}
      >
        <span>Issue Nº {issue.number}</span>
        <span className="hidden md:inline">{profile.city}</span>
        <span>{issue.season}</span>
      </div>

      {/* Masthead */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[5.5rem] flex justify-center md:top-[7.5rem]"
        style={{ transform: "translateY(calc(var(--out, 0) * -40vh))" }}
        aria-hidden="true"
      >
        <div className="font-serif-display flex overflow-hidden text-[34vw] font-black leading-[0.8] tracking-[-0.04em] text-cobalt md:text-[23vw]">
          {letters.map((l, i) => (
            <span key={i} className="letter" style={{ animationDelay: `${0.9 + i * 0.09}s` }}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Cover lines */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-8 text-white md:px-10 md:pb-10 md:text-[color:var(--ink)]">
        <div className="fade-up space-y-3" style={{ animationDelay: "1.6s" }}>
          <p className="font-serif-display text-4xl italic leading-none md:text-5xl lg:text-6xl">{cover.headline}.</p>
          <p className="font-mono-caps text-[10px] md:text-xs">{cover.sub}</p>
        </div>
        <div className="fade-up hidden md:block" style={{ animationDelay: "1.8s" }}>
          <Barcode className="h-12 w-36" />
        </div>
      </div>
    </section>
  );
}

function Barcode({ className = "" }: { className?: string }) {
  const bars = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1];
  let x = 0;
  return (
    <svg viewBox="0 0 90 40" className={className} aria-hidden="true">
      {bars.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="32" fill="currentColor" /> : null;
        x += w + 0.6;
        return rect;
      })}
      <text x="0" y="39.5" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="currentColor">
        0 26 FIZA {issue.number}
      </text>
    </svg>
  );
}

function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden bg-cobalt py-4 text-paper md:py-5" aria-label={ticker.join(", ")}>
      <div className="marquee flex w-max" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {items.map((t, i) => (
              <span key={i} className="font-serif-display flex items-center whitespace-nowrap text-3xl italic md:text-5xl">
                {t}
                <span className="mx-8 not-italic text-[color:var(--blush)] md:mx-12">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const words = about.statement.split(" ");
  const ref = useScrollProgress<HTMLElement>((p, el) => {
    // Light the words up one by one between 15% and 50% of the section's trip through the screen
    const t = Math.min(1, Math.max(0, (p - 0.15) / 0.35)) * words.length;
    el.querySelectorAll<HTMLElement>("[data-word]").forEach((w, i) => {
      w.style.opacity = String(0.14 + 0.86 * Math.min(1, Math.max(0, t - i)));
    });
  });

  return (
    <section
      id="about"
      ref={ref}
      className="mx-auto grid max-w-7xl scroll-mt-16 items-center gap-10 px-5 py-20 md:grid-cols-[1.4fr_1fr] md:gap-16 md:px-10 md:py-28"
    >
      <div>
        <p className="font-mono-caps mb-8 text-xs text-cobalt">About</p>
        <p className="font-serif-display text-3xl leading-[1.1] md:text-5xl">
          {words.map((w, i) => (
            <span key={i} data-word className="transition-opacity duration-200" style={{ opacity: 0.14 }}>
              {w}{" "}
            </span>
          ))}
        </p>
        <dl className="mt-10 grid gap-6 border-t border-black/15 pt-6 sm:grid-cols-2">
          {about.facts.map(([k, v], i) => (
            <Reveal key={k} delay={i * 90}>
              <dt className="font-mono-caps text-[10px] text-black/50">{k}</dt>
              <dd className="mt-2 font-medium">{v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
      <Reveal from="curtain" className="mx-auto w-full max-w-sm">
        <div className="aspect-[4/5]">
          <VideoTile src={about.video.src} poster={about.video.poster} title={about.video.caption}>
            <span className="font-serif-display absolute bottom-4 left-4 text-3xl italic text-white drop-shadow">{about.video.caption}</span>
          </VideoTile>
        </div>
      </Reveal>
    </section>
  );
}

// A silent looping video; clicking toggles the sound. Pauses while off screen.
function VideoTile({ src, poster, title, children }: { src: string; poster?: string; title: string; children?: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || prefersReducedMotion()) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      data-cursor={muted ? "Sound on" : "Mute"}
      className="photo-hover relative block h-full w-full overflow-hidden"
      onClick={() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        if (!v.muted) v.play().catch(() => {});
        setMuted(v.muted);
      }}
      aria-label={`${title} video: ${muted ? "turn sound on" : "mute"}`}
    >
      <video ref={videoRef} src={src} poster={poster} className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" />
      <span className="font-mono-caps absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[9px] text-white backdrop-blur-sm">
        {muted ? "Sound off" : "Sound on"}
      </span>
      {children}
    </button>
  );
}

function TheBook() {
  const desktop = useMediaQuery("(min-width: 768px)");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>();
  const openPhoto = useContext(LightboxContext);

  // On desktop the section pins and scrolling down slides the photos sideways.
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !desktop || prefersReducedMotion()) {
      setHeight(undefined);
      if (track) track.style.transform = "";
      return;
    }
    let overflow = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = section.getBoundingClientRect().top;
      const p = overflow ? Math.min(1, Math.max(0, -top / overflow)) : 0;
      track.style.transform = `translate3d(${-p * overflow}px,0,0)`;
      section.style.setProperty("--book", p.toFixed(4));
    };
    const measure = () => {
      overflow = Math.max(0, track.scrollWidth - window.innerWidth);
      setHeight(window.innerHeight + overflow);
      update();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    measure();
    const imgs = Array.from(track.querySelectorAll("img"));
    imgs.forEach((img) => img.addEventListener("load", measure));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      imgs.forEach((img) => img.removeEventListener("load", measure));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, [desktop]);

  return (
    <section id="book" ref={sectionRef} className="relative bg-ink text-paper" style={{ height }}>
      <div className={desktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-16"}>
        <div className="mb-8 flex items-end justify-between px-5 md:mb-10 md:px-10">
          <h2 className="font-serif-display text-6xl italic md:text-8xl">The Book</h2>
          <p className="font-mono-caps hidden text-xs text-white/60 md:block">Keep scrolling to turn the pages</p>
        </div>
        <div
          ref={trackRef}
          className={`flex gap-4 px-5 will-change-transform md:gap-6 md:px-10 ${desktop ? "" : "snap-x snap-mandatory overflow-x-auto pb-4"}`}
        >
          {book.map((b, i) => (
            <figure key={b.caption} className={`shrink-0 snap-center ${b.wide ? "w-[85vw] md:w-[46vw]" : "w-[62vw] md:w-[24vw]"}`}>
              <button
                type="button"
                data-cursor="View"
                onClick={() => openPhoto(b)}
                className="photo-hover block h-[52vh] w-full overflow-hidden md:h-[58vh]"
                aria-label={`Open photo: ${b.caption}`}
              >
                <img src={b.src} alt={b.caption} loading="lazy" className="h-full w-full object-cover" />
              </button>
              <figcaption className="font-mono-caps mt-3 flex justify-between text-[10px] text-white/70">
                <span>Plate {String(i + 1).padStart(2, "0")}</span>
                <span>{b.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        {desktop && (
          <div className="mx-10 mt-10 h-px bg-white/15">
            <div className="h-px origin-left bg-[color:var(--blush)]" style={{ transform: "scaleX(var(--book, 0))" }} />
          </div>
        )}
      </div>
    </section>
  );
}

function MoodBoard() {
  const ref = useScrollProgress<HTMLElement>((p, el) => el.style.setProperty("--mb", p.toFixed(4)));
  const openPhoto = useContext(LightboxContext);
  return (
    <section id="moodboard" ref={ref} className="scroll-mt-16 overflow-hidden bg-[#e9e2d6] py-16 md:py-24">
      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-5 md:px-10">
        <Reveal>
          <h2 className="font-serif-display text-6xl italic md:text-8xl">The Mood Board</h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="font-mono-caps text-xs text-black/55">Pages from my life, cut & taped</p>
        </Reveal>
      </div>
      <Reveal from="curtain" className="mx-auto max-w-[1500px] px-3 md:px-10">
        <button
          type="button"
          data-cursor="View"
          onClick={() => openPhoto({ src: moodboard, caption: "The Mood Board" })}
          className="block w-full overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
          aria-label="Open the mood board full screen"
        >
          <img
            src={moodboard}
            alt="Fiza's mood board: photos from the gym, UCLA, city trips and hikes with her dog, plus notes on her niches (beauty & style, lifestyle & wellness, career) and simple pleasures (gaming, basketball, video games, horror movies, R&B and dancing, nightlife)."
            loading="lazy"
            className="block w-full"
            style={{ transform: "scale(calc(1.08 - var(--mb, 0) * 0.08))" }}
          />
        </button>
      </Reveal>
    </section>
  );
}

function NextIssue() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <h2 className="font-serif-display text-5xl md:text-7xl">
          In the next issue<span className="text-cobalt">…</span>
        </h2>
      </Reveal>
      <ol className="mt-10 grid border-t border-black/15 md:grid-cols-2 md:gap-x-12">
        {nextIssue.map((n, i) => (
          <Reveal as="li" key={n.goal} from="left" delay={i * 90} className="group flex items-baseline gap-5 border-b border-black/15 py-5">
            <span className="font-mono-caps w-6 text-xs text-black/40">{String(i + 1).padStart(2, "0")}</span>
            <span
              className={`font-serif-display flex-1 text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl ${
                n.done ? "line-through decoration-[color:var(--cobalt)] decoration-2" : ""
              }`}
            >
              {n.goal}
            </span>
            <span className="font-mono-caps text-[10px] text-black/45">{n.done ? "Done ✓" : "Loading…"}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function BackCover() {
  const links = [
    { href: profile.instagram, label: "Instagram", value: profile.instagramHandle },
    { href: profile.tiktok, label: "TikTok", value: profile.tiktokHandle },
  ];
  return (
    <section id="contact" className="bg-[#d9668f] text-white">
      <Reveal from="zoom">
        <img src={pink} alt={`${profile.name} on a pink backdrop. Start the spark. Connect with me.`} loading="lazy" className="block w-full" />
      </Reveal>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-20">
        <Reveal>
          <p className="font-mono-caps text-xs text-white/80">Bookings, collaborations & press</p>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="Say hi"
            className="font-serif-display group mt-4 inline-flex items-center gap-3 text-6xl italic leading-none md:text-7xl"
          >
            Let's talk
            <ArrowUpRight className="h-[0.7em] w-[0.7em] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
          </a>
          <p className="mt-3 text-lg text-white/85">{profile.email}</p>
        </Reveal>
        <div className="grid content-end gap-5">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 120}>
              <a href={l.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-white/30 pb-4">
                <span>
                  <span className="font-mono-caps block text-[10px] text-white/70">{l.label}</span>
                  <span className="font-serif-display mt-1 block text-3xl">{l.value}</span>
                </span>
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-5 py-6 text-paper md:px-10">
      <div className="font-mono-caps flex flex-wrap items-center justify-between gap-4 text-[10px] text-white/55">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          Issue Nº {issue.number} · {issue.season}
        </span>
        <a href="#cover" className="hover:text-white">
          Back to cover ↑
        </a>
      </div>
    </footer>
  );
}

function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 md:p-10"
      onClick={onClose}
    >
      <img src={photo.src} alt={photo.caption} className="fade-up max-h-full max-w-full object-contain" style={{ animationDuration: "0.4s" }} />
      <button type="button" onClick={onClose} className="absolute right-4 top-4 text-white md:right-8 md:top-8" aria-label="Close" autoFocus>
        <X className="h-8 w-8" />
      </button>
      <p className="font-mono-caps absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/70">{photo.caption}</p>
    </div>
  );
}
