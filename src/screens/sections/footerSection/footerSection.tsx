import { Separator } from "../../../components/ui/separator";

export const FooterSection = (): JSX.Element => {

  return (
    <footer className="layout-footer">
      <div className="layout-footer-surface">
        <div className="layout-footer-inner">
          <Separator className="layout-footer-divider" />

          <div className="layout-footer-row">
            <div className="layout-footer-brand">
              <img
                className="layout-footer-logo"
                alt="Logo"
                src="https://c.animaapp.com/mjnkwousQjNtFo/img/image-18-1.png"
              />
              <div className="text-footer-brand">
                FIZA SHEIKH
              </div>
            </div>

            <div className="layout-footer-icons">
              <img
                className="layout-footer-icons-image"
                alt="Social media icons"
                src="https://c.animaapp.com/mjnkwousQjNtFo/img/frame-34.svg"
                useMap="#footer-socials"
              />
              <map name="footer-socials">
                <area
                  shape="rect"
                  coords="0,0,50,44"
                  href="https://www.linkedin.com/in/fizaxsheikh/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                />
                <area
                  shape="rect"
                  coords="51,0,101,44"
                  href="https://github.com/fizaxsheikh"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                />
                <area
                  shape="rect"
                  coords="102,0,152,44"
                  href="mailto:fizaxsheikh@g.ucla.edu"
                  aria-label="Email"
                />
              </map>
            </div>

            <p className="text-footer-copy">
              © Fiza Sheikh. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
