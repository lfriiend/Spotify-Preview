export interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  tracks: Tracks;
}

export interface MusicTrackProps {
  playlist: SpotifyPlaylist;
}

export interface Tracks {
  items: Item[];
}

export interface Item {
  track: Track;
}

export interface Track{
  id:  null | undefined;
  preview_url?: string
  album: Album;
  name: string;
  duration_ms: number;
}

export interface Album{
  images: Image2[];
  artists: Artist[];
}

export interface Image2 {
  height: number
  url: string
  width: number
}

export interface Artist {
  name: string;
}

export interface MusicTrackPropsWithSelect extends MusicTrackProps {
  onSelect: (track: Track) => void;
}

export interface MusicPreviewProps {
  playlist: SpotifyPlaylist;
  selectedTrack: Track | null;
  setSelectedTrack: (track: Track | null) => void;
}