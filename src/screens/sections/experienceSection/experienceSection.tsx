import React, { useState } from "react";
import acmCloudLogo from "../../../assets/acm_cloud_logo.jpeg";
import acmDevLogo from "../../../assets/acm_dev_logo.jpeg";
import zuruLogo from "../../../assets/zuru_logo.jpeg";
import acmWLogo from "../../../assets/acm_w_logo.jpeg";
import girlGainsLogo from "../../../assets/girl_gains_logo.jpeg";
import creativeLabsLogo from "../../../assets/creativelabs_la_logo.jpeg";
import dataresLogo from "../../../assets/ucla_datares_logo.jpeg";
import officePresidentLogo from "../../../assets/office_of_president_logo.jpeg";
import youngInvinciblesLogo from "../../../assets/young_invincibles_logo.jpeg";

const experienceTabs = [
  {
    label: "Tech Consultant",
    role: "Technology Consultant",
    company: "ACM Cloud @ UCLA",
    timeframe: "Oct 2025 - Present",
    year: "2025",
    logo: acmCloudLogo,
    bullets: [
      "Cloud work taught me to design for silence: systems should be resilient before they are impressive.",
      "I learned to prioritize failure paths early, because reliability is a product decision.",
    ],
  },
  {
    label: "Impact Intern",
    role: "Impact Intern",
    company: "ACM at UCLA",
    timeframe: "Oct 2025 - Present",
    year: "2025",
    logo: acmDevLogo,
    bullets: [
      "I learned to translate impact into operational choices, not just narratives.",
      "Data can be a care language only if the audience can act on it.",
    ],
  },
  {
    label: "Biz Ops",
    role: "Business Operations Analyst",
    company: "ZURU",
    timeframe: "Jun 2025 - Sep 2025",
    year: "2025",
    logo: zuruLogo,
    bullets: [
      "Forecasting sharpened my sense of decision timing—what matters is the window, not the number.",
      "I learned to separate signal from operational noise without losing speed.",
    ],
  },
  {
    label: "Prod + SW",
    role: "Product & Software Development Intern",
    company: "ACM W (ACM @ UCLA)",
    timeframe: "Jan 2025 - Jun 2025",
    year: "2025",
    logo: acmWLogo,
    bullets: [
      "Building with users nearby taught me to treat product as a conversation, not a release.",
      "I learned to trade elegance for clarity when the moment calls for it.",
    ],
  },
  {
    label: "VP Intern",
    role: "Presidential & Vice Presidential Intern",
    company: "Girl Gains UCLA",
    timeframe: "Jan 2025 - Jun 2025",
    year: "2025",
    logo: girlGainsLogo,
    bullets: [
      "Stewarding a board taught me that alignment is a system, not a meeting.",
      "I learned to anticipate second-order effects before they become policy constraints.",
    ],
  },
  {
    label: "Project Manager",
    role: "Project Manager",
    company: "Creative Labs",
    timeframe: "Jan 2025 - Mar 2025",
    year: "2025",
    logo: creativeLabsLogo,
    bullets: [
      "Leading creatives taught me to protect the problem statement while letting the solution breathe.",
      "I learned to decide when to push for structure and when to let momentum run.",
    ],
  },
  {
    label: "Blog Intern",
    role: "Blog Intern",
    company: "DataRes at UCLA",
    timeframe: "Apr 2024 - Jun 2024",
    year: "2024",
    logo: dataresLogo,
    bullets: [
      "Writing data stories forced me to earn attention before asking for trust.",
      "I learned to frame analysis in human stakes without diluting rigor.",
    ],
  },
  {
    label: "Office Pres",
    role: "Office of the President Intern",
    company: "UCLA Undergraduate Students Association Council (USAC)",
    timeframe: "Apr 2024 - Jun 2024",
    year: "2024",
    logo: officePresidentLogo,
    bullets: [
      "Working in campus operations taught me that small frictions compound into policy.",
      "I learned to design dashboards for decisions, not visibility.",
    ],
  },
  {
    label: "YI Program",
    role: "Young Advocates Leadership Program Intern",
    company: "Young Invincibles",
    timeframe: "Sep 2023 - Dec 2023",
    year: "2023",
    logo: youngInvinciblesLogo,
    bullets: [
      "Advocacy work taught me to measure movement, not just awareness.",
      "I learned to translate lived experience into actionable priorities.",
    ],
  },
];

export const ExperienceSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = experienceTabs[activeIndex];

  return (
    <section id="experience" className="layout-experience-section">
      <div className="layout-experience-background">
        <div
          className="layout-experience-background-image"
          style={{ "--parallax-speed": "0.08" } as React.CSSProperties}
        />
      </div>
      <div className="layout-experience-container">
        <div className="layout-experience-row">
          <div className="layout-experience-left">
            <div className="layout-section-title">
              <div className="layout-experience-number">
                <div className="text-experience-number-shadow">
                  02
                </div>
                <div className="text-experience-number-mid">
                  02
                </div>
                <div className="text-experience-number-front">
                  02
                </div>
              </div>

              <h2 className="text-section-heading">
                Experience
              </h2>
            </div>

            <div className="layout-experience-browser">
              <div className="layout-experience-browser-bar">
                <div className="layout-experience-browser-controls">
                  <span className="browser-dot browser-dot-close" />
                  <span className="browser-dot browser-dot-min" />
                  <span className="browser-dot browser-dot-max" />
                </div>
                <div className="layout-experience-browser-title">
                  careers.fiza / experience
                </div>
              </div>
              <div className="md:flex md:gap-5 md:items-start">
                <div className="layout-experience-tabs md:w-[260px] md:flex-col md:items-start md:gap-3 md:relative">
                  <span className="layout-experience-timeline-line" />
                  <div className="flex flex-wrap gap-2 md:grid md:grid-cols-[72px_1fr] md:items-center md:gap-y-3 md:gap-x-4">
                    {experienceTabs.map((tab, index) => {
                      const yearMarkerMap: Record<number, string> = {
                        0: "Present",
                        5: "2025",
                        7: "2024",
                        8: "2023",
                      };
                      const yearLabel = yearMarkerMap[index];
                      const showYear = Boolean(yearLabel);
                      return (
                        <React.Fragment key={tab.label}>
                          <div className="layout-experience-timeline-item md:col-span-1">
                            {showYear ? (
                              <>
                                <span className="layout-experience-timeline-dot" />
                                <span className="layout-experience-timeline-label">{yearLabel}</span>
                              </>
                            ) : (
                              <span className="layout-experience-timeline-spacer" />
                            )}
                          </div>
                          <button
                            type="button"
                            className={`layout-experience-tab md:col-span-1 ${
                              index === activeIndex ? "layout-experience-tab-active" : ""
                            }`}
                            onClick={() => setActiveIndex(index)}
                          >
                            {tab.label}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <div key={activeTab.role} className="layout-experience-browser-body md:flex-1">
                  <div className="layout-experience-browser-header">
                    <h3 className="text-experience-title">
                      {activeTab.role}
                    </h3>
                    <div className="text-experience-meta">
                      <span className="text-experience-company">
                        <img
                          className="text-experience-logo"
                          alt={`${activeTab.company} logo`}
                          src={activeTab.logo}
                        />
                        {activeTab.company}
                      </span>
                      <span>{activeTab.timeframe}</span>
                    </div>
                  </div>
                  <p className="text-experience-insight-label">
                    What This Role Taught Me
                  </p>
                  <ul className="layout-experience-browser-list">
                    {activeTab.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="layout-experience-media">
            <img
              className="layout-experience-image"
              alt="Imageedit"
              src="https://c.animaapp.com/mjnkwousQjNtFo/img/imageedit-11-8385894019-1.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
