import React, { useEffect, useRef, useState, useCallback } from "react";
import "./styles/TubesBackground.css";

// Helper for random colors
const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    );
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className = "",
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setIsLoaded] = useState(false);
  const tubesRef = useRef<{ tubes: { setColors: (c: string[]) => void; setLightsColors: (c: string[]) => void } } | null>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        const module = await import(
          /* @vite-ignore */
          // @ts-expect-error - CDN module has no types
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          // Typically handled internally or not strictly required for full window
        };

        window.addEventListener("resize", handleResize);

        cleanup = () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = useCallback(() => {
    if (!enableClickInteraction || !tubesRef.current) return;

    const colors = randomColors(3);
    const lightsColors = randomColors(4);

    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  }, [enableClickInteraction]);

  // We can attach the click handler to the window or document body so it works even if the canvas is behind elements
  useEffect(() => {
    if (enableClickInteraction) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [enableClickInteraction, handleClick]);

  return (
    <>
      <div
        className={`tubes-background-container tubes-background-wrapper ${className}`}
      >
        <canvas
          ref={canvasRef}
          className="tubes-background-canvas"
        />
      </div>
      {/* We preserve the children if any are passed */}
      {children && (
        <div className="tubes-background-overlay">
          {children}
        </div>
      )}
    </>
  );
}

export default TubesBackground;
