import React, { FC, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import "./player.css";

interface Props {
  src: string;
  isPlaying: boolean;
  volume: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setElapsed: React.Dispatch<React.SetStateAction<number>>;
}

const Waveform: FC<Props> = ({
  src,
  isPlaying,
  volume,
  setDuration,
  setElapsed,
}) => {
  const waveform = useRef<any>();

  useEffect(() => {
    if (waveform.current) {
      waveform.current.setVolume(volume / 100);
    }
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
        scrollParent: false,
      });
      waveform.current.load(src);
      waveform.current.on("ready", () => {
        setDuration(waveform.current.getDuration());
      });
      waveform.current.on("audioprocess", () => {
        setElapsed(waveform.current.getCurrentTime());
      });
    }
    if (isPlaying) {
      waveform.current.pause();
    } else if (!isPlaying) {
      waveform.current.play();
    }
  }, [src, isPlaying, volume]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
      }}
    >
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

export default Waveform;
