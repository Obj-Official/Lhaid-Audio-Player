import { useState, useRef } from 'react';
import { tracks } from '../data/Tracks';
import Controls from './Controls';
import DisplayTrack from './DisplayTrack';
import ProgressBar from './ProgressBar';
import LhaidLogo from '../Lhaid.png';
import './AudioPlayer.css';

const AudioPlayer =()=> {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loopTracks, setLoopTracks] = useState(true);
  const audioRef = useRef();
  const progressBarRef = useRef();
  console.log(audioRef);
  
  const goToNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
      } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
      }
  };

  return(
    <div className = "lhaid-player" align = "center">
      <header align="center"><img src={LhaidLogo} className='Lhaid-logo'/></header>
      <div className="inner">
        <DisplayTrack {...{currentTrack, audioRef, setDuration, progressBarRef, goToNext, loopTracks}}/>
        <ProgressBar  {...{progressBarRef, audioRef, timeProgress, duration}}/>
        <Controls {...{audioRef, duration, progressBarRef, setTimeProgress, tracks, trackIndex, setTrackIndex, setCurrentTrack, loopTracks, setLoopTracks}}/>
      </div>
    </div>
  )
}

export default AudioPlayer;