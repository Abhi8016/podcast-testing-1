import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
const AudioPlayer = ({ audioSrc, image }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef();

  //
  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
  //
  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  //
  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  //
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  //
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };
  //
  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };
  //
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  //
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  //
  const toogleMute = () => {
    if (isMute) {
      setIsMute(false);
      setVolume(0.4);
    } else {
      setIsMute(true);
      setVolume(0);
    }
  };
  //
  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
  }, [isMute]);

  useEffect(() => {
    if (audioRef.current.volume == 0) {
      setIsMute(true);
    } else {
      setIsMute(false);
    }
  }, [volume]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="custom-audio-player">
      <img src={image} className="display-image-player" alt="" />
      <audio ref={audioRef} src={audioSrc} />
      <p onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</p>
      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          max={duration}
          value={currentTime}
          onChange={handleDuration}
          step={0.01}
          className="duration-range"
        />
        <p>-{formatTime(duration - currentTime)}</p>
      </div>
      <p onClick={toogleMute}>{isMute ? <FaVolumeMute /> : <FaVolumeUp />}</p>
      <input
        type="range"
        value={volume}
        max={1}
        min={0}
        step={0.001}
        onChange={handleVolume}
        className="volume-range"
      />
    </div>
  );
};

export default AudioPlayer;
