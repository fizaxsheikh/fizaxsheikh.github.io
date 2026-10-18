import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { about, cover, digis, issue, nextIssue, profile, ticker, workedWith } from "./content";
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
          <Digis />
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
  { href: "#digis", label: "Digis" },
  { href: "#moodboard", label: "Mood Board" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[color:var(--paper)]/85 backdrop-blur-md">
      <nav className="flex items-center justify-between px-5 py-3 text-[color:var(--ink)] md:px-10 md:py-4" aria-label="Main">
        <a href="#cover" className="font-serif-display text-xl font-semibold tracking-tight md:text-2xl">
          {profile.name}
        </a>
        <ul className="font-mono-caps flex gap-5 text-xs md:gap-9 md:text-xs">
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
        className="font-mono-caps fade-up absolute inset-x-0 top-16 flex justify-between px-5 text-xs text-white md:top-24 md:px-10 md:text-xs md:text-[color:var(--ink)]"
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
          <p className="font-mono-caps text-xs md:text-xs">{cover.sub}</p>
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

// One look per phrase in the About collage. Keys match `style` in content.ts.
const ABOUT_STYLES: Record<string, { className: string; style?: React.CSSProperties; before?: string; after?: string }> = {
  model: { className: "font-serif-display text-5xl italic text-cobalt md:text-7xl" },
  creative: { className: "text-5xl font-black md:text-7xl" },
  la: {
    className: "rounded-md border-[3px] border-white bg-[#0b6b3a] px-4 py-1 font-sans text-2xl font-bold text-white shadow-[0_0_0_3px_#0b6b3a] md:text-4xl",
    before: "↑ ",
  },
  ucla: { className: "text-4xl text-[#2774AE] md:text-6xl", style: { fontFamily: "Graduate, serif", textShadow: "3px 3px 0 #FFD100" } },
  finance: {
    className: "rounded border border-[#0a8a4a]/40 bg-[#0a8a4a]/10 px-3 py-1 font-mono text-lg text-[#0a7a40] md:text-2xl",
    after: " ▲ 2.4%",
  },
  desi: {
    className: "bg-gradient-to-r from-[#ff8a00] via-[#e5007d] to-[#7a1fa2] bg-clip-text pr-2 text-4xl text-transparent md:text-6xl",
    style: { fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 900 },
  },
  genz: { className: "bg-black px-3 py-2 text-lg text-[#7CFF6B] md:text-2xl", style: { fontFamily: "'Press Start 2P', monospace" } },
  gym: { className: "-skew-x-12 text-5xl uppercase tracking-tight md:text-7xl", style: { fontFamily: "Anton, sans-serif" } },
  dog: { className: "text-5xl text-[#7a4a22] md:text-6xl", style: { fontFamily: "Caveat, cursive" }, after: " 🐾" },
  hoops: { className: "text-4xl uppercase text-[#e8590c] md:text-6xl", style: { fontFamily: "Anton, sans-serif" }, before: "🏀 " },
  horror: { className: "text-4xl text-[#b3001b] md:text-6xl", style: { fontFamily: "Creepster, cursive" } },
  rnb: { className: "text-3xl text-[#e0457b] md:text-5xl", style: { fontFamily: "Pacifico, cursive" }, after: " ♫" },
};

const CREATIVE_COLORS = ["#3346e8", "#e0457b", "#121014", "#ff8a00", "#0a8a4a", "#7a1fa2", "#3346e8", "#e0457b"];

function AboutPhrase({ text, look }: { text: string; look: string }) {
  const s = ABOUT_STYLES[look];
  if (look === "creative") {
    // Every letter its own color and tilt
    return (
      <span className={`inline-flex ${s.className}`} aria-label={text}>
        {text.split("").map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block transition-transform duration-300 hover:-translate-y-2"
            style={{ color: CREATIVE_COLORS[i % CREATIVE_COLORS.length], transform: `rotate(${i % 2 ? 6 : -6}deg)` }}
          >
            {ch}
          </span>
        ))}
      </span>
    );
  }
  return (
    <span className={`inline-block transition-transform duration-300 hover:-rotate-2 hover:scale-105 ${s.className}`} style={s.style}>
      {s.before}
      {text}
      {s.after}
    </span>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-5 py-20 md:grid-cols-[1.25fr_1fr] md:gap-14 md:px-10 md:py-28">
      <div>
        <p className="font-mono-caps text-xs text-cobalt">About</p>
        <Reveal>
          <h2 className="font-serif-display mt-4 text-3xl md:text-4xl">{about.intro}</h2>
        </Reveal>
        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5 md:gap-x-8 md:gap-y-6">
          {about.lines.map((l, i) => (
            <Reveal as="li" key={l.text} from="pop" delay={i * 70} className="leading-none">
              <AboutPhrase text={l.text} look={l.style} />
            </Reveal>
          ))}
        </ul>
        <Reveal delay={300} className="mt-10 border-t border-black/15 pt-6">
          <p className="font-mono-caps text-xs text-black/70">Content niches</p>
          <p className="mt-2 text-lg font-medium">{about.niches}</p>
          <p className="font-serif-display mt-8 text-2xl italic md:text-3xl">{about.outro}</p>
        </Reveal>
      </div>
      <div className="w-full">
        <Reveal from="curtain">
          <div className="aspect-video">
            <VideoTile src={about.video.src} poster={about.video.poster} title={about.video.caption}>
              <span className="font-serif-display absolute bottom-4 left-4 text-3xl italic text-white drop-shadow">{about.video.caption}</span>
            </VideoTile>
          </div>
        </Reveal>
        <WorkedWith />
      </div>
    </section>
  );
}

