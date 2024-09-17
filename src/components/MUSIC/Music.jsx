import React from "react";
import { useNavigate } from "react-router-dom";

function Music({ mix, accessToken }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/playlist/${mix.id}/${accessToken}`);
  };

  return (
    <div
      onClick={handleClick}
      className="col-span-6 w-full bg-white/10 hover:bg-slate-700 transition duration-300 flex items-center gap-5 cursor-pointer"
    >
      <img
        src={mix.images[0].url}
        alt={mix.name}
        width={82}
        className="object-cover"
      />
      <p className="capitalize text-lg leading-6 tracking-tight font-bold line-clamp-1">
        {mix.name}
      </p>
    </div>
  );
}

export default Music;
