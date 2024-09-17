import React, { useContext } from "react";
import SpotifyWebPlayback from "react-spotify-web-playback";
import { Context } from "../../context/Context";

const Playback = ({ accessToken }) => {
  const { playing, play, setPlaying } = useContext(Context);

  const handleStateChange = (state) => {
    if (!state.isPlaying) {
      setPlaying(false);
    }
  };

  return (
    <SpotifyWebPlayback
      play={playing}
      token={accessToken}
      uris={play ? [play] : []}
      callback={handleStateChange}
    />
  );
};

export default Playback;
