import React from "react";
import portraitMe from "../../../assets/me.avif";

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

          <div className="layout-about-portrait-wrap">
            <img
              className="layout-about-image layout-about-portrait"
              alt="Portrait of Fiza Sheikh"
              src={portraitMe}
            />
          </div>
        </div>

        <div className="text-about-body">
          <p className="about__lead">
          I was born and raised in good ol’ Oklahoma and still have not seen the musical. Some of my most
          formative years were spent in my mom’s homeland, Bangladesh, during a time when Facebook was 
          less about photos and more about people finding their voice. I remember telling my mother that
          I wanted to be a journalist when I grew up and learning, for the first time, that in some places
          asking the wrong questions can be dangerous.
          <br/>
          <br/>
          That moment stayed with me. It changed how I understood information, who controls it, and why 
          it matters. Over time, that awareness paired with my natural pull toward numbers and patterns 
          and grew into a love for data. Not just as a way to interpret the world, but as a way to shape 
          it.
          <br/>
          <br/>
          That perspective followed me to Los Angeles, where I moved on my own to attend UCLA. I am a 
          soon to be Economics graduate, class of 2026, studying on a full ride as a Jack Kent Cooke 
          Scholar. That opportunity gave me the freedom to take risks, ask better questions, and build 
          work that reflects how I actually see the world.
          <br/>
          <br/>
          I gravitated toward analytics, engineering, and strategy because they sit closest to action. 
          I became less interested in explaining outcomes after the fact and more interested in shaping 
          them before they happen. Data became the tool, not the goal.
          <br/>
          <br/>
          Along the way, I learned that it is not just about telling a good story. It is about what the 
          story makes people do. I care less about perfect narratives and more about whether information 
          changes decisions. That moment, right before a decision is made, is where I choose to work.
          </p>
        </div>
      </div>
      </section>
  );
};
