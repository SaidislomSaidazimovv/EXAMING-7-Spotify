import React from "react";
import { NavLink } from "react-router-dom";
import {
  SongLike,
  CreatePlaylistIcon,
} from "../../assets/Icons/NecessaryIcons";
import { IoIosSearch } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { IoLibraryOutline } from "react-icons/io5";

function Navbar() {
  const navItems = [
    { to: "/", icon: <GoHome className="w-9 h-9" />, text: "Home" },
    {
      to: "/search",
      icon: <IoIosSearch className="w-9 h-9" />,
      text: "Search",
    },
    { to: "/liked-songs", icon: <SongLike />, text: "Liked Songs" },
  ];

  const nonNavItems = [
    { icon: <IoLibraryOutline className="w-9 h-8" />, text: "Your Library" },
    { icon: <CreatePlaylistIcon />, text: "Create Playlist" },
  ];

  return (
    <aside className="col-span-2 h-screen bg-black text-primary overflow-y-auto">
      <nav className="flex flex-col gap-5 px-[30px] pt-[70px]">
        {navItems.map(({ to, icon, text }) => (
          <NavLink
            key={to}
            to={to}
            className="flex items-center gap-5 hover:text-white"
          >
            {icon}
            <p className="nav-text">{text}</p>
          </NavLink>
        ))}
      </nav>
      <nav className="mt-[49px] flex flex-col gap-5 px-[30px]">
        {nonNavItems.map(({ icon, text }, index) => (
          <div key={index} className="flex items-center gap-5 hover:text-white">
            {icon}
            <p className="nav-text">{text}</p>
          </div>
        ))}
      </nav>
      <div className="ml-7 mt-7">
        <p className="mb-2 hover:text-white">Chill Mix</p>
        <p className="mb-2 hover:text-white">Insta Hits</p>
        <p className="mb-2 hover:text-white">Your Top Songs 2021</p>
        <p className="mb-2 hover:text-white">Mellow Songs</p>
        <p className="mb-2 hover:text-white">Anime Lofi & Chillhop Music</p>
        <p className="mb-2 hover:text-white">BG Afro “Select” Vibes</p>
        <p className="mb-2 hover:text-white">Afro “Select” Vibes</p>
        <p className="mb-2 hover:text-white">Happy Hits!</p>
        <p className="mb-2 hover:text-white">Deep Focus</p>
        <p className="mb-2 hover:text-white">Instrumental Study</p>
        <p className="mb-2 hover:text-white">OST Compilations</p>
        <p className="mb-2 hover:text-white">
          Nostalgia for old souled mill...
        </p>
        <p className="mb-5 hover:text-white">Mixed Feelings</p>
      </div>
    </aside>
  );
}

export default Navbar;
