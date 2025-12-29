import React from "react";
import { FooterSection } from "../footerSection";

export const ContactSection = (): JSX.Element => {
  return (
    <section
      id="contact"
      className="layout-contact-section"
    >
      <div className="layout-contact-center">
        <div className="layout-contact-container">
          <div className="layout-contact-stack">
          <div className="layout-contact-number">
            <div className="text-contact-number-shadow">
              04
            </div>
            <div className="text-contact-number-mid">
              04
            </div>
            <div className="text-contact-number-front">
              04
            </div>
          </div>

          <h3 className="text-contact-eyebrow">
            What&apos;s Next?
          </h3>

          <h2 className="text-contact-title">
            Get In Touch
          </h2>

          <p className="text-contact-body">
            I&apos;m always on the lookout for exciting new opportunities and
            love connecting with like-minded people. Whether you&apos;ve got a
            question, a cool idea to share, or just want to say hi, don&apos;t
            hesitate to reach out—I&apos;d love to hear from you!
          </p>
          </div>
        </div>
      </div>

      <div className="layout-contact-footer">
        <FooterSection />
      </div>
    </section>
  );
};
