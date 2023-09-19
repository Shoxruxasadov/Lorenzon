import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Player() {
  const music = useSelector((state) => state.utilityReducer.currentMusic);
  const pouse = useSelector((state) => state.utilityReducer.pouse);

  const [song, setSong] = useState(null);
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => setSong(music && music.song), [music]);
  useEffect(() => setPlay(pouse), [pouse]);

  return (
    <footer onClick={() => dispatch({ type: "SET_POUSE", payload: !play })}>
      {play && (
        <audio autoPlay>
          <source src={song} type="audio/mpeg" />
        </audio>
      )}
      <div id="line" />

      <div className="content">
        <div className="song">
          <img src={music.image} alt="" />
          <div className="title">
            <h3>{music.name}</h3>
            <p>{music.artist}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 26 25"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.82371 9.123C3.22571 13.485 8.76471 17.012 10.2367 17.885C11.7137 17.003 17.2927 13.437 18.6497 9.127C19.5407 6.341 18.7137 2.812 15.4277 1.753C13.8357 1.242 11.9787 1.553 10.6967 2.545C10.4287 2.751 10.0567 2.755 9.78671 2.551C8.42871 1.53 6.65471 1.231 5.03771 1.753C1.75671 2.811 0.932712 6.34 1.82371 9.123ZM10.2377 19.501C10.1137 19.501 9.99071 19.471 9.87871 19.41C9.56571 19.239 2.19271 15.175 0.395713 9.581C0.394712 9.581 0.394712 9.58 0.394712 9.58C-0.733288 6.058 0.522713 1.632 4.57771 0.324996C6.48171 -0.291004 8.55671 -0.020004 10.2347 1.039C11.8607 0.010996 14.0207 -0.273004 15.8867 0.324996C19.9457 1.634 21.2057 6.059 20.0787 9.58C18.3397 15.11 10.9127 19.235 10.5977 19.408C10.4857 19.47 10.3617 19.501 10.2377 19.501Z"
              fill="#F3F3F3"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.1537 7.6249C15.7667 7.6249 15.4387 7.3279 15.4067 6.9359C15.3407 6.1139 14.7907 5.4199 14.0077 5.1669C13.6127 5.0389 13.3967 4.6159 13.5237 4.2229C13.6527 3.8289 14.0717 3.6149 14.4677 3.7389C15.8307 4.1799 16.7857 5.3869 16.9027 6.8139C16.9357 7.2269 16.6287 7.5889 16.2157 7.6219C16.1947 7.6239 16.1747 7.6249 16.1537 7.6249Z"
              fill="#F3F3F3"
            />
          </svg>
        </div>
        <div className="controller">
          
        </div>
        <div className="value"></div>
      </div>
    </footer>
  );
}
