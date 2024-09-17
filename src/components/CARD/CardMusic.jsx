import React from "react";
import { useNavigate } from "react-router-dom";

function CardMUsic({ mix, accessToken }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/playlist/${mix.id}/${accessToken}`)}
      className="col-span-3 bg-white/10 duration-300 px-[21px] pt-[20px] pb-[25px] hover:bg-slate-700"
    >
      <img src={mix.images[0].url} alt="" />
      <div>
        <h1 className="capitalize mt-[25px] line-clamp-1 text-[20px] font-bold leading-[25.3px]">
          {mix.name}
        </h1>
      </div>
    </div>
  );
}

export default CardMUsic;
