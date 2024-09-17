import React from "react";
import { useSelector } from "react-redux";
import "./Likes.css";
import Header from "../../components/HEADER/Header";
import Likes from "../../assets/images/likes.png";
import Like from "../../assets/images/like.png";
import { GoDotFill } from "react-icons/go";
import PlayListCardMusic from "../../components/CARD/PlayListCard";
import { FaSearch } from "react-icons/fa";
import { FiDownloadCloud } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { FaCirclePlay } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { FaAngleDown } from "react-icons/fa";

function LikedList() {
  const likedArray = useSelector((state) => state.likedArray);

  const getSongLabel = (count) => (count > 1 ? "songs" : "song");

  return (
    <section id="liked" className="w-full text-white h-screen overflow-y-auto">
      <Header />
      <main className="px-10">
        <div className="mt-7 flex items-end gap-8">
          <img src={Likes} width={297} height={297} alt="Liked Songs" />
          <div className="flex flex-col text-white">
            <p className="uppercase font-medium text-base leading-[20.24px] tracking-[-2%]">
              public <br /> playlist
            </p>
            <h1 className="text-6xl leading-[154.33px] tracking-[-6%] font-extrabold">
              Liked Songs
            </h1>
            <div className="flex items-center gap-2">
              <img src={Like} alt="Owner" />
              <p className="font-bold text-lg">Clairo</p>
              <GoDotFill />
              <p className="text-gray-400">
                {likedArray.length} {getSongLabel(likedArray.length)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-4">
            <FaCirclePlay className="w-3/4 h-3/4 hover:scale-105 rounded-full bg-black text-green-600 cursor-pointer transition" />
            <FaRegHeart className="w-10 h-10 hover:scale-105 transition-transform" />
            <FiDownloadCloud className="w-10 h-10 hover:scale-105 transition-transform" />
            <SlOptions className="w-10 h-10 hover:scale-105 transition-transform" />
          </div>
          <div className="flex items-center gap-4">
            <FaSearch className="w-8 h-8" />
            <div className="flex items-center gap-2">
              <p className="ml-5">Custom Order</p>
              <FaAngleDown />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-12 gap-4 border-b border-gray-600 pb-2 text-sm text-gray-400 uppercase">
            <div className="flex gap-4 items-center col-span-5">
              <p className="min-w-[24px]">#</p>
              <p>Title</p>
            </div>
            <p className="col-span-4">Album</p>
            <LuClock3 className="w-6 h-6" />
          </div>

          <div className="flex flex-col mt-4">
            {likedArray.length > 0 ? (
              likedArray.map((track, index) => (
                <PlayListCardMusic
                  track={track}
                  index={index}
                  key={track.track.id}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center mt-4">
                No liked songs available
              </p>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}

export default LikedList;
