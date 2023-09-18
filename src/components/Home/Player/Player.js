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
    </footer>
  );
}
