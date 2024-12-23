import { //import hooks
  useState, 
  useEffect, 
  useRef, 
  useCallback 
} from 'react';

import {//import icons
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
  IoVolumeHighOutline,
  IoRepeat,
  IoRepeatOutline,
  IoVolumeLowOutline,
  IoVolumeMute
} from 'react-icons/io5';

const Controls = ({ audioRef, duration, progressBarRef, setTimeProgress,  tracks, trackIndex, setTrackIndex, setCurrentTrack,loopTracks, setLoopTracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev); //switches isplaying boolean between true and false
    };
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    console.log('run'); 
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
    '--range-progress',
    `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  },[audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play(); //play song if isplaying value is true
      playAnimationRef.current = requestAnimationFrame(repeat);
      } else {
      audioRef.current.pause(); //pause song if isplaying value is false
      cancelAnimationFrame(playAnimationRef.current);
      }
    }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      }
    }, [volume, audioRef]);
 
  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
      }
    }, [volume, audioRef, muteVolume]);
      
  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };
  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };
  const goToPrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
      } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
      }
  };
  const goToNext = () => {
    if (trackIndex >= tracks.length - 1 ) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
      } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
      }
  };

  return (
    <div className="controls-wrapper">
      <p></p>
      <div className='repeat' align='left'>
        <button className='repeat-btn' onClick={() => setLoopTracks((prev) => !prev)}>
          {loopTracks ? <b id="repeatActive"><IoRepeat/></b> : <IoRepeatOutline />}
        </button>
      </div>

      <div className="volume" align="right">
        <span id='DisplayVolume'>
        <input type="range" id="volumeBar" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)}
          style={{background: `linear-gradient(to right, maroon ${volume}%, #ccc ${volume}%)`,}}/>
        </span>
        <button className='volume-btn' onClick={() => setMuteVolume((prev) => !prev)}>
            {muteVolume || volume < 5 ? (<IoVolumeMute />) : volume < 40 ? (<IoVolumeLowOutline />) : (<IoVolumeHighOutline />)}
        </button>
      </div>
  
      <div className="controls">
        
        <button className='Prev-btn' onClick={goToPrevious}>
          <IoPlaySkipBackSharp />
        </button>

        <button className="Mid-btn" onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button className="PausePlay-btn" onClick={togglePlayPause} >
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>

        <button className="Mid-btn" onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>

        <button className='Next-btn' onClick={goToNext}>
          <IoPlaySkipForwardSharp />
        </button>
 
      </div>     
    </div>
    
  );
  };
  export default Controls;