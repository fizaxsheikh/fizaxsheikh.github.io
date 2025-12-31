import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  animationDelay: string;
  animationDuration: string;
}

interface ShootingStar {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
}

export const StarryBackground = (): JSX.Element => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    // Generate twinkling stars
    const generatedStars: Star[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(generatedStars);

    // Generate shooting stars periodically
    const shootingStarInterval = setInterval(() => {
      const newShootingStar: ShootingStar = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
        animationDelay: "0s",
      };

      setShootingStars((prev) => [...prev, newShootingStar]);

      // Remove shooting star after animation completes
      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((star) => star.id !== newShootingStar.id)
        );
      }, 3000);
    }, 8000); // New shooting star every 8 seconds

    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <div className="layout-starry-bg">
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="layout-starry-dot"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="layout-starry-shooting"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};
