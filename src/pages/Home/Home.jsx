import React, { useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../hook/useEnv";
import Header from "../../components/HEADER/Header";
import Music from "../../components/MUSIC/Music";
import CardMUsic from "../../components/CARD/CardMusic";
import Playback from "../../components/PLAYBACK/Playback";
import "./Home.css";

const spotifyApi = new SpotifyWebApi({ clientId: CLIENT_ID });

function Home({ accessToken }) {
  const [topMixes, setTopMixes] = useState([]);
  const [madeForYou, setMadeForYou] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [jumpBack, setJumpBack] = useState([]);
  const [uniquelyYours, setUniquelyYours] = useState([]);

  const [showCount, setShowCount] = useState({
    TOPMIXES: 4,
    MADEFORYOU: 4,
    RECENTLYPLAYED: 4,
    JUMPBACK: 4,
    UNIQUELYYOURS: 4,
  });

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    const fetchData = async () => {
      try {
        const [
          TOPMIXESres,
          MADEFORYOUres,
          RECENTLYPLAYEDres,
          JUMPBACKres,
          UNIQUELYYOURSres,
        ] = await Promise.all([
          axios.get(
            "https://api.spotify.com/v1/browse/categories/toplists/playlists",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          ),
          axios.get(
            "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          ),
          axios.get(
            "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          ),
          axios.get(
            "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          ),
          axios.get(
            "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          ),
        ]);

        setTopMixes(TOPMIXESres.data.playlists.items);
        setMadeForYou(MADEFORYOUres.data.playlists.items);
        setRecentlyPlayed(RECENTLYPLAYEDres.data.playlists.items);
        setJumpBack(JUMPBACKres.data.playlists.items);
        setUniquelyYours(UNIQUELYYOURSres.data.playlists.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleSeeAllClick = (category) => {
    setShowCount((prevCount) => ({
      ...prevCount,
      [category]:
        prevCount[category] === 4
          ? category === "topMixes"
            ? topMixes.length
            : category === "madeForYou"
            ? madeForYou.length
            : category === "recentlyPlayed"
            ? recentlyPlayed.length
            : category === "jumpBack"
            ? jumpBack.length
            : uniquelyYours.length
          : 4,
    }));
  };

  const renderMusicCards = (category, data) =>
    data.length > 0 ? (
      data
        .slice(0, showCount[category])
        .map((mix, index) => (
          <CardMUsic mix={mix} accessToken={accessToken} key={index} />
        ))
    ) : (
      <div></div>
    );

  return (
    <section id="home" className="text-white h-screen overflow-y-auto">
      <Header />
      <div className="mt-[30px] px-[41px]">
        <h1 className="part-heading mb-[29px]">Good afternoon</h1>
        <div className="grid grid-cols-12 gap-[30px] w-full relative">
          {topMixes.length > 0 &&
            topMixes
              .slice(0, 6)
              .map((mix, index) => (
                <Music accessToken={accessToken} mix={mix} key={index} />
              ))}
        </div>
        {[
          "topMixes",
          "madeForYou",
          "recentlyPlayed",
          "jumpBack",
          "uniquelyYours",
        ].map((category, index) => (
          <div className="my-[50px]" key={index}>
            <div className="flex items-center justify-between">
              <h1 className="part-heading mb-[26px] capitalize">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h1>
              <p
                onClick={() => handleSeeAllClick(category)}
                className="uppercase hover:text-white text-base tracking-[8%] leading-[20.24px] font-bold text-primary-5 cursor-pointer"
              >
                see all
              </p>
            </div>
            <div className="grid grid-cols-12 relative gap-[31px]">
              {renderMusicCards(category, eval(category))}
            </div>
          </div>
        ))}
      </div>
      <Playback accessToken={accessToken} />
    </section>
  );
}

export default Home;
