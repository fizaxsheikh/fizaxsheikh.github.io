import React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

const projectCards = [
  {
    image: "https://c.animaapp.com/mjnkwousQjNtFo/img/rectangle-28.png",
    alt: "Project 1",
  },
  {
    image: "https://c.animaapp.com/mjnkwousQjNtFo/img/rectangle-29.png",
    alt: "Project 2",
  },
  {
    image: "https://c.animaapp.com/mjnkwousQjNtFo/img/rectangle-32.png",
    alt: "Project 3",
  },
];

export const ProjectsSection = (): JSX.Element => {
  return (
    <section id="projects" className="layout-projects-section">
      <div className="layout-projects-background">
        <div
          className="layout-projects-background-image"
          style={{ "--parallax-speed": "0.08" } as React.CSSProperties}
        />
      </div>

      <div className="layout-projects-container">
        <div className="layout-projects-stack">
          <h2 className="text-projects-heading">
            Projects
          </h2>

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

          <div className="layout-projects-grid">
            {projectCards.map((project, index) => (
              <Card
                key={index}
                className="layout-project-card"
                style={
                  {
                    "--animation-delay": `${600 + index * 200}ms`,
                  } as React.CSSProperties
                }
              >
                <CardContent className="layout-project-card-content">
                  <img
                    className="layout-project-card-image"
                    alt={project.alt}
                    src={project.image}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            variant="link"
            className="btn-projects-archive"
          >
            view the archive
          </Button>
        </div>
      </div>
    </section>
  );
};
