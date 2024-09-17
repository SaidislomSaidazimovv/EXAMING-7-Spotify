import React, { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../hook/useEnv";
import useDebounce from "../../hook/useDebounce";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

function Search({ accessToken }) {
  const { setPlay, setPlaying } = useContext(Context);
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [artists, setArtists] = useState([]);
  const searchTextDebounce = useDebounce(searchText, 1000);
  const navigate = useNavigate();

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTextDebounce && accessToken) {
          const playlistRes = await spotifyApi.searchPlaylists(
            searchTextDebounce
          );
          const trackRes = await spotifyApi.searchTracks(searchTextDebounce);
          const artistRes = await spotifyApi.searchArtists(searchTextDebounce);

          setPlaylist(playlistRes.body.playlists.items);
          setTracks(trackRes.body.tracks.items);
          setArtists(artistRes.body.artists.items);
        } else {
          setPlaylist([]);
          setTracks([]);
          setArtists([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [searchTextDebounce, accessToken]);

  return (
    <section id="search" className="min-h-screen bg-gray-900 text-white p-5">
      <main className="max-w-7xl mx-auto">
        <div className="relative flex items-center bg-gray-800 rounded-full p-4 mb-8">
          <FaSearch className="text-gray-500 w-6 h-6 ml-3" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="w-full bg-transparent text-lg outline-none pl-4 pr-4 text-white"
            placeholder="Search for playlists, tracks, or artists..."
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Playlists</h2>
          {playlist.length > 0 ? (
            <div
              onClick={() =>
                navigate(`/playlist/${playlist[0]?.id}/${accessToken}`)
              }
              className="cursor-pointer bg-gray-800 p-5 rounded-xl flex items-center space-x-4 hover:bg-gray-700 transition"
            >
              <img
                src={playlist[0]?.images[0]?.url}
                alt="Playlist"
                className="w-32 h-32 rounded-md"
              />
              <div>
                <p className="text-xl font-semibold">{playlist[0]?.name}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {playlist[0]?.description || "No description available"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No Playlists Found</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tracks</h2>
          {tracks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    setPlay(track.uri);
                    setPlaying(true);
                  }}
                  className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 hover:bg-gray-700 transition cursor-pointer"
                >
                  <img
                    src={
                      track.album.images[0]?.url ||
                      "https://placehold.co/64x64?text=No+Image"
                    }
                    alt="Album cover"
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <p className="text-lg font-medium">{track.name}</p>
                    <p className="text-sm text-gray-400">
                      {track.artists[0]?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No Tracks Found</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Artists</h2>
          <div className="flex overflow-x-auto space-x-6 py-2">
            {artists.length > 0 ? (
              artists.map((artist) => (
                <div
                  key={artist.id}
                  className="min-w-[150px] bg-gray-800 p-4 rounded-lg flex flex-col items-center hover:bg-gray-700 transition cursor-pointer"
                >
                  <img
                    src={
                      artist.images[0]?.url ||
                      "https://placehold.co/150x150?text=No+Image"
                    }
                    alt="Artist"
                    className="w-24 h-24 rounded-full"
                  />
                  <p className="mt-3 text-center font-medium text-lg">
                    {artist.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No Artists Found</p>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}

export default Search;
