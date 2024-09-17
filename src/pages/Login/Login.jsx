import React from "react";
import { FaSpotify } from "react-icons/fa";
import { CLIENT_ID } from "../../hook/useEnv";

function Login() {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`;

  return (
    <div className="login bg-black h-screen flex flex-col items-center justify-center">
      <FaSpotify className="text-green-500 text-8xl mb-8 animate-bounce" />
      <h1 className="text-white text-4xl font-bold mb-6">Spotify Clone</h1>
      <a
        href={AUTH_URL}
        className="w-[280px] text-center py-3 flex items-center justify-center gap-3 rounded-full bg-green-600 hover:bg-green-700 hover:scale-110 transform transition duration-300 text-white font-semibold capitalize"
      >
        <FaSpotify className="text-2xl" />
        <p className="text-lg">Login to Spotify</p>
      </a>
    </div>
  );
}

export default Login;
