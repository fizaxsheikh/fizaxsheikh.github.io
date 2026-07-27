import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  CreditCard,
  ExternalLink,
  FileSearch,
  Gauge,
  Globe2,
  LifeBuoy,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  MousePointerClick,
  PenTool,
  Settings2,
  Sparkles,
  UserRound,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import mePhoto from "../../assets/me.avif";
import fizaPortfolioHome from "../../assets/work/fiza-portfolio-home.jpg";
import oasisHome from "../../assets/work/oasis-grand-hall-home.jpg";
import oasisMobile from "../../assets/work/oasis-grand-hall-mobile.jpg";
import xoomHome from "../../assets/work/xoom-wireless-home.jpg";
import xoomOffers from "../../assets/work/xoom-wireless-offers.jpg";
import { Button } from "../../components/ui/button";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const demoTabs = [
  {
    id: "website",
    label: "Website",
    icon: Globe2,
  },
  {
    id: "booking",
    label: "Booking",
    icon: CalendarCheck,
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "automation",
    label: "Automation",
    icon: Workflow,
  },
];

const serviceGroups = [
  {
    eyebrow: "First impression",
    title: "Make a strong first impression",
    text: "Custom websites, redesigns, personal portfolios, and landing pages that explain what you do without making people work for it.",
    icon: Sparkles,
    items: ["Custom websites", "Website redesigns", "Personal portfolios", "Landing pages"],
  },
  {
    eyebrow: "Conversion",
    title: "Turn interest into action.",
    text: "Booking flows, inquiry forms, payment paths, and clear calls to action so people can actually take the next step.",
    icon: CalendarCheck,
    items: ["Booking systems", "Inquiry forms", "Payments", "Clear CTAs"],
  },
  {
    eyebrow: "Operations",
    title: "Make the work behind it easier.",
    text: "Automations, analytics, dashboards, and integrations that reduce repetitive work and keep useful information where you need it.",
    icon: Workflow,
    items: ["Automations", "Analytics", "Dashboards", "Integrations"],
  },
  {
    eyebrow: "Keep it working",
    title: "Keep it working.",
    text: "Maintenance, updates, SEO foundations, and performance improvements so your site can keep doing its job.",
    icon: LifeBuoy,
    items: ["Maintenance", "Updates", "SEO foundations", "Performance"],
  },
];

const capabilities = [
  "Business websites",
  "Portfolio websites",
  "Landing pages",
  "Booking flows",
  "Payment integrations",
  "Analytics setups",
  "Forms and inquiries",
  "Automations",
  "Dashboards",
  "Website maintenance",
];

const projects = [
  {
    title: "Oasis Grand Hall",
    category: "Event venue website",
    need:
      "Oasis Grand Hall needed a polished digital home that could communicate the venue's atmosphere while making tours, pricing information, and payments easier to access.",
    built:
      "I designed and developed a responsive website with venue storytelling, gallery content, tour booking, and payment pathways.",
    role: "Design and development",
    services: ["Responsive website", "Gallery experience", "Tour booking flow", "Payment flow"],
    tech: ["React", "TypeScript", "Vite"],
    link: "https://www.oasisgrandhall.com/",
    accent: "venue",
    images: [
      { src: oasisHome, alt: "Oasis Grand Hall homepage screenshot" },
      { src: oasisMobile, alt: "Oasis Grand Hall mobile homepage screenshot" },
    ],
  },
  {
    title: "Xoom Wireless",
    category: "Business website",
    need:
      "Xoom Wireless needed a practical business website for customers looking for phones, repairs, offers, reviews, location details, and direct ways to get in touch.",
    built:
      "I designed and developed a responsive site structure that presents core services, product categories, offers, and contact actions clearly.",
    role: "Design and development",
    services: ["Business website", "Product categories", "Repair service pages", "Location and contact flow"],
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://www.xoomwirelessok.com/",
    accent: "wireless",
    images: [
      { src: xoomHome, alt: "Xoom Wireless homepage screenshot" },
      { src: xoomOffers, alt: "Xoom Wireless offers page screenshot" },
    ],
  },
  {
    title: "Fiza Sheikh Personal Portfolio",
    category: "Personal project",
    need:
      "An interactive personal portfolio where I explored motion, visual storytelling, responsive development, and a more expressive approach to frontend design.",
    built:
      "I designed and built a custom React portfolio with responsive layouts, interactive navigation, animation, and personal branding.",
    role: "Visual design and development",
    services: ["Custom visual design", "Responsive layout", "Interactive navigation", "Animation"],
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "/",
    accent: "portfolio",
    images: [
      { src: fizaPortfolioHome, alt: "Fiza Sheikh portfolio homepage screenshot" },
    ],
  },
];

