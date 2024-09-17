import React, { useState, useEffect, useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addArray } from "../../store/LikeSlice";
import { useDispatch } from "react-redux";
import { Context } from "../../context/Context";

function PlayListCard({ index, track }) {
  const [like, setLike] = useState(
    JSON.parse(window.localStorage.getItem(`likeState-${track?.track?.id}`)) ||
      false
  );
  const dispatch = useDispatch();
  const { setPlay, setPlaying } = useContext(Context);

  const handleLike = () => {
    const newLikeState = true;
    setLike(newLikeState);
    dispatch(addArray(track));
  };

  useEffect(() => {
    window.localStorage.setItem(
      `likeState-${track?.track?.id}`,
      JSON.stringify(like)
    );
  }, [like, track]);

  return (
    <div
      onClick={() => {
        setPlaying(true);
        setPlay(track?.track?.uri);
      }}
      key={index}
      className="grid grid-cols-12 gap-4 items-center hover:bg-emerald-800 p-2 rounded-lg"
    >
      <div className="flex items-center gap-4 col-span-5">
        <p className="text-gray-400">{index + 1}</p>
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-md"
            src={
              track?.track?.album?.images[0]?.url ||
              "https://placehold.co/40x40?text=No+Image"
            }
            alt="Album cover"
          />
          <div>
            <p className="line-clamp-1">{track?.track?.name}</p>
            <p className="text-xs text-gray-400 line-clamp-1">
              {track?.track?.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <p className="line-clamp-2 col-span-4 text-primary-5">
        {track?.track?.album?.name}
      </p>
      <div className="flex items-center">
        <p onClick={handleLike}>
          {like ? (
            <button className="text-green-500 mr-2">
              <FaHeart />
            </button>
          ) : (
            <button className="mr-2">
              <FaRegHeart />
            </button>
          )}
        </p>
        <p>
          {!track.isLiked ? new Date(track?.added_at).toLocaleDateString() : ""}
        </p>
      </div>
    </div>
  );
}

export default PlayListCard;
