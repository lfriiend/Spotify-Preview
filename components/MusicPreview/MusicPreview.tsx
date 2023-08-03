import { useState, useEffect, useRef } from 'react';
import { PlayCircleIcon, BackwardIcon, ForwardIcon, PauseCircleIcon } from '@heroicons/react/24/solid';
import { Track, MusicPreviewProps } from "../../types/types";
import NextImage from 'next/image';

const MusicPreview: React.FC<MusicPreviewProps> = ({ playlist, selectedTrack, setSelectedTrack }) => {

  const { tracks } = playlist;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<Track | null>(null);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const updateProgress = () => {
      if (audioElement) {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
      }
    };

    const handleAudioEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateProgress);
      audioElement.addEventListener('ended', handleAudioEnded);

      return () => {
        audioElement.removeEventListener('timeupdate', updateProgress);
        audioElement.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, [isPlaying]);

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const progressWidth = event.currentTarget.clientWidth;
      const clickPosition = event.nativeEvent.offsetX;
      const clickPercentage = (clickPosition / progressWidth) * 100;
      const newTime = (clickPercentage / 100) * audioElement.duration;

      if (isPlaying) {
        audioElement.currentTime = newTime;
      } else {
        audioElement.currentTime = newTime;
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    setCurrentPlayingTrack(selectedTrack);
    setIsPlaying(false);
    setProgress(0);
  }, [selectedTrack]);

  const defaultSelectedTrack = tracks.items.length > 0 ? tracks.items[0].track : null;
  const currentTrack = currentPlayingTrack || defaultSelectedTrack;

  const playNextTrack = () => {
    const currentTrackIndex = tracks.items.findIndex((item) => item.track.id === currentTrack?.id);
    const nextTrackIndex = currentTrackIndex + 1;
    if (nextTrackIndex < tracks.items.length) {
      setSelectedTrack(tracks.items[nextTrackIndex].track);
    }
  };

  const playPreviousTrack = () => {
    const currentTrackIndex = tracks.items.findIndex((item) => item.track.id === currentTrack?.id);
    const previousTrackIndex = currentTrackIndex - 1;
    if (previousTrackIndex >= 0) {
      setSelectedTrack(tracks.items[previousTrackIndex].track);
    }
  };

  return (
    <>
      {currentTrack ? (
        <>
          <NextImage
            className="rounded-2xl mt-5 drop-shadow-2xl"
            src={currentTrack.album.images[0].url}
            width={248}
            height={213}
            alt="album photo"
          />
          <span className="text-textColor text-lg mt-3 text-center">{currentTrack.name}</span>
          <span className="text-secondaryColor text-xs mt-1">{currentTrack.album.artists[0].name}</span>

          <div className="flex items-center flex-col">

            <div className="w-60 my-3 bg-orange-300 rounded-lg cursor-pointer" onClick={handleProgressBarClick}>
              <div className="h-1 bg-orange-500" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="flex justify-around items-center w-full mt-2">
              <button className="flex" onClick={playPreviousTrack}>
                <BackwardIcon className="h-10 w-10 text-orange-500" />
              </button>

              <button className="flex" onClick={handlePlayPause}>
                {isPlaying ? (
                  <PauseCircleIcon className="h-14 w-14 text-orange-500 drop-shadow-2xl" />
                ) : (
                  <PlayCircleIcon className="h-14 w-14 text-orange-500 drop-shadow-2xl" />
                )}
              </button>

              <button className="flex" onClick={playNextTrack}>
                <ForwardIcon className="h-10 w-10 text-orange-500" />
              </button>

            </div>
            <audio ref={audioRef} src={currentTrack.preview_url || ''} />
          </div>
        </>
      ) : (
        <p>No track selected</p>
      )}
    </>
  );
};

export default MusicPreview;
