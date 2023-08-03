import { MusicTrackPropsWithSelect } from "../../types/types";
import React from "react";
import NextImage from 'next/image';
import { formatDuration } from '../../utils/timerConverter';
import { PlayIcon } from '@heroicons/react/24/solid';

const MusicTrack: React.FC<MusicTrackPropsWithSelect> = ({ playlist, onSelect }) => {
  const { tracks } = playlist;

  return (
    <div>
      {tracks.items.map((item, index) => (
        <div onClick={() => onSelect(item.track)}
          key={item.track.id}
          className="flex bg-zinc-50 justify-between pr-5 py-2 rounded-3xl my-4 mr-7 ml-16 items-center drop-shadow-xl cursor-pointer"
        >
          <div className="flex items-center ml-[-35px]">
            <NextImage
              className="rounded-3xl mr-8"
              src={item.track.album.images[0].url}
              width={84}
              height={84}
              alt='album photo'
            />
            <div className="flex flex-col">
              <span className="text-base font-semibold text-textColor">{item.track.name}</span>
              <span className="text-sm font-normal text-secondaryColor ">{item.track.album.artists[0].name}</span>
            </div>
          </div>
          <span className="bg-zinc-50 w-20 h-11 rounded-2xl drop-shadow-2xl flex items-center justify-center text-textColor"><PlayIcon className="h-5 pr-1"/>{formatDuration(item.track.duration_ms)}</span>
        </div>
      ))}
    </div>
  )
}

export default MusicTrack;
