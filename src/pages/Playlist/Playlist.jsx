import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import Header from "../../components/HEADER/Header";
import { GoDotFill } from "react-icons/go";
import PlayListCardMusic from "../../components/CARD/PlayListCard";
import { addArray } from "../../store/LikeSlice";
import { FaSearch } from "react-icons/fa";
import { FiDownloadCloud } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { FaCirclePlay } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { FaAngleDown } from "react-icons/fa";
import "./Playlist.css";

const Playlist = () => {
  const { id, token } = useParams();
  const [playlistData, setPlaylistData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedTracks = response.data.tracks.items.map((item) => ({
          ...item,
          isLiked: false,
        }));
        setPlaylistData({ ...response.data, tracks: { items: updatedTracks } });
      })
      .catch((error) => console.error("Error fetching playlist data:", error));
  }, [id, token]);

  const handleLike = (track) => {
    dispatch(addArray(track));
  };

  return (
    <section
      id="playlist"
      className="text-white h-screen overflow-y-auto bg-gray-900"
    >
      <Header />
      <main className="px-10 py-6">
        <div className="flex flex-wrap md:flex-nowrap gap-6 mb-8">
          <img
            className="w-72 h-72 rounded-lg shadow-lg object-cover"
            src={
              playlistData?.images?.[0]?.url ||
              "https://placehold.co/297x297?text=No+Image"
            }
            alt="Playlist cover"
          />
          <div className="flex-1">
            <p className="uppercase text-sm font-medium tracking-wider">
              Public Playlist
            </p>
            <h1 className="text-5xl font-bold mt-2">{playlistData?.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              {playlistData?.tracks?.items.slice(0, 2).map((item, index) => (
                <span key={index} className="text-white">
                  {item?.track?.artists[0]?.name || "Unknown Artist"}
                  {index < 1 && ","}
                </span>
              ))}
              <p>and more</p>
            </div>
            <div className="flex items-center text-gray-400 mt-2">
              Made for
              <span className="text-white font-medium ml-1">
                {playlistData?.owner?.display_name}
              </span>
              <GoDotFill className="mx-2 text-gray-500" />
              <span>
                {playlistData?.tracks?.items?.length}{" "}
                {playlistData?.tracks?.items?.length > 1 ? "songs" : "song"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <FaCirclePlay className="w-3/4 h-3/4 hover:scale-105 rounded-full bg-black text-green-600 cursor-pointer border-none transition" />
            <FaRegHeart className="w-10 h-10 cursor-pointer hover:scale-105 transition-transform" />
            <FiDownloadCloud className="w-10 h-10 cursor-pointer hover:scale-105 transition-transform" />
            <SlOptions className="w-10 h-10 cursor-pointer hover:scale-105 transition-transform" />
          </div>
          <div className="flex items-center gap-4">
            <FaSearch className="w-8 h-8 cursor-pointer" />
            <div className="flex items-center gap-2">
              <p className="ml-5">Custom Order</p>
              <FaAngleDown />
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-12 gap-4 border-b border-gray-600 pb-2 text-sm text-gray-400 uppercase">
            <div className="flex gap-4 items-center col-span-5">
              <p className="min-w-[24px]">#</p>
              <p>Title</p>
            </div>
            <p className="col-span-4">Album</p>
            <LuClock3 className="w-6 h-6" />
          </div>

          <div className="flex flex-col mt-4">
            {playlistData?.tracks?.items?.map((track, index) => (
              <PlayListCardMusic
                key={track.track.id}
                track={track}
                index={index}
                onLike={() => handleLike(track)}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Playlist;
