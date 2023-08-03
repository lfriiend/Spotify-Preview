import axios, { AxiosResponse } from 'axios';
import {SpotifyAuthResponse,SpotifyPlaylist} from '../types/types'
import dotenv from 'dotenv';

dotenv.config();

export async function getSpotifyAuthToken(): Promise<string> {
  const clientId = '73f620bcfda2470f958eb9b2c6beed43';
  const clientSecret = 'e66fd568e7cf4e5192d543acbf0b089d';


  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify client ID or client secret');
  }

  try {
    const authResponse: AxiosResponse<SpotifyAuthResponse> = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = authResponse.data.access_token;
    console.log('Access Token:', accessToken); 
    return accessToken;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error);
    throw new Error('Failed to fetch Spotify access token');
  }
}

export async function getPlaylist(): Promise<SpotifyPlaylist> {
  try {
    const accessToken = await getSpotifyAuthToken();
    console.log('Access Token in getPlaylist:', accessToken); 

    const playlistId = '7mQb7maOKWYxEbqhpECGr3';
    const response: AxiosResponse<any> = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const playlistData: SpotifyPlaylist = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      tracks: response.data.tracks,
      // Mapeie outras propriedades da resposta da API para a interface SpotifyPlaylist aqui, se necessário.
    };

    return playlistData;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw new Error('Failed to fetch playlist data');
  }
}
