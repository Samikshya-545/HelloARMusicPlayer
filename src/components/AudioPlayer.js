// AudioPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import '../styles/AudioPlayer.css'; // Create this CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSongIndex, setCurrentSongIndexAction } from '../state/actions/songAction';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayerComponent = ({ songs }) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const currentSongIndex = (useSelector((state) => state.songState)).currentSongIndex;
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    setCurrentSong(songs[currentSongIndex]);
    console.log(songs);
  },[songs, currentSongIndex])

  useEffect(() => {
    if(!currentSong){
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause(); // Unload previous sound instance
    }

    audioRef.current = new Howl({
      src: [currentSong.src],
      html5: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => nextSongHandler(),
      onseek: () => {}, // Keep this empty to prevent stopping on seek
    });

    audioRef.current.seek(progress);
  }, [currentSong, progress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying])

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const prevSongHandler = () => {
    dispatch(setCurrentSongIndexAction(currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1));
    setProgress(0);
  };

  const nextSongHandler = () => {
    dispatch(setCurrentSongIndexAction((currentSongIndex + 1 >= songs.length ? 0 : currentSongIndex + 1)));
    setProgress(0);
  };

  const timeUpdateHandler = (event) => {
    console.log(audioRef.current._duration);
    const current = parseFloat(audioRef.current.currentTime);
    const duration = parseFloat(audioRef.current.duration);
    const percentage = (current / duration) * 100;
    console.log(percentage);
    setProgress(percentage);
  };

  const dragHandler = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  const songEndHandler = () => {
    nextSongHandler();
  };

  Howler.volume(0.5); // Adjust the default volume if needed

  return (
    <>
      {currentSong && 
      <div className="audio-player">
        <h3>{currentSong.title}</h3>
        <AudioPlayer
          autoPlay={false}
          src={currentSong.src}
          onPlay={e => console.log("onPlay")}
          showSkipControls={true}
          onClickNext={nextSongHandler}
          onClickPrevious={prevSongHandler}
          // other props here
        />
        {/* <audio
          ref={audioRef}
          src={currentSong.src}
          onTimeUpdate={timeUpdateHandler}
          onEnded={songEndHandler}
        ></audio>
        <div className="controls">
          <button onClick={prevSongHandler}>Previous</button>
          <button onClick={playPauseHandler}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={nextSongHandler}>Next</button>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.01"
          value={progress}
          onChange={dragHandler}
          onMouseDown={() => audioRef.current.pause()}
          onMouseUp={() => audioRef.current.play()}
        /> */}
      </div>
    }
    </>
    
  );
};

export default AudioPlayerComponent;
