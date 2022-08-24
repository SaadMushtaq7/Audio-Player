import React, { FC, useEffect, useRef, useState } from "react";
import { data as AllSongs } from "./songData";
import AudioPlayer from "./components/AudioPlayer";
import { SongData, CurrentSongType } from "./DataTypes";

import "./App.css";

const App: FC = () => {
  const [songs, setSongs] = useState<SongData[]>(AllSongs);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(50);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<CurrentSongType>({
    song: AllSongs[0],
    progress: 0,
    length: 0,
  });

  const audioRef = useRef<any>();

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const ct = audioRef.current.currentTime;
    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
    if (isPlaying) {
      setInterval(() => {
        const _elapsed = Math.floor(audioRef?.current?.currentTime);
        setElapsed(_elapsed);
      }, 100);
    }
  }, [volume, isPlaying]);

  return (
    <div className="App">
      <audio
        src={currentSong.song.link}
        ref={audioRef}
        onTimeUpdate={onPlaying}
        muted={isMute}
      />
      <AudioPlayer
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        volume={volume}
        setVolume={setVolume}
        isMute={isMute}
        setIsMute={setIsMute}
        handlePlayPause={handlePlayPause}
        elapsed={elapsed}
        audioRef={audioRef}
      />
    </div>
  );
};

export default App;
