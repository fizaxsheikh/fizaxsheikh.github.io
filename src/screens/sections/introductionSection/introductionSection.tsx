import { useEffect, useRef, useState, type CSSProperties } from "react";
import pixelFigure from "../../../assets/pixel-figure.png";

const orbitLabels = [
  "Data Analyst & Product Strategy"]
  
const ORBIT_ROTATION_MS = 10000;
const CHAR_SPACING_DEG = 4;
const ORBIT_RADIUS = "var(--orbit-radius, 150px)";

export const IntroductionSection = (): JSX.Element => {
  const [baseAngle, setBaseAngle] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const angleRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId = 0;
    const speedDegPerMs = 360 / ORBIT_ROTATION_MS;

    const step = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const deltaMs = time - lastTimeRef.current;
      lastTimeRef.current = time;

      const nextAngle = (angleRef.current + deltaMs * speedDegPerMs) % 360;
      angleRef.current = nextAngle;
      setBaseAngle(nextAngle);

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      lastTimeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % orbitLabels.length);
    }, ORBIT_ROTATION_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const currentLabel = orbitLabels[currentIndex];

  return (
    <section id="home" className="layout-intro-section">
      <div className="layout-intro-background">
        <div
          className="layout-intro-background-image"
          style={{ "--parallax-speed": "0.08" } as CSSProperties}
        />
      </div>

      <div className="layout-intro-container">
        <div className="layout-intro-grid">
          <div className="layout-intro-copy">
            <div className="text-intro-line text-intro-line-delay-0">
              <h3 className="text-intro-kicker">
                Hi, my name is
              </h3>
            </div>

            <div className="text-intro-line text-intro-line-delay-200">
              <h1 className="text-intro-name">
                Fiza Sheikh.
              </h1>
            </div>

            <div className="text-intro-line text-intro-line-delay-400">
              <h2 className="text-intro-statement">
                I don't analyze data.
                <span className="text-intro-highlight">
                  Data is my tool.
                </span>
              </h2>
            </div>

            <div className="text-intro-line text-intro-line-delay-600 text-intro-line-tight">
              <p className="text-intro-subline">
                I design how decisions get made.
              </p>
            </div>

            <div className="text-intro-line text-intro-line-delay-800">
              <div className="btn-intro-badge">
                <span className="intro-badge-dot" />
                <span className="text-intro-badge">
                  Open to Opportunities
                </span>
              </div>
            </div>
          </div>

          <div className="layout-intro-media">
            <div className="layout-intro-media-stack">
              <div className="layout-earth-wrapper">
                <img
                  className="layout-earth-image"
                  alt="Image"
                  src="https://c.animaapp.com/mjnkwousQjNtFo/img/image-11.png"
                />
                <img
                  className="layout-earth-figure"
                  alt="Pixel figure"
                  src={pixelFigure}
                />
                <div className="layout-earth-orbit-ring">
                  <div className="layout-earth-orbit-chars">
                    {/* Current label fades out per character at the wall. */}
                    {currentLabel.split("").map((char, index) => {
                      const charAngle = baseAngle - index * CHAR_SPACING_DEG;
                      const displayChar = char === " " ? "\u00A0" : char;
                      return (
                        <span
                          key={`current-${currentIndex}-${index}`}
                          className="text-earth-orbit-char"
                          style={{
                            opacity: 1,
                            transform: `rotate(${charAngle}deg) translateX(${ORBIT_RADIUS}) rotate(-90deg)`,
                          }}
                        >
                          {displayChar}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