const websitePackages = [
  {
    name: "Essential Website",
    price: "Starting at $800",
    description: "A strong starting point when you need a professional website without overcomplicating the project.",
    features: [
      "Up to five pages",
      "Mobile-responsive design",
      "Contact or inquiry form",
      "Basic SEO foundations",
      "Social links and Google Maps",
      "Launch support",
    ],
  },
  {
    name: "Business Website",
    price: "Starting at $1,500",
    description: "For businesses that need the site to help with bookings, forms, visibility, or better customer flow.",
    features: [
      "Everything in Essential",
      "Booking or scheduling integration",
      "Testimonials or reviews",
      "Analytics",
      "Advanced forms",
      "Improved SEO structure",
      "Basic integrations",
    ],
    highlighted: true,
  },
  {
    name: "Custom Website and Systems",
    price: "Custom quote",
    description: "For bigger builds where the website connects to payments, workflows, dashboards, or custom functionality.",
    features: [
      "Payments",
      "Advanced booking workflows",
      "Email or CRM integrations",
      "Dashboards",
      "Automations",
      "Custom functionality",
    ],
  },
];

const carePlans = [
  {
    name: "Website Care",
    price: "Starting at $79 per month",
    features: [
      "Routine updates",
      "Uptime monitoring",
      "Backups where supported",
      "Up to 30 minutes of minor content edits",
    ],
  },
  {
    name: "Growth Care",
    price: "Starting at $169 per month",
    features: [
      "Everything in Website Care",
      "Up to two hours of edits",
      "Basic analytics summary",
      "SEO checks",
      "Priority response",
    ],
  },
  {
    name: "Ongoing Partner",
    price: "Custom monthly quote",
    features: [
      "Landing pages",
      "New functionality",
      "Automation support",
      "Conversion improvements",
      "Ongoing strategic work",
    ],
  },
];

const addOns = [
  "Google Business Profile setup",
  "Domain connection",
  "Professional email setup",
  "Copywriting",
  "SEO audit",
  "Booking-system integration",
  "Payment integration",
  "Analytics setup",
  "Speed optimization",
  "Additional landing pages",
];

const processSteps = [
  {
    title: "Tell me everything",
    text: "We talk through your goals, customers, problems, timeline, budget, and what is currently driving you insane.",
  },
  {
    title: "I map it out",
    text: "I turn that conversation into a clear scope, recommendation, and proposal so everyone knows what we are building.",
  },
  {
    title: "We find the look",
    text: "I shape the visual direction, content structure, and the interactions that matter most.",
  },
  {
    title: "I build it",
    text: "You get progress updates instead of wondering what vanished into the void.",
  },
  {
    title: "We refine it",
    text: "We review the site, fix issues, and make the agreed revisions with care.",
  },
  {
    title: "We launch",
    text: "I help connect the final pieces and can stay involved after launch if you want support.",
  },
];

const faqs = [
  {
    question: "How much does a website cost?",
    answer:
      "Entry-level website projects currently start around $800. Projects with booking, payments, custom workflows, or more complex content cost more because there is more to design, build, test, and connect.",
  },
  {
    question: "How long does it take?",
    answer:
      "A focused website can often come together in a few weeks once the direction and content are clear. Larger builds depend on scope, feedback timing, integrations, and how much content needs to be created.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Helpful starting points include your services, pricing if public, photos, brand materials, social links, examples you like, and any current website access. If you do not have everything ready, we can sort out what matters first.",
  },
  {
    question: "Can you help with writing?",
    answer:
      "Yes. I can help organize, edit, and write website copy so it sounds clear and human. Full copywriting can be scoped into the project when needed.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. I can review what you have, keep what is working, and rebuild the parts that feel outdated, confusing, or hard to maintain.",
  },
  {
    question: "Can you maintain a website you did not build?",
    answer:
      "Usually. I would review the current setup first so I can understand the platform, plugins, hosting, and any risks before promising ongoing maintenance.",
  },
  {
    question: "Can you add payments or booking?",
    answer:
      "Yes, depending on the platform and workflow. Sometimes that means a simple integration. Sometimes it means designing a better flow from inquiry to confirmation.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "I can help choose and configure hosting, but I usually recommend that the account stays under your business so you keep ownership and access.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You can take the site and run with it, or we can set up a care plan for updates, edits, analytics, and ongoing improvements.",
  },
  {
    question: "Are payment plans available?",
    answer:
      "Project milestones may be available depending on scope. Most projects require a deposit before work begins.",
  },
];

const audience = [
  "Local businesses",
  "Creators",
  "Service providers",
  "Growing brands",
];

