import React, { FC, useRef } from "react";
import {
  SpectrumVisualizer,
  SpectrumVisualizerTheme,
} from "react-audio-visualizers";
import { CurrentSongType, SongData } from "../DataTypes";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import { GiSpeakerOff } from "react-icons/gi";
import "./player.css";

interface Props {
  songs: SongData[];
  setSongs: React.Dispatch<React.SetStateAction<SongData[]>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.MutableRefObject<any>;
  currentSong: CurrentSongType;
  setCurrentSong: React.Dispatch<React.SetStateAction<CurrentSongType>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  isMute: boolean;
  setIsMute: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayPause: any;
  elapsed: number;
}

const AudioPlayer: FC<Props> = ({
  songs,
  setSongs,
  isPlaying,
  setIsPlaying,
  audioRef,
  currentSong,
  setCurrentSong,
  volume,
  setVolume,
  isMute,
  setIsMute,
  handlePlayPause,
  elapsed,
}) => {
  const clickRef = useRef<any>();

  const checkWidth = (e: React.MouseEvent<HTMLDivElement>) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divProgress = (offset / width) * 100;
    audioRef.current.currentTime = (divProgress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex(
      (song) => song.name === currentSong.song.name
    );
    if (index === 0) {
      setCurrentSong({ song: songs[songs.length - 1], progress: 0, length: 0 });
    } else {
      setCurrentSong({ song: songs[index - 1], progress: 0, length: 0 });
    }
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const skipAhead = () => {
    const index = songs.findIndex(
      (song) => song.name === currentSong.song.name
    );
    if (index === songs.length - 1) {
      setCurrentSong({ song: songs[0], progress: 0, length: 0 });
    } else {
      setCurrentSong({ song: songs[index + 1], progress: 0, length: 0 });
    }
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
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
    <div className="player_container">
      <div className="title">
        <p>{currentSong.song.name}</p>
      </div>
      <div className="waveform_display">
        <SpectrumVisualizer
          audio={currentSong.song.link}
          theme={SpectrumVisualizerTheme.line}
          colors={["#388ae2", "#388ae2"]}
          iconsColor="#388ae2"
          backgroundColor="white"
          showMainActionIcon
          highFrequency={8000}
        />
      </div>
      <div className="main_controls">
        <div className="controls">
          <BsFillSkipStartCircleFill
            className="btn_action"
            onClick={skipBack}
          />
          {isPlaying ? (
            <BsFillPlayCircleFill className="pp" onClick={handlePlayPause} />
          ) : (
            <BsFillPauseCircleFill className="pp" onClick={handlePlayPause} />
          )}
          <BsFillSkipEndCircleFill className="btn_action" onClick={skipAhead} />
        </div>
        <div className="navigation">
          <div className="duration">
            <p className="current_time">{formatTime(Math.floor(elapsed))}</p>
            <p className="total_duration">
              {audioRef.current
                ? formatTime(Math.floor(audioRef.current.duration))
                : "00:00"}
            </p>
          </div>
          <div
            className="navigation_wrapper"
            onClick={(e) => checkWidth(e)}
            ref={clickRef}
          >
            <div
              className="seek_bar"
              style={{ width: `${currentSong.progress}%` }}
            />
          </div>
        </div>
        <div className="volume_control">
          {isMute ? (
            <GiSpeakerOff
              className="vol_btn_action"
              onClick={() => setIsMute(false)}
            />
          ) : (
            <FcSpeaker
              className="vol_btn_action"
              onClick={() => setIsMute(true)}
            />
          )}
          <input
            type="range"
            id="volume"
            min={0}
            max={100}
            value={isMute ? 0 : volume}
            onChange={(e) => {
              setVolume(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
