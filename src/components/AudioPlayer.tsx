import React, { FC, useState } from "react";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import { GiSpeakerOff } from "react-icons/gi";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TempPlayer from "./Waveform";
import { SongData } from "../DataTypes";
import { data as AllSongs } from "../songData";
import "./player.css";

const TempAudioPlayer: FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(50);
  const [duration, setDuration] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);

  const currentSong: SongData = AllSongs[0];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }
    return "00:00";
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column-reverse",
        height: "fit-content",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#388ae2",
          }}
        >
          <Typography
            component="div"
            variant="h5"
            style={{ fontFamily: "Silkscreen, cursive" }}
          >
            {currentSong.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="#388ae2"
            component="div"
            style={{ fontFamily: "Silkscreen, cursive" }}
          >
            {currentSong.singer}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause">
            {isPlaying ? (
              <BsFillPlayCircleFill className="pp" onClick={handlePlayPause} />
            ) : (
              <BsFillPauseCircleFill className="pp" onClick={handlePlayPause} />
            )}
          </IconButton>
          <IconButton aria-label="next">
            {volume === 0 ? (
              <GiSpeakerOff
                className="vol_btn_action"
                onClick={() => setVolume(50)}
              />
            ) : (
              <FcSpeaker
                className="vol_btn_action"
                onClick={() => setVolume(0)}
              />
            )}
            <input
              type="range"
              id="volume"
              min={0}
              max={100}
              value={0 || volume}
              onChange={(e) => {
                setVolume(parseInt(e.target.value));
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p className="current_time">{formatTime(Math.floor(elapsed))}</p>
        <div className="wave_container">
          <TempPlayer
            src={currentSong.link}
            isPlaying={isPlaying}
            volume={volume}
            setDuration={setDuration}
            setElapsed={setElapsed}
          />
        </div>
        <p className="total_duration">{formatTime(Math.floor(duration))}</p>
      </div>
    </Card>
  );
};

export default TempAudioPlayer;
