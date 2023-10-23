import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();

  const [ref, inView] = useInView();

  useEffect(() => {
    if (!play && inView) {
      setPlay(true);
    }
  }, [inView, play, setPlay]);

  return (
    <div
      ref={ref}
      className={`overlay ${play ? "overlay--disable" : ""}
      ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <p className="intro__scroll">Scroll to begin the journey</p>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Bye</p>
      </div>
    </div>
  );
};
