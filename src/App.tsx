import React, { FC } from "react";
import AudioPlayer from "./components/AudioPlayer";
import "./App.css";

const App: FC = () => {
  return (
    <div className="App">
      <AudioPlayer />
    </div>
  );
};

export default App;