function WorkedWith() {
  const openPhoto = useContext(LightboxContext);
  return (
    <Reveal delay={200} className="mt-6 flex items-center gap-4">
      <span className="font-mono-caps text-xs text-black/70">Worked with</span>
      {workedWith.map((w) => (
        <button
          key={w.brand}
          type="button"
          data-cursor="View"
          onClick={() => openPhoto({ src: w.src, caption: w.brand })}
          className="group flex items-center gap-3"
          aria-label={`Open photo: ${w.brand}`}
        >
          <img src={w.src} alt="" className="h-14 w-10 object-cover transition-transform duration-300 group-hover:scale-110" />
          <span className="font-serif-display text-xl italic underline decoration-black/20 underline-offset-4 group-hover:decoration-[color:var(--cobalt)]">
            {w.brand}
          </span>
        </button>
      ))}
    </Reveal>
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
      <span className="font-mono-caps absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
        {muted ? "Sound off" : "Sound on"}
      </span>
      {children}
    </button>
  );
}

function Digis() {
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
    <section id="digis" ref={sectionRef} className="relative bg-ink text-paper" style={{ height }}>
      <div className={desktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-16"}>
        <div className="mb-8 flex items-end justify-between px-5 md:mb-10 md:px-10">
          <div>
            <h2 className="font-serif-display text-6xl italic md:text-8xl">Digis</h2>
            <p className="font-mono-caps mt-3 text-xs text-white/80">Unretouched · no filters · for agencies & casting</p>
          </div>
          <p className="font-mono-caps hidden text-xs text-white/80 md:block">Keep scrolling →</p>
        </div>
        <div
          ref={trackRef}
          className={`flex gap-4 px-5 will-change-transform md:gap-6 md:px-10 ${desktop ? "" : "snap-x snap-mandatory overflow-x-auto pb-4"}`}
        >
          {digis.map((b, i) => (
            <figure key={b.caption} className="w-[62vw] shrink-0 snap-center md:w-[26vw]">
              <button
                type="button"
                data-cursor="View"
                onClick={() => openPhoto(b)}
                className="photo-hover block aspect-[2/3] max-h-[62vh] w-full overflow-hidden"
                aria-label={`Open photo: ${b.caption}`}
              >
                <img src={b.src} alt={b.caption} loading="lazy" className="h-full w-full object-cover" />
              </button>
              <figcaption className="font-mono-caps mt-3 flex justify-between text-xs text-white/80">
                <span>{String(i + 1).padStart(2, "0")}</span>
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
          <p className="font-mono-caps text-xs text-black/70">Pages from my life, cut & taped</p>
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
            alt="Fiza's mood board: photos from the gym, UCLA, city trips and hikes with Fiza's dog, plus notes on Fiza's niches (beauty & style, lifestyle & wellness, career) and simple pleasures (gaming, basketball, video games, horror movies, R&B and dancing, nightlife)."
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
            <span className="font-mono-caps w-6 text-xs text-black/70">{String(i + 1).padStart(2, "0")}</span>
            <span
              className={`font-serif-display flex-1 text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl ${
                n.done ? "line-through decoration-[color:var(--cobalt)] decoration-2" : ""
              }`}
            >
              {n.goal}
            </span>
            <span className="font-mono-caps text-xs text-black/70">{n.done ? "Done ✓" : "Loading…"}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

// Scroll-driven "step into the frame": the pink photo starts as a small camera viewfinder,
// opens out to fill the screen as you scroll, then the shutter flashes.
function IntoFrame() {
  const [flash, setFlash] = useState(false);
  const fired = useRef(false);
  const ref = useScrollProgress<HTMLDivElement>((p, el) => {
    // The sticky stage is pinned while p runs ~0.3 → 0.7; map that to 0 → 1
    const t = Math.min(1, Math.max(0, (p - 0.28) / 0.4));
    const eased = 1 - Math.pow(1 - t, 3);
    el.style.setProperty("--open", eased.toFixed(4));
    if (t >= 1 && !fired.current) {
      fired.current = true;
      setFlash(true);
      window.setTimeout(() => setFlash(false), 700);
    }
    if (t < 0.6) fired.current = false;
  });

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#d9668f]">
        {/* The photo, clipped to a shrinking-then-growing window */}
        <div
          className="absolute inset-0"
          style={{
            clipPath:
              "inset(calc((1 - var(--open, 0)) * 28%) calc((1 - var(--open, 0)) * 34%) round calc((1 - var(--open, 0)) * 28px))",
          }}
        >
          <img
            src={pink}
            alt={`${profile.name} on a pink backdrop. Start the spark. Connect with me.`}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ transform: "scale(calc(1.35 - var(--open, 0) * 0.35))" }}
          />
        </div>

        {/* Viewfinder overlay: corner brackets ride the edge of the window, then fade as it fills the screen */}
        <div
          className="pointer-events-none absolute"
          style={{
            inset: "calc((1 - var(--open, 0)) * 28% - 14px) calc((1 - var(--open, 0)) * 34% - 14px)",
            opacity: "calc(1.4 - var(--open, 0) * 1.4)",
          }}
          aria-hidden="true"
        >
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={`absolute h-8 w-8 border-white ${c}`} />
          ))}
          <span className="font-mono-caps absolute -top-7 left-0 flex items-center gap-2 text-xs text-white">
            <span className="rec-dot h-2 w-2 rounded-full bg-red-500" /> Rec
          </span>
          <span className="font-mono-caps absolute -top-7 right-0 text-xs text-white">ISO 400 · f/1.8</span>
          <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 border border-white/70" />
        </div>

        {/* Shutter flash once the frame is fully open */}
        <div className={`pointer-events-none absolute inset-0 bg-white ${flash ? "shutter-flash" : "opacity-0"}`} aria-hidden="true" />
      </div>
    </div>
  );
}

function BackCover() {
  const links = [
    { href: profile.instagram, label: "Instagram", value: profile.instagramHandle },
    { href: profile.tiktok, label: "TikTok", value: profile.tiktokHandle },
  ];
  return (
    <section id="contact" className="bg-[#d9668f] text-white">
      <IntoFrame />
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
                  <span className="font-mono-caps block text-xs text-white/80">{l.label}</span>
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
      <div className="font-mono-caps flex flex-wrap items-center justify-between gap-4 text-xs text-white/80">
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
      <p className="font-mono-caps absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/80">{photo.caption}</p>
    </div>
  );
}
