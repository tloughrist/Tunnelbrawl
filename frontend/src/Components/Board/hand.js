import React, { useContext } from "react";
import Space from './space.js';
import { handSpaces } from '../Helpers/checkers.js';
import { ColorContext } from '../Games/game.js';

export default function Hand({ setBoard }) {

  const color = useContext(ColorContext);

  return (
    <div>
      <div className="column" id="hand">
        <Space color={`space--${color}`} id={handSpaces(color)[0]} setBoard={setBoard} />
        <Space color={`space--${color}`} id={handSpaces(color)[1]} setBoard={setBoard} />
        <Space color={`space--${color}`} id={handSpaces(color)[2]} setBoard={setBoard} />
        <Space color={`space--${color}`} id={handSpaces(color)[3]} setBoard={setBoard} />
      </div>
    </div>
  );
};