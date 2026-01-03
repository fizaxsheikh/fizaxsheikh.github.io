import React, { useMemo, useState } from "react";
import researchPdf from "../../../assets/annotated-BLS_Final_Paper.pdf";

type ProjectCategory = "product" | "ops" | "analytics" | "engineering" | "research";

type ProjectLinkSet = {
  caseStudy?: string;
  code?: string;
  demo?: string;
};

type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  problem: string;
  role: string;
  bullets: [string, string, string];
  outcome?: string;
  stack: string[];
  links: ProjectLinkSet;
  image?: string;
};

const projects: Project[] = [
  {
    id: "sanctuary",
    title: "Sanctuary",
    category: "product",
    problem: "Problem: Personal safety tools were fragmented, slow, or inaccessible in moments of urgency.",
    role: "My role: Led product design and full-stack development for a real-time safety application.",
    bullets: [
      "Designed emergency-first user flows focused on speed, clarity, and low cognitive load.",
      "Implemented real-time safety features including SOS alerts, ride-share tracking, and geo-fencing.",
      "Integrated deterrent and support tools such as fake calls, Safe Walk pairing, and community alerts.",
    ],
    outcome:
      "Outcome: Enabled faster, more confident decision-making in high-risk situations and reduced friction in accessing safety support.",
    stack: ["React", "Firebase", "Twilio API", "Node.js"],
    links: {},
  },
  {
    id: "civix",
    title: "CIVIX",
    category: "product",
    problem:
      "Problem: Political information was fragmented, inaccessible, and overwhelming for young voters, leading to disengagement rather than action.",
    role: "My role: Designed and pitched a data-driven civic engagement platform.",
    bullets: [
      "Synthesized complex political data into clear, action-oriented insights.",
      "Designed user flows that connect information directly to civic action.",
      "Framed engagement metrics around behavior change, not awareness alone.",
    ],
    outcome:
      "Outcome: Lowered the barrier to political participation and increased voter confidence through clarity.",
    stack: ["Product Strategy", "Data Analysis", "UX Research", "Information Design"],
    links: {},
  },
  {
    id: "zuru-ops-analytics",
    title: "ZURU Ops Analytics",
    category: "ops",
    problem: "Problem: Finance decisions lagged behind production reality.",
    role: "My role: Built decision-ready models and reporting.",
    bullets: [
      "Automated weekly P&L rollups across product lines.",
      "Unified supply, inventory, and sales signals into one view.",
      "Built scenario toggles for leadership planning.",
    ],
    outcome: "Outcome: Informed stakeholder decisions under uncertainty.",
    stack: ["Python", "SQL", "Excel", "Tableau"],
    links: {},
  },
  {
    id: "modeling-risk-asymmetric-cost",
    title: "Stability in Periodically Forced Motion",
    category: "analytics",
    problem:
      "Problem: Periodic head motion can cause a ponytail to transition from stable sway to unstable oscillation, but the conditions under which this happens are not obvious.",
    role:
      "My role: Analyzed and explained a physical model of ponytail motion to understand stability under periodic forcing.",
    bullets: [
      "Compared simplified pendulum and flexible-string models to isolate key assumptions.",
      "Reasoned about stability vs instability using small-oscillation and resonance logic.",
      "Connected theoretical results to real-world cadence ranges.",
    ],
    outcome:
      "Outcome: Clear intuition for when oscillatory motion becomes unstable and why.",
    stack: ["Python", "Random Forest", "Logistic Regression", "LDA/QDA", "Lasso", "Ridge"],
    links: {},
  },
  {
    id: "digital-battlefield",
    title: "Who Keeps America Awake?",
    category: "research",
    problem:
      "Problem: Traditional labor market analysis focuses on how much people work, but overlooks when work happens and who absorbs nonstandard hours after 2020.",
    role:
      "My role: Designed and executed an original labor economics analysis using time-use microdata to measure structural shifts in the U.S. workday.",
    bullets: [
      "Constructed a Workday Drift Index to quantify changes in early-morning and late-evening work.",
      "Analyzed hourly participation patterns using American Time Use Survey (ATUS) microdata.",
      "Compared pre- and post-2020 work timing across age groups and industries.",
    ],
    outcome:
      "Outcome: Revealed a persistent contraction of evening work after 2020, showing that the U.S. workday is not breaking but quietly re-shaping, with scheduling burdens increasingly concentrated among younger workers and service industries.",
    stack: ["Python", "Pandas", "Data Visualization", "BLS ATUS Microdata", "Economic Analysis"],
    links: {},
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "product", label: "Product" },
  { key: "ops", label: "Operations" },
  { key: "analytics", label: "Analytics" },
  { key: "research", label: "Research/Writing" },
] as const;

export const ProjectsSection = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const activeProject =
    filteredProjects.find((project) => project.id === activeProjectId) ??
    filteredProjects[0];

  React.useEffect(() => {
    if (!filteredProjects.some((project) => project.id === activeProjectId)) {
      setActiveProjectId(filteredProjects[0]?.id ?? projects[0].id);
    }
  }, [activeProjectId, filteredProjects]);


  return (
    <section id="projects" className="layout-projects-section">
      <div className="layout-projects-background">
        <div
          className="layout-projects-background-image"
          style={{ "--parallax-speed": "0.08" } as React.CSSProperties}
        />
      </div>

      <div className="layout-projects-container">
        <div className="layout-projects-main">
          <div className="layout-projects-left">
            <div className="layout-projects-header">
              <div className="layout-projects-number">
                <div className="text-projects-number-shadow">
                  03
                </div>

                <div className="text-projects-number-mid">
                  03
                </div>

                <div className="text-projects-number-front">
                  03
                </div>
              </div>
              <div>
                <h2 className="text-projects-heading">
                  Projects
                </h2>
                <p className="text-projects-subtext">
                  Selected work where data moved decisions, not just metrics.
                </p>
              </div>
            </div>

            <div className="layout-projects-terminal">
              <div className="layout-projects-filters">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className={`layout-projects-filter ${
                      activeFilter === filter.key ? "layout-projects-filter-active" : ""
                    }`}
                    onClick={() => setActiveFilter(filter.key)}
                    aria-pressed={activeFilter === filter.key}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="layout-projects-tabs">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`layout-projects-tab ${
                      project.id === activeProject.id ? "layout-projects-tab-active" : ""
                    }`}
                    onClick={() => setActiveProjectId(project.id)}
                    aria-pressed={project.id === activeProject.id}
                  >
                    {project.title}
                  </button>
                ))}
              </div>

              <div key={activeProject.id} className="layout-projects-detail">
                <div className="layout-projects-detail-header">
                  <h3 className="text-projects-title">
                    {activeProject.title}
                  </h3>
                  <p className="text-projects-line">
                    {activeProject.problem}
                  </p>
                  <p className="text-projects-line">
                    {activeProject.role}
                  </p>
                </div>

                <div className="layout-projects-detail-block">
                  <p className="text-projects-label">
                    What I built:
                  </p>
                  <ul className="layout-projects-bullets">
                    {activeProject.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-projects-line">
                  {activeProject.outcome ??
                    "Outcome: Informed stakeholder decisions under uncertainty."}
                </p>
                <p className="text-projects-stack">
                  Stack: {activeProject.stack.join(" · ")}
                </p>

                <div className="layout-projects-actions">
                  {activeProject.links.caseStudy && (
                    <a
                      className="btn-projects-action btn-projects-action-primary"
                      href={activeProject.links.caseStudy}
                    >
                      Case Study
                    </a>
                  )}
                  {activeProject.links.code && (
                    <a
                      className="btn-projects-action"
                      href={activeProject.links.code}
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`layout-projects-visual ${
              activeProject.id === "zuru-ops-analytics" ? "layout-projects-visual-stack" : ""
            }`}
          >
            {activeProject.category === "research" ? (
              <div className="layout-projects-pdf-shell">
                <embed
                  className="layout-projects-pdf"
                  src={`${researchPdf}#toolbar=0&navpanes=0&scrollbar=1`}
                  type="application/pdf"
                />
              </div>
            ) : activeProject.id === "sanctuary" ? (
              <div className="layout-projects-embed-wrap">
                <iframe
                  className="layout-projects-embed"
                  src="https://www.canva.com/design/DAGhNHvwWk0/zlaMye7faAzBHUHrVijd4g/view?embed"
                  title="Sanctuary demo day slides"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            ) : activeProject.id === "zuru-ops-analytics" ? (
              <div className="layout-projects-stack">
                <div className="layout-projects-embed-wrap">
                  <div className="layout-projects-embed-caption">Sample slide deck</div>
                  <iframe
                    className="layout-projects-embed"
                    src="https://www.canva.com/design/DAGeGm67Sls/_eGkhMEbvixNRZZfG3oK9g/view?embed"
                    title="ZURU Ops Analytics slides"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                <div className="layout-projects-exhibit" aria-hidden="true">
                  <div className="layout-projects-exhibit-glow" />
                  <div className="layout-projects-decision-diagram">
                    <div className="layout-projects-lanes">
                      <div className="layout-projects-lane">
                        <span className="layout-projects-lane-label">Before</span>
                        <div className="layout-projects-lane-track layout-projects-lane-track-before">
                          <div className="layout-projects-lane-node">Production Reality</div>
                          <span className="layout-projects-lane-connector" />
                          <div className="layout-projects-lane-node">Manual Rollups</div>
                          <span className="layout-projects-lane-connector" />
                          <div className="layout-projects-lane-node">Reconciliation</div>
                          <span className="layout-projects-lane-connector" />
                          <div className="layout-projects-lane-node">Decision</div>
                        </div>
                      </div>
                      <div className="layout-projects-lane layout-projects-lane-after">
                        <span className="layout-projects-lane-label">After</span>
                        <div className="layout-projects-lane-track">
                          <div className="layout-projects-lane-node layout-projects-lane-node-after">Signals</div>
                          <span className="layout-projects-lane-connector layout-projects-lane-connector-after" />
                          <div className="layout-projects-lane-node layout-projects-lane-node-after">Validation</div>
                          <span className="layout-projects-lane-connector layout-projects-lane-connector-after" />
                          <div className="layout-projects-lane-node layout-projects-lane-node-after">Scenarios</div>
                          <span className="layout-projects-lane-connector layout-projects-lane-connector-after" />
                          <div className="layout-projects-lane-node layout-projects-lane-node-after layout-projects-lane-node-active">
                            Decision
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="layout-projects-time-scale">
                      <span>weeks</span>
                      <span>→</span>
                      <span>days</span>
                      <span>→</span>
                      <span>hours</span>
                    </div>
                    <div className="layout-projects-diagram-caption">
                      <p>High-level representation. Visualized for confidentiality.</p>
                      <p>Designed to reduce decision latency under uncertainty.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeProject.id === "civix" ? (
              <div className="layout-projects-embed-wrap">
                <iframe
                  className="layout-projects-embed"
                  src="https://docs.google.com/presentation/d/1YZ_Sme6DkJzkgy_VN2pPZ4i2a0ujMFbeMplXyFV7_vQ/embed?start=false&loop=false&delayms=3000"
                  title="CIVIX pitch slides"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            ) : activeProject.id === "modeling-risk-asymmetric-cost" ? (
              <div
                className="layout-projects-stability"
                role="img"
                aria-label="Conceptual stability diagram showing stable, transition, and unstable regimes under periodic forcing."
              >
                <div className="layout-projects-stability-zones" aria-hidden="true">
                  <div className="layout-projects-stability-zone layout-projects-stability-zone-stable" />
                  <div className="layout-projects-stability-zone layout-projects-stability-zone-transition" />
                  <div className="layout-projects-stability-zone layout-projects-stability-zone-unstable" />
                </div>
                <div className="layout-projects-stability-dividers" aria-hidden="true">
                  <span className="layout-projects-stability-divider layout-projects-stability-divider-left" />
                  <span className="layout-projects-stability-divider layout-projects-stability-divider-right" />
                </div>
                <div className="layout-projects-stability-guides" aria-hidden="true">
                  <svg viewBox="0 0 400 220" preserveAspectRatio="none">
                    <defs>
                      <pattern id="dot-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.12)" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dot-grid)" />
                  </svg>
                </div>
                <div className="layout-projects-stability-vignette" aria-hidden="true" />
                <div className="layout-projects-stability-wave" aria-hidden="true">
                  <svg
                    viewBox="0 0 800 200"
                    preserveAspectRatio="none"
                    className="layout-projects-stability-wave-svg"
                  >
                    <path
                      d="M0 110 C 80 105, 160 115, 240 110 C 320 90, 400 130, 480 110 C 560 70, 640 150, 720 110 C 760 80, 800 140, 800 140"
                      fill="none"
                      stroke="rgba(255,255,255,0.36)"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
                <div className="layout-projects-stability-amplitude" aria-hidden="true">
                  <svg viewBox="0 0 400 220" preserveAspectRatio="none">
                    <g stroke="rgba(255,255,255,0.25)" strokeWidth="1">
                      <path d="M80 90 L90 90 M85 90 L85 110" />
                      <path d="M190 80 L200 80 M195 80 L195 120" />
                      <path d="M300 65 L310 65 M305 65 L305 135" />
                    </g>
                  </svg>
                </div>
                <div className="layout-projects-stability-arrow" aria-hidden="true">
                  <svg viewBox="0 0 400 220" preserveAspectRatio="none">
                    <defs>
                      <marker
                        id="stability-arrowhead"
                        markerWidth="6"
                        markerHeight="6"
                        refX="5"
                        refY="3"
                        orient="auto"
                      >
                        <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.35)" />
                      </marker>
                    </defs>
                    <path
                      d="M70 140 C 150 120, 230 110, 330 100"
                      fill="none"
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth="1.2"
                      markerEnd="url(#stability-arrowhead)"
                    />
                  </svg>
                </div>
                <div className="layout-projects-stability-center" aria-hidden="true">
                  <div className="layout-projects-stability-oscillator">
                    <span className="layout-projects-stability-pivot" />
                    <span className="layout-projects-stability-string" />
                    <span className="layout-projects-stability-bob" />
                  </div>
                  <div className="layout-projects-stability-arc" />
                </div>
                <div className="layout-projects-stability-zone-label layout-projects-stability-zone-label-stable">
                  Stable
                </div>
                <div className="layout-projects-stability-zone-label layout-projects-stability-zone-label-transition">
                  Transition
                </div>
                <div className="layout-projects-stability-zone-label layout-projects-stability-zone-label-unstable">
                  Unstable
                </div>
                <div className="layout-projects-stability-callout layout-projects-stability-callout-stable">
                  low sway
                </div>
                <div className="layout-projects-stability-callout layout-projects-stability-callout-transition">
                  resonance
                </div>
                <div className="layout-projects-stability-callout layout-projects-stability-callout-unstable">
                  amplified
                </div>
                <div className="layout-projects-stability-caption">
                  Conceptual visualization of stability under periodic forcing.
                </div>
              </div>
            ) : (
              <>
                <div className="layout-projects-visual-glow" />
                <div className="layout-projects-visual-spark" />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
