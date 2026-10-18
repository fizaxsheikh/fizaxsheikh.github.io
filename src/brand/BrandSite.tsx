import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { about, cover, digis, instagramPosts, issue, profile, ticker, workedWith } from "./content";
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
          <OnInstagram />
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
    <section id="cover" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-paper">
      <h1 className="sr-only">
        {profile.name}: {profile.titles.join(", ")}
      </h1>

      {/* Issue line */}
      <div
        className="font-mono-caps fade-up absolute inset-x-0 top-[4.5rem] z-30 flex justify-between px-5 text-[11px] md:top-24 md:px-10 md:text-xs"
        style={{ animationDelay: "1.2s" }}
      >
        <span>Issue Nº {issue.number}</span>
        <span className="hidden md:inline">{profile.city}</span>
        <span>{issue.season}</span>
      </div>

      {/* Masthead, behind the cut-out so the hair sits in front of the letters */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[6.5rem] z-10 flex justify-center md:top-[7.5rem]"
        style={{ transform: "translateY(calc(var(--out, 0) * -30vh))" }}
        aria-hidden="true"
      >
        <div className="font-serif-display masthead flex overflow-hidden text-[36vw] leading-[0.78] text-cobalt md:text-[25vw]">
          {letters.map((l, i) => (
            <span key={i} className="letter" style={{ animationDelay: `${0.5 + i * 0.09}s` }}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Cover star: photo cut-out layered over the masthead */}
      <img
        src={cover.cutout}
        alt={`${profile.name}, cover portrait in a cobalt halter top`}
        className="cover-rise absolute bottom-0 left-1/2 z-20 h-[74svh] w-auto max-w-none [-webkit-mask-composite:source-in] [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent),linear-gradient(to_top,transparent,black_12%)] md:h-[84svh]"
        style={{ translate: "-50% calc(var(--out, 0) * 6vh)" }}
      />

      {/* Cover lines */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-5 pb-6 md:px-10 md:pb-10">
        <div className="fade-up max-w-[46%] space-y-2 rounded-sm bg-paper/70 p-2 backdrop-blur-[2px] md:max-w-none md:space-y-3 md:bg-transparent md:p-0 md:backdrop-blur-0" style={{ animationDelay: "1.4s" }}>
          <p className="font-serif-display text-3xl italic leading-[0.95] md:text-5xl lg:text-6xl">{cover.headline}.</p>
          <p className="font-mono-caps text-[10px] md:text-xs">{cover.sub}</p>
        </div>
        <div className="fade-up hidden space-y-3 text-right md:block" style={{ animationDelay: "1.6s" }}>
          {cover.lines.map((l) => (
            <a key={l.href} href={l.href} className="font-serif-display block text-xl transition-colors hover:text-cobalt lg:text-2xl">
              {l.text} <span className="text-cobalt">→</span>
            </a>
          ))}
          <Barcode className="ml-auto mt-4 h-11 w-32" />
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

// Editorial profile: pull quote + short first-person bio on the left, the film still on the right.
function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-10 md:py-36">
      <div className="font-mono-caps flex items-baseline justify-between border-b border-black/15 pb-4 text-xs">
        <span className="text-cobalt">About</span>
        <span className="text-black/60">Profile · Nº {issue.number}</span>
      </div>

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-x-16">
        <div className="md:col-span-5">
          <Reveal>
            <blockquote className="relative">
              <p className="font-serif-display text-[2.6rem] italic leading-[1.04] tracking-[-0.01em] md:text-[3.6rem]">
                <span className="text-cobalt">“</span>
                {about.quote}
                <span className="text-cobalt">”</span>
              </p>
              <footer className="font-mono-caps mt-6 text-xs text-black/60">— {profile.name}</footer>
            </blockquote>
          </Reveal>
          <div className="mt-12 max-w-[34rem] space-y-5 text-[1.075rem] leading-[1.8] text-[color:var(--ink)]/85">
            {about.paragraphs.map((para, i) => (
              <Reveal key={i} delay={120 + i * 100}>
                <p className={i === 0 ? "dropcap" : ""}>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <Reveal from="curtain">
            <figure>
              <div className="aspect-video overflow-hidden">
                <VideoTile src={about.video.src} poster={about.video.poster} title={about.video.caption} />
              </div>
              <figcaption className="font-mono-caps mt-3 flex justify-between text-[11px] text-black/60">
                <span>Fig. 01</span>
                <span>{about.video.caption}</span>
              </figcaption>
            </figure>
          </Reveal>

          <dl className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {about.credentials.map((c, i) => (
              <Reveal key={c.title} delay={i * 110} className="border-t border-black/80 pt-4">
                <span className="font-mono-caps text-[11px] text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                <dt className="font-serif-display mt-2 text-2xl leading-tight">{c.title}</dt>
                <dd className="mt-1.5 text-sm text-black/65">{c.detail}</dd>
              </Reveal>
            ))}
          </dl>
          <WorkedWith />
        </div>
      </div>
    </section>
  );
}

function WorkedWith() {
  const openPhoto = useContext(LightboxContext);
  const brand = "font-serif-display text-lg italic text-black/80 underline decoration-black/20 underline-offset-[5px] transition-colors hover:text-cobalt hover:decoration-[color:var(--cobalt)]";
  return (
    <Reveal delay={200} className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-black/15 pt-5">
      <span className="font-mono-caps text-xs text-black/70">Worked with</span>
      {workedWith.map((w) =>
        w.src ? (
          <button key={w.brand} type="button" data-cursor="View" onClick={() => openPhoto({ src: w.src!, caption: w.brand })} className={brand}>
            {w.brand}
          </button>
        ) : (
          <a key={w.brand} href={w.href} target="_blank" rel="noreferrer" className={brand}>
            {w.brand}
          </a>
        ),
      )}
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
            <p className="font-mono-caps mt-3 text-xs text-white/80">For agencies & casting</p>
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
                <img src={b.src} alt={b.ai ? `${b.caption} (AI-generated)` : b.caption} loading="lazy" className="h-full w-full object-cover" />
              </button>
              <figcaption className="font-mono-caps mt-3 flex justify-between gap-3 text-xs text-white/80">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-right">
                  {b.caption}
                </span>
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
    <section id="moodboard" ref={ref} className="scroll-mt-16 overflow-hidden bg-[#e9e2d6] pt-16 md:pt-24">
      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-5 md:px-10">
        <Reveal>
          <h2 className="font-serif-display text-6xl italic md:text-8xl">The Mood Board</h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="font-mono-caps text-xs text-black/70">Pages from my life, cut & taped</p>
        </Reveal>
      </div>
      <Reveal from="curtain" className="w-full">
        <button
          type="button"
          data-cursor="View"
          onClick={() => openPhoto({ src: moodboard, caption: "The Mood Board" })}
          className="block w-full overflow-hidden"
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

function OnInstagram() {
  return (
    <section className="bg-paper pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 px-5 md:px-10">
        <Reveal>
          <h2 className="font-serif-display text-5xl italic md:text-7xl">On Instagram</h2>
        </Reveal>
        <Reveal delay={120}>
          <a href={profile.instagram} target="_blank" rel="noreferrer" className="font-mono-caps text-xs text-black/70 hover:text-cobalt">
            Follow {profile.instagramHandle} ↗
          </a>
        </Reveal>
      </div>
      <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
        {instagramPosts.map((p, i) => (
          <Reveal key={p.href} delay={i * 70}>
            <a href={p.href} target="_blank" rel="noreferrer" data-cursor="Open" className="group relative block aspect-[4/5] overflow-hidden">
              <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent p-3 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {p.caption}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Scroll-driven "step into the frame": the pink photo starts as a small camera viewfinder,
// opens out to fill the screen as you scroll, the shutter flashes, then the words and
// contact details type themselves onto the photo.
function BackCover() {
  const [flash, setFlash] = useState(false);
  const fired = useRef(false);
  const ref = useScrollProgress<HTMLElement>((p, el) => {
    // The stage is pinned while p runs ~0.28 → 0.72: open the frame first, then reveal the text
    const t = Math.min(1, Math.max(0, (p - 0.24) / 0.28));
    const show = Math.min(1, Math.max(0, (p - 0.5) / 0.16));
    el.style.setProperty("--open", (1 - Math.pow(1 - t, 3)).toFixed(4));
    el.style.setProperty("--show", show.toFixed(4));
    if (t >= 1 && !fired.current) {
      fired.current = true;
      setFlash(true);
      window.setTimeout(() => setFlash(false), 700);
    }
    if (t < 0.6) fired.current = false;
  });

  const links = [
    { href: profile.instagram, label: "Instagram", value: profile.instagramHandle },
    { href: profile.tiktok, label: "TikTok", value: profile.tiktokHandle },
  ];

  return (
    <section id="contact" ref={ref} className="relative h-[260vh] bg-[#d9668f] text-white">
      <h2 className="sr-only">Contact: bookings, collaborations and press</h2>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* The photo, clipped to a window that opens as you scroll */}
        <div
          className="absolute inset-0"
          style={{
            clipPath:
              "inset(calc((1 - var(--open, 0)) * 28%) calc((1 - var(--open, 0)) * 34%) round calc((1 - var(--open, 0)) * 28px))",
          }}
        >
          <img
            src={pink}
            alt={`${profile.name} winking on a pink backdrop`}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ transform: "scale(calc(1.35 - var(--open, 0) * 0.35))" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent md:hidden" />
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

        {/* Words + contact details, written onto the photo once it's open */}
        <div className="absolute inset-0 flex flex-col justify-between px-6 pb-10 pt-24 [text-shadow:0_1px_12px_rgba(0,0,0,0.25)] md:block md:p-0">
          <div className="md:absolute md:left-[7%] md:top-[24%] md:max-w-[30%]">
            <TypeLine text="Start the spark." step={0} />
            <Appear step={1}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Say hi"
                className="font-serif-display group mt-5 inline-flex items-center gap-3 text-5xl italic leading-none md:text-7xl"
              >
                Let's talk
                <ArrowUpRight className="h-[0.7em] w-[0.7em] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
              </a>
              <p className="mt-3 text-base text-white/90 md:text-lg">{profile.email}</p>
              <p className="font-mono-caps mt-1 text-[11px] text-white/80">Bookings · collaborations · press</p>
            </Appear>
          </div>

          <div className="md:absolute md:right-[7%] md:top-[24%] md:w-[26%]">
            <TypeLine text="Connect with me :)" step={1.5} />
            <div className="mt-4 grid gap-3 md:mt-6 md:gap-4">
              {links.map((l, i) => (
                <Appear key={l.label} step={2.2 + i * 0.5}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-white/40 pb-2 md:pb-3">
                    <span>
                      <span className="font-mono-caps block text-[11px] text-white/80">{l.label}</span>
                      <span className="font-serif-display block text-2xl md:text-3xl">{l.value}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                </Appear>
              ))}
            </div>
          </div>

          <div className="hidden text-right md:absolute md:bottom-[8%] md:right-[7%] md:block">
            <TypeLine text="Los Angeles, California" step={3.2} />
            <TypeLine text={`${profile.instagramHandle} · ${profile.tiktokHandle}`} step={4} />
          </div>
        </div>

        {/* Shutter flash once the frame is fully open */}
        <div className={`pointer-events-none absolute inset-0 bg-white ${flash ? "shutter-flash" : "opacity-0"}`} aria-hidden="true" />
      </div>
    </section>
  );
}

// Each text item has a `step`; --show (0 → 1) runs through the steps in order.
const SHOW_STEPS = 5;

// Mono caps line that wipes on left to right, like it's being typed.
function TypeLine({ text, step }: { text: string; step: number }) {
  return (
    <p
      className="font-mono-caps text-xs text-white md:text-sm"
      style={{ clipPath: `inset(0 calc(100% - clamp(0, var(--show, 0) * ${SHOW_STEPS} - ${step}, 1) * 100%) -4px 0)` }}
    >
      {text}
    </p>
  );
}

// Fades and lifts into place when its step comes up.
function Appear({ step, children }: { step: number; children: React.ReactNode }) {
  const v = `clamp(0, var(--show, 0) * ${SHOW_STEPS} - ${step}, 1)`;
  return <div style={{ opacity: v, transform: `translateY(calc((1 - ${v}) * 16px))` }}>{children}</div>;
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
