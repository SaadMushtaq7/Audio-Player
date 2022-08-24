import React, { FC, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const TempPlayer: FC = () => {
  const waveformRef = useRef<any>();

  useEffect(() => {
    WaveSurfer.create({
      container: waveformRef.current,
    });
  }, []);

  return <div ref={waveformRef}></div>;
};

export default TempPlayer;
