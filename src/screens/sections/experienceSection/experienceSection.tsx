import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const ExperienceSection = (): JSX.Element => {
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

            <div className="layout-experience-card-wrap">
              <Card className="layout-experience-card">
                <div className="layout-experience-card-bar">
                  <div className="layout-experience-card-tab" />
                </div>
                <CardContent className="layout-experience-card-content">
                  <h3 className="text-experience-title">
                    Business Operations Analyst
                  </h3>
                </CardContent>
              </Card>
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
