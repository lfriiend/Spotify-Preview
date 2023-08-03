import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { getPlaylist } from '../utils/spotifyAuth';
import { SpotifyPlaylist, Track } from '../types/types';
import MusicTrack from '../components/MusicTrack/MusicTrack';
import MusicPreview from '../components/MusicPreview/MusicPreview';

const Home: NextPage = () => {
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const playlistData = await getPlaylist();
        setPlaylist(playlistData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (<>
      <Head>
        <title>AudioPlayer Preview</title>
        <meta name="description" content="An audio player preview from spotify API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className="h-screen flex items-center justify-center bg-zinc-200">
      <div className="w-[46rem] h-[28rem] bg-zinc-100 shadow-lg overflow-y-auto no-scrollbar rounded-borderLarge">
        <div className="bg-zinc-50 h-20 flex items-center justify-start pl-8 rounded-t-tborderLarge">
          <h1 className="text-xl font-bold text-textColor">{playlist?.name || 'Loading...'}</h1>
        </div>
        {playlist ? (
          <MusicTrack playlist={playlist} onSelect={setSelectedTrack} /> // Passa setSelectedTrack como prop
        ) : (
          <p>Loading</p>
        )}
      </div>

      <div className="w-72 h-[28rem] ml-8 bg-zinc-100 rounded-3xl shadow-lg flex-col items-center flex">
        {playlist ? (
          <MusicPreview playlist={playlist} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} /> // Passa setSelectedTrack como prop
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  </>);
};

export default Home;