export const WebsitesPage = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState("services");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formNotice, setFormNotice] = useState("");
  const [activeDemo, setActiveDemo] = useState(0);
  const [isDemoPaused, setIsDemoPaused] = useState(false);
  const demoTimer = useRef<number | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    const description =
      "Fiza Digital designs and builds websites, booking flows, payment integrations, analytics setups, automations, and maintenance for small businesses, creators, and growing ideas.";
    document.title = "Fiza Digital | Websites and Practical Web Systems";

    const setMeta = (selector: string, value: string) => {
      const element = document.head.querySelector<HTMLMetaElement>(selector);
      if (element) {
        element.setAttribute("content", value);
      }
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', "Fiza Digital | Websites and Practical Web Systems");
    setMeta('meta[property="og:description"]', description);

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.35, 0.65] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (isDemoPaused || reduceMotion.matches) {
      return undefined;
    }

    demoTimer.current = window.setInterval(() => {
      setActiveDemo((current) => (current + 1) % demoTabs.length);
    }, 5200);

    return () => {
      if (demoTimer.current) {
        window.clearInterval(demoTimer.current);
      }
    };
  }, [activeDemo, isDemoPaused]);

  const chooseDemo = (index: number) => {
    if (demoTimer.current) {
      window.clearInterval(demoTimer.current);
    }

    setActiveDemo(index);
  };

  const activeDemoId = demoTabs[activeDemo].id;

  return (
    <div className="websites-page">
      <div className="websites-load-screen" aria-hidden="true">
        <span>Fiza Digital</span>
      </div>

      <header className="websites-nav">
        <a className="websites-brand" href="/websites" aria-label="Fiza Digital home">
          <span className="websites-brand-mark">FD</span>
          <span>
            Fiza Digital
            <small>Designed and built by Fiza Sheikh</small>
          </span>
        </a>
        <nav className="websites-nav-links" aria-label="Website services navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={activeSection === item.href.slice(1) ? "websites-nav-link-active" : ""}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="websites-nav-actions">
          <a className="websites-portfolio-link" href="/">
            Portfolio
          </a>
          <Button asChild className="websites-button websites-button-dark websites-nav-cta">
            <a href="#contact">Start a Project</a>
          </Button>
          <button
            type="button"
            className="websites-menu-button"
            aria-controls="websites-mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
        <div
          id="websites-mobile-menu"
          className={`websites-mobile-menu ${isMobileMenuOpen ? "websites-mobile-menu-open" : ""}`}
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
            Start a Project
          </a>
          <a href="/" onClick={() => setIsMobileMenuOpen(false)}>
            Personal portfolio
          </a>
        </div>
      </header>

      <main>
        <section className="websites-hero">
          <div className="websites-hero-copy websites-reveal">
            <p className="websites-eyebrow">Websites, systems, and useful internet things</p>
            <h1>
              Need a website? <span>Great.</span>
              <br />
              Need something more? <span>Even better.</span>
            </h1>
            <p className="websites-hero-text">
              I design and build websites, booking flows, payments, forms, analytics, and
              automations for small businesses and growing ideas. You bring the problem. I&apos;ll
              help figure out what the right build looks like.
            </p>
            <div className="websites-hero-actions">
              <Button asChild className="websites-button websites-button-dark">
                <a href="#contact">
                  Start a Project
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="websites-button websites-button-light">
                <a href="#work">See What I&apos;ve Built</a>
              </Button>
            </div>
            <p className="websites-trust-line">
              No corporate runaround. You work directly with me from the first idea to launch.
            </p>
            <p className="websites-audience-line">
              For small businesses, creators, personal brands, and people building something worth
              showing the world.
            </p>
            <div className="websites-client-list" aria-label="People and businesses served">
              {audience.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
          </div>

          <div className="websites-hero-visual websites-reveal">
            <div
              className="websites-capability-demo"
              aria-label="Interactive examples of things Fiza can build"
              onMouseEnter={() => setIsDemoPaused(true)}
              onMouseLeave={() => setIsDemoPaused(false)}
              onFocus={() => setIsDemoPaused(true)}
              onBlur={() => setIsDemoPaused(false)}
            >
              <div className="websites-browser-top">
                <span />
                <span />
                <span />
                <p>Explore what I can build</p>
              </div>
              <div className="websites-demo-tabs" role="tablist" aria-label="Capability examples">
                {demoTabs.map(({ icon: Icon, label }, index) => (
                  <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={activeDemo === index}
                    aria-controls={`websites-demo-panel-${index}`}
                    id={`websites-demo-tab-${index}`}
                    className={activeDemo === index ? "websites-demo-tab-active" : ""}
                    onClick={() => chooseDemo(index)}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="websites-demo-stage">
                <article
                  id={`websites-demo-panel-${activeDemo}`}
                  role="tabpanel"
                  aria-labelledby={`websites-demo-tab-${activeDemo}`}
                  className={`websites-demo-panel websites-demo-${activeDemoId}`}
                >
                  {activeDemoId === "website" && (
                    <>
                      <div className="websites-mini-nav">
                        <strong>Studio North</strong>
                        <span>Services</span>
                        <span>Work</span>
                        <span>Book</span>
                      </div>
                      <div className="websites-mini-hero">
                        <p>Demo interface</p>
                        <h2>A clear home for a growing business.</h2>
                        <button type="button">Start here</button>
                      </div>
                      <div className="websites-mini-services">
                        <span>Brand site</span>
                        <span>Service pages</span>
                        <span>Contact path</span>
                      </div>
                    </>
                  )}
                  {activeDemoId === "booking" && (
                    <>
                      <p className="websites-demo-label">Demo interface</p>
                      <h2>Tour request</h2>
                      <div className="websites-calendar-grid" aria-label="Illustrative date selector">
                        {["M", "T", "W", "T", "F", "S", "S", "12", "13", "14", "15", "16", "17", "18"].map(
                          (day, index) => (
                            <span className={day === "15" ? "websites-date-selected" : ""} key={`${day}-${index}`}>
                              {day}
                            </span>
                          ),
                        )}
                      </div>
                      <div className="websites-demo-confirm">
                        <CalendarCheck aria-hidden="true" />
                        Selected time: Thursday at 3:30 PM. Request ready to confirm.
                      </div>
                    </>
                  )}
                  {activeDemoId === "payments" && (
                    <>
                      <p className="websites-demo-label">Demo interface</p>
                      <h2>Deposit checkout</h2>
                      <div className="websites-payment-card">
                        <span>Venue tour deposit</span>
                        <strong>$150.00</strong>
                        <div />
                        <div />
                      </div>
                      <div className="websites-demo-confirm">
                        <CreditCard aria-hidden="true" />
                        Payment path ready. Confirmation follows after checkout.
                      </div>
                    </>
                  )}
                  {activeDemoId === "analytics" && (
                    <>
                      <p className="websites-demo-label">Illustrative values</p>
                      <h2>Simple weekly snapshot</h2>
                      <div className="websites-analytics-grid">
                        <span><strong>428</strong>Visits</span>
                        <span><strong>19</strong>Inquiries</span>
                        <span><strong>Search</strong>Top source</span>
                      </div>
                      <div className="websites-chart" aria-hidden="true">
                        <span /><span /><span /><span /><span />
                      </div>
                    </>
                  )}
                  {activeDemoId === "automation" && (
                    <>
                      <p className="websites-demo-label">Demo interface</p>
                      <h2>After someone clicks submit</h2>
                      <ol className="websites-automation-list">
                        <li>Inquiry received</li>
                        <li>Confirmation sent</li>
                        <li>Lead added to spreadsheet</li>
                        <li>Follow-up scheduled</li>
                      </ol>
                    </>
                  )}
                </article>
              </div>
              <div className="websites-currently-building">
                <span />
                Built with strategy, code, curiosity, and an unreasonable number of browser tabs.
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="websites-section websites-services-section">
          <div className="websites-section-heading websites-reveal">
            <p className="websites-eyebrow">Services</p>
            <h2>I build what people see—and what keeps things running behind it.</h2>
            <p>
              Sometimes you need a polished website. Sometimes you need a smoother way to collect
              inquiries, take payments, or organize the work happening after someone clicks submit.
            </p>
          </div>
          <div className="websites-service-editorial">
            {serviceGroups.map(({ icon: Icon, eyebrow, title, text, items }, index) => (
              <article
                className={`websites-service-card websites-service-card-${index + 1} websites-reveal`}
                key={title}
              >
                <div className="websites-service-card-top">
                  <Icon aria-hidden="true" />
                  <span>{eyebrow}</span>
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="websites-service-mini" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            ))}
          </div>
          <div className="websites-section-cta websites-reveal">
            <p>Not sure what you need yet? That&apos;s part of what I help figure out.</p>
            <Button asChild className="websites-button websites-button-dark">
              <a href="#contact">Tell Me What You&apos;re Building</a>
            </Button>
          </div>
          <div className="websites-capability-strip websites-reveal" aria-label="Things Fiza can build">
            <div className="websites-capability-track">
              {[...capabilities, ...capabilities].map((capability, index) => (
                <p key={`${capability}-${index}`}>{capability}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="websites-section websites-work-section">
          <div className="websites-section-heading websites-reveal">
            <p className="websites-eyebrow">Selected Work</p>
            <h2>Different ideas call for different builds.</h2>
            <p>
              Here are a few websites I&apos;ve designed and developed so far, from a service-based
              business to a wireless brand and my own interactive portfolio.
            </p>
          </div>
          <div className="websites-project-stack">
            {projects.map((project, index) => (
              <article
                className={`websites-project-card websites-project-${project.accent} websites-reveal`}
                key={project.title}
              >
                <div className="websites-project-visual">
                  <div className="websites-desktop-mockup">
                    <div className="websites-browser-top">
                      <span />
                      <span />
                      <span />
                    </div>
                    <img src={project.images[0].src} alt={project.images[0].alt} />
                  </div>
                  {project.images[1] ? (
                    <div className="websites-mobile-mockup">
                      <img src={project.images[1].src} alt={project.images[1].alt} />
                    </div>
                  ) : (
                    // TODO: Add a real mobile screenshot when a project-specific mobile asset is available.
                    <div className="websites-mobile-mockup websites-mobile-mockup-label" aria-hidden="true">
                      <span />
                      <strong>{String(index + 1).padStart(2, "0")}</strong>
                      <div />
                      <div />
                      <div />
                    </div>
                  )}
                </div>
                <div className="websites-project-copy">
                  <p className="websites-case-kicker">{project.category}</p>
                  <h3>{project.title}</h3>
                  <div className="websites-project-story">
                    <span>Problem or need</span>
                    <p>{project.need}</p>
                  </div>
                  <div className="websites-project-story">
                    <span>What I designed or built</span>
                    <p>{project.built}</p>
                  </div>
                  <div className="websites-project-meta">
                    <div>
                      <span>My role</span>
                      <strong>{project.role}</strong>
                    </div>
                    <div>
                      <span>Services</span>
                      <ul>
                        {project.services.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span>Tech</span>
                      <p>{project.tech.join(", ")}</p>
                    </div>
                  </div>
                  {project.link && (
                    <a className="websites-project-link" href={project.link}>
                      View live
                      <ExternalLink aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="websites-section-cta websites-section-cta-dark websites-reveal">
            <p>Have something completely different in mind? Even better.</p>
            <Button asChild className="websites-button websites-button-light">
              <a href="#contact">Start a Conversation</a>
            </Button>
          </div>
        </section>

        <section id="pricing" className="websites-section">
          <div className="websites-section-heading websites-reveal">
            <p className="websites-eyebrow">Pricing</p>
            <h2>Start simple. Add power where it actually helps.</h2>
            <p>
              These are starting points. Final pricing depends on complexity, content, integrations,
              and timeline.
            </p>
          </div>
          <div className="websites-pricing-grid">
            {websitePackages.map((plan) => (
              <article
                className={`websites-price-card websites-reveal ${plan.highlighted ? "websites-price-card-featured" : ""}`}
                key={plan.name}
              >
                {plan.highlighted && (
                  <span className="websites-popular">Best starting point for most businesses</span>
                )}
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
                <p>{plan.description}</p>
                <ul className="websites-check-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="websites-section-cta websites-reveal">
            <p>Have a rough budget but not a clean scope yet? We can start there.</p>
            <Button asChild className="websites-button websites-button-dark">
              <a href="#contact">Ask About a Project</a>
            </Button>
          </div>
        </section>

        <section className="websites-section websites-care-section">
          <div className="websites-section-heading websites-reveal">
            <p className="websites-eyebrow">Monthly website care</p>
            <h2>For the “please do not let this break quietly” era.</h2>
            <p>
              Simple support after launch. Unused edit time does not automatically roll over unless
              agreed, and major redesigns or new features are quoted separately.
            </p>
          </div>
          <div className="websites-pricing-grid">
            {carePlans.map((plan) => (
              <article className="websites-price-card websites-reveal" key={plan.name}>
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
                <ul className="websites-check-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="websites-care-note websites-reveal">
            “Unlimited edits” are not included unless we specifically agree on that scope.
          </p>
        </section>

        <section className="websites-section websites-addons">
          <div className="websites-section-heading websites-reveal">
            <p className="websites-eyebrow">Add-ons</p>
            <h2>Useful extras when the project calls for them.</h2>
          </div>
          <div className="websites-addon-grid websites-reveal">
            {addOns.map((addOn) => (
              <span key={addOn}>{addOn}</span>
            ))}
          </div>
        </section>

        <section id="process" className="websites-section websites-process">
          <div className="websites-section-heading websites-reveal">
            <p className="websites-eyebrow">Process</p>
            <h2>No disappearing for three weeks and returning with a mystery website.</h2>
          </div>
          <ol className="websites-process-list">
            {processSteps.map((step, index) => (
              <li className="websites-reveal" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="websites-section websites-about">
          <div className="websites-about-photo websites-reveal">
            <img src={mePhoto} alt="Fiza Sheikh" />
            <span>Based in Los Angeles. Working with good ideas everywhere.</span>
          </div>
          <div className="websites-reveal">
            <p className="websites-eyebrow">About</p>
            <h2>Hi, I&apos;m Fiza.</h2>
            <p>
              I like solving problems. Sometimes that means designing a website. Sometimes it means
              building a booking flow, connecting payments, organizing analytics, or cleaning up a
              frustrating process behind the scenes.
            </p>
            <p>
              My background combines web development, business operations, data, and user-focused
              design. I care about how your website looks, but I care even more about whether people
              understand it and know what to do next.
            </p>
            <p className="websites-signature">You work directly with me throughout the project.</p>
            <Button asChild className="websites-button websites-button-light websites-about-cta">
              <a href="#contact">Tell Me What You&apos;re Building</a>
            </Button>
          </div>
        </section>

        <section id="faq" className="websites-section">
          <div className="websites-section-heading websites-reveal">
            <p className="websites-eyebrow">FAQ</p>
            <h2>Good questions before we build anything.</h2>
          </div>
          <div className="websites-faq-grid">
            {faqs.map((faq) => (
              <details className="websites-faq-item websites-reveal" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="websites-section websites-final-cta">
          <div className="websites-final-copy websites-reveal">
            <p className="websites-eyebrow">Start a project</p>
            <h2>Tell me what you&apos;re building.</h2>
            <p>
              You do not need to have every detail figured out yet. Tell me what you want, what is
              not working, and what would make your life easier.
            </p>
            <div className="websites-contact-notes">
              <span>
                <UserRound aria-hidden="true" />
                Directly with Fiza
              </span>
              <span>
                <PenTool aria-hidden="true" />
                Clear scope before build
              </span>
            </div>
          </div>

          <form
            className="websites-contact-form websites-reveal"
            onSubmit={(event) => {
              event.preventDefault();
              // TODO: Connect this form to a submission service before launch.
              setFormNotice(
                "This form is almost ready, but it is not connected yet. For now, email me directly through the contact section on my main portfolio.",
              );
            }}
          >
            <label>
              Name
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              Business or project name
              <input name="business" type="text" autoComplete="organization" />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Current website, optional
              <input name="website" type="url" placeholder="https://" />
            </label>
            <label>
              What do you need help with?
              <select name="help" defaultValue="">
                <option value="" disabled>Select one</option>
                <option>New website</option>
                <option>Website redesign</option>
                <option>Portfolio or personal brand</option>
                <option>Booking or payments</option>
                <option>Maintenance</option>
                <option>SEO or analytics</option>
                <option>Automation or dashboard</option>
              </select>
            </label>
            <label>
              Estimated budget
              <select name="budget" defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Under $800</option>
                <option>$800–$1,500</option>
                <option>$1,500–$3,000</option>
                <option>$3,000–$5,000</option>
                <option>$5,000+</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label>
              Ideal timeline
              <input name="timeline" type="text" placeholder="Example: within 4-6 weeks" />
            </label>
            <label className="websites-field-full">
              Project details
              <textarea name="details" rows={5} required />
            </label>
            {formNotice && (
              <p className="websites-form-notice websites-field-full" role="status">
                {formNotice}
              </p>
            )}
            <Button className="websites-button websites-button-dark websites-field-full" type="submit">
              <Mail aria-hidden="true" />
              Send Project Details
            </Button>
          </form>
        </section>
      </main>

      <footer className="websites-footer">
        <span>Fiza Digital</span>
        <span>
          <MapPin aria-hidden="true" />
          Designed and built by Fiza Sheikh
        </span>
        <a href="/">Back to personal portfolio</a>
      </footer>

      <div className="websites-floating-tools" aria-hidden="true">
        <MousePointerClick />
        <FileSearch />
        <Gauge />
        <MessageSquare />
        <Settings2 />
      </div>
    </div>
  );
};
