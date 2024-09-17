import React, { createContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
  play: null,
  playing: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PLAY":
      return { ...state, play: action.payload };
    case "SET_PLAYING":
      return { ...state, playing: action.payload };
    default:
      return state;
  }
}

function MainContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPlay = (play) => {
    dispatch({ type: "SET_PLAY", payload: play });
  };

  const setPlaying = (playing) => {
    dispatch({ type: "SET_PLAYING", payload: playing });
  };

  return (
    <Context.Provider value={{ ...state, setPlay, setPlaying }}>
      {children}
    </Context.Provider>
  );
}

export default MainContext;
