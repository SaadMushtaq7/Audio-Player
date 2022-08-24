import React, { FC, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface Props {
  src: string;
  isPlaying: boolean;
}

const TempPlayer: FC<Props> = ({ src, isPlaying }) => {
  const waveform = useRef<any>();
  useEffect(() => {
    if (!waveform.current) {
      waveform.current = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#d8cdcd",
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 3,
        progressColor: "#567FFF",
        cursorColor: "#567FFF",
      });

      waveform.current.load(src);
    }
    if (isPlaying) {
      waveform.current.pause();
    } else if (!isPlaying) {
      waveform.current.play();
    }
  }, [src, isPlaying]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div id="waveform" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "500px",
        }}
      />
    </div>
  );
};

export default TempPlayer;
