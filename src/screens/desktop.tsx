import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { StarryBackground } from "../components/starryBackground";
import { AboutMeSection } from "./sections/aboutMeSection";
import { ContactSection } from "./sections/contactSection";
import { ExperienceSection } from "./sections/experienceSection";
import { IntroductionSection } from "./sections/introductionSection";
import { ProjectsSection } from "./sections/projectsSection";

const navigationItems = [
  { label: "HOME", section: "home" },
  { label: "ABOUT", section: "about" },
  { label: "EXPERIENCE", section: "experience" },
  { label: "PROJECTS", section: "projects" },
];

export const Desktop = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [activeBubbleStyle, setActiveBubbleStyle] = useState({ left: 0, width: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigationRef = React.useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  React.useEffect(() => {
    const minimumDurationMs = 2000;
    let hasLoaded = false;
    let minElapsed = false;

    const maybeFinish = () => {
      if (hasLoaded && minElapsed) {
        setIsLoading(false);
      }
    };

    const handleLoad = () => {
      hasLoaded = true;
      maybeFinish();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    const minTimer = window.setTimeout(() => {
      minElapsed = true;
      maybeFinish();
    }, minimumDurationMs);

    const fallback = window.setTimeout(handleLoad, minimumDurationMs);
    return () => {
      window.removeEventListener("load", handleLoad);
      window.clearTimeout(minTimer);
      window.clearTimeout(fallback);
    };
  }, []);

  React.useEffect(() => {
    const updateBubblePosition = () => {
      if (navigationRef.current) {
        const activeButton = navigationRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
        if (activeButton) {
          const navRect = navigationRef.current.getBoundingClientRect();
          const buttonRect = activeButton.getBoundingClientRect();
          setActiveBubbleStyle({
            left: buttonRect.left - navRect.left,
            width: buttonRect.width,
          });
        }
      }
    };

    updateBubblePosition();
    window.addEventListener('resize', updateBubblePosition);
    return () => window.removeEventListener('resize', updateBubblePosition);
  }, [activeSection]);

  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isAtTop = currentY <= 10;
      const isScrollingUp = currentY < lastScrollY;

      setIsScrolled(!isAtTop && !isScrollingUp);
      lastScrollY = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    let rafId: number | null = null;
    const updateParallax = () => {
      rafId = null;
      document.documentElement.style.setProperty(
        "--parallax-offset",
        `${window.scrollY}px`,
      );
    };
    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  React.useEffect(() => {
    const sectionElements = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const sectionId = visibleEntries[0].target.id;
          setActiveSection(sectionId);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="layout-root" data-model-id="202:2">
      {isLoading && (
        <div className="layout-loader" aria-hidden="true">
          <div className="layout-loader-glow" />
          <div className="layout-loader-orbit">
            <div className="layout-loader-ring" />
            <div className="layout-loader-dot" />
          </div>
        </div>
      )}
      <StarryBackground />
      <header
        className={`layout-header ${
          isScrolled ? "layout-header-hidden" : "layout-header-visible"
        }`}
      >
        <div className="layout-header-gradient" />

        <div className="layout-header-inner">
          <div className="layout-header-row">
            <div className="layout-brand">
              <img
                className="layout-brand-logo"
                alt="Logo"
                src="https://c.animaapp.com/mjnkwousQjNtFo/img/image-18-1.png"
              />
              <h1 className="text-brand">
                FIZA SHEIKH
              </h1>
            </div>

          <nav 
            ref={navigationRef}
            className="nav-bar"
          >
            <div 
              className="nav-bubble"
              style={{
                left: `${activeBubbleStyle.left}px`,
                width: `${activeBubbleStyle.width}px`,
                height: 'calc(100% - 0px)',
                top: '0px',
              }}
            />
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                data-section={item.section}
                variant="ghost"
                onClick={() => scrollToSection(item.section)}
                className="nav-button"
              >
                <span
                  className={`text-nav ${
                    activeSection === item.section
                      ? "text-nav-active"
                      : "text-nav-inactive"
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            ))}
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className="nav-toggle-label">
              {isMobileMenuOpen ? "Close" : "Menu"}
            </span>
            <span className={`nav-toggle-icon ${isMobileMenuOpen ? "nav-toggle-icon-open" : ""}`} />
          </button>

          <Button 
            onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
            className="btn-contact !bg-white !text-black !shadow-none hover:!bg-white !rounded-[50px] !px-5 !py-3.5">
            <span className="text-btn-contact">
              CONTACT
            </span>
          </Button>
          </div>

          <div
            id="mobile-menu"
            className={`nav-mobile-panel ${isMobileMenuOpen ? "nav-mobile-panel-open" : ""}`}
          >
            {navigationItems.map((item) => (
              <button
                key={item.section}
                type="button"
                className={`nav-mobile-link ${activeSection === item.section ? "nav-mobile-link-active" : ""}`}
                onClick={() => scrollToSection(item.section)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="layout-main">
        <IntroductionSection />
        <AboutMeSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
};
