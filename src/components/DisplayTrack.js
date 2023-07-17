import { BsMusicNoteBeamed } from 'react-icons/bs';
const DisplayTrack = ({currentTrack, audioRef, setDuration, progressBarRef, goToNext, loopTracks }) => {

  const onLoadedMetadata = () => {
    console.log(audioRef.current.duration);
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;   
    }
    
  const doNothing=()=>{};
  
  return (
  <div>
    <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={loopTracks? goToNext: doNothing}/>
    <div className="audio-info">
      <div className="audio-img">
        {currentTrack.thumbnail ? (<img src={currentTrack.thumbnail} className="Thumbnail" alt="audio thumbnail" />) : 
        (<div className="icon-wrapper"><span className="audio-icon"><BsMusicNoteBeamed /></span></div>)}
      </div>
    </div>
    <div className="music-text">
        <p className="music-title"><b>{currentTrack.title}</b></p>
        <p className='Artist'>{currentTrack.author}</p>
    </div>
  </div>
  )
  };
  export default DisplayTrack;