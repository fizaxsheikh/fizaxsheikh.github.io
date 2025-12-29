import React from "react";

export const AboutMeSection = (): JSX.Element => {
  return (
    <section
      id="about"
      className="layout-about-section"
    >
      <div className="layout-about-background">
        <div
          className="layout-about-background-image"
          style={{ "--parallax-speed": "0.08" } as React.CSSProperties}
        />
      </div>

      <div className="layout-about-container">
        <div className="layout-about-left">
          <div className="layout-section-title">
            <div className="layout-about-number">
              <div className="text-about-number-shadow">
                01
              </div>

              <div className="text-about-number-mid">
                01
              </div>

              <div className="text-about-number-front">
                01
              </div>
            </div>

            <h2 className="text-section-heading">
              About Me
            </h2>
          </div>

          <img
            className="layout-about-image"
            alt="Image"
            src="https://c.animaapp.com/mjnkwousQjNtFo/img/image-21.png"
          />
        </div>

        <div className="text-about-body">
          I&apos;m Fiza Sheikh, a senior at UCLA majoring in Economics, with a
          vision as dynamic as my journey. Shaped by resilience and a commitment
          to meaningful impact, I&apos;ve found my passion at the intersection
          of technology, consulting, and law.
          <br />
          <br />
          My ultimate goal?
          <br />
          <br />
          To use innovation and my future J.D. to champion inclusion, protect
          rights, and empower underrepresented communities.
          <br />
          <br />
          From tech externships to advocacy initiatives, my experience spans
          fields where design, data, and law intersect to shape more equitable
          systems. As a mentor and advocate, I use my own experiences to uplift
          others, foster community, and create spaces where diverse perspectives
          drive change. For me, every challenge is an opportunity to bridge
          gaps, build possibilities, and shape a future where innovation and
          justice go hand in hand.
        </div>
      </div>
    </section>
  );
};
