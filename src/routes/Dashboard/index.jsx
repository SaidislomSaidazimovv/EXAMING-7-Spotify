import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { Home, Like, Playlist, Search } from "../../pages";
import Navbar from "../../components/NAVBAR/Navbar";
import RightSideBar from "../../components/SIDEBAR/RightSideBar";
import {CLIENT_ID} from "../../hook/useEnv"
import { useAuth } from "../../hook/useAuth";

function DashboardRoutes({ code }) {
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });
  const accessToken = useAuth(code);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  return (
    <div className="grid grid-cols-12">
      <Navbar />
      <div className="col-span-8 h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home accessToken={accessToken} />} />
          <Route path="/search" element={<Search accessToken={accessToken}/>}/>
          <Route path="/liked-songs" element={<Like />} />
          <Route path="/playlist/:id/:token" element={<Playlist />} />
        </Routes>
      </div>
      <RightSideBar />
    </div>
  );
}

export default DashboardRoutes;
