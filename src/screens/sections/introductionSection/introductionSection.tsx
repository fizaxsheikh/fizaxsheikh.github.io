import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Badge } from "../../../components/ui/badge";
import pixelFigure from "../../../assets/pixel-figure.png";

const orbitLabels = [
  "Data Scientist",
  "Analytics Engineer",
  "Business Operations Analyst",
  "Product Strategy",
  "Technology Consultant",
];
const ORBIT_ROTATION_MS = 8000;
const CHAR_SPACING_DEG = 4;
const ORBIT_RADIUS_PX = 150;
const WALL_ANGLE_DEG = 225;
const WALL_WIDTH_DEG = 2;
const ROTATION_DIRECTION = "clockwise";

export const IntroductionSection = (): JSX.Element => {
  const [baseAngle, setBaseAngle] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const angleRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const normalizeAngle = (angle: number) => (angle % 360 + 360) % 360;
  const angleDistance = (from: number, to: number) => {
    const diff = normalizeAngle(to - from);
    return diff > 180 ? diff - 360 : diff;
  };
  const anglePassedWall = (
    angle: number,
    wallAngle: number,
    direction: "clockwise" | "counterclockwise",
  ) => {
    const theta = normalizeAngle(angle);
    const wall = normalizeAngle(wallAngle);
    const delta = angleDistance(wall, theta);
    if (direction === "clockwise") {
      return delta > 0;
    }
    return delta < 0;
  };
  const wallEndAngle = normalizeAngle(WALL_ANGLE_DEG + WALL_WIDTH_DEG);

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

  const currentLabel = orbitLabels[currentIndex];
  const nextLabel = orbitLabels[(currentIndex + 1) % orbitLabels.length];
  // Count per-character crossings to drive the LED edge and progressive reveal.
  const currentHiddenCount = currentLabel.split("").reduce((count, _, index) => {
    const charAngle = baseAngle - index * CHAR_SPACING_DEG;
    return count + (anglePassedWall(charAngle, WALL_ANGLE_DEG, ROTATION_DIRECTION) ? 1 : 0);
  }, 0);
  const nextVisibleCount = nextLabel.split("").reduce((count, _, index) => {
    const charAngle = baseAngle + WALL_WIDTH_DEG - index * CHAR_SPACING_DEG;
    const isPast = anglePassedWall(charAngle, wallEndAngle, ROTATION_DIRECTION);
    const isRevealed = index < currentHiddenCount;
    return count + (isPast && isRevealed ? 1 : 0);
  }, 0);

  useEffect(() => {
    if (
      currentHiddenCount >= currentLabel.length &&
      nextVisibleCount >= nextLabel.length
    ) {
      angleRef.current = wallEndAngle;
      setBaseAngle(wallEndAngle);
      lastTimeRef.current = null;
      setCurrentIndex((prev) => (prev + 1) % orbitLabels.length);
    }
  }, [currentHiddenCount, currentLabel.length, nextLabel.length, nextVisibleCount, wallEndAngle]);

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
              <Badge className="btn-intro-badge">
                <span className="text-intro-badge">
                  Open to Opportunities
                </span>
              </Badge>
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
                      const visible = !anglePassedWall(
                        charAngle,
                        WALL_ANGLE_DEG,
                        ROTATION_DIRECTION,
                      );
                      const displayChar = char === " " ? "\u00A0" : char;
                      return (
                        <span
                          key={`current-${currentIndex}-${index}`}
                          className="text-earth-orbit-char"
                          style={{
                            opacity: visible ? 1 : 0,
                            transform: `rotate(${charAngle}deg) translateX(${ORBIT_RADIUS_PX}px) rotate(-90deg)`,
                          }}
                        >
                          {displayChar}
                        </span>
                      );
                    })}
                    {/* Next label reveals per character from the wall edge. */}
                    {nextLabel.split("").map((char, index) => {
                      const charAngle = baseAngle + WALL_WIDTH_DEG - index * CHAR_SPACING_DEG;
                      const isPast = anglePassedWall(
                        charAngle,
                        wallEndAngle,
                        ROTATION_DIRECTION,
                      );
                      const isRevealed = index < currentHiddenCount;
                      const visible = isPast && isRevealed;
                      const displayChar = char === " " ? "\u00A0" : char;
                      return (
                        <span
                          key={`next-${currentIndex}-${index}`}
                          className="text-earth-orbit-char"
                          style={{
                            opacity: visible ? 1 : 0,
                            transform: `rotate(${charAngle}deg) translateX(${ORBIT_RADIUS_PX}px) rotate(-90deg)`,
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
