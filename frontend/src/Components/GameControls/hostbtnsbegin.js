import React, {useContext} from "react";
import {startGame, cancelGame} from "./buttonfunctions.js";
import { UserContext } from '../../App.js';
import { GameContext } from '../Games/game.js';

export default function HostButtonsBegin({ games, setGames, setSelectedGame }) {

  const user = useContext(UserContext);
  const game = useContext(GameContext);

  async function handleStart() {
    const gamePkg = await startGame(game.id);
    const gamesSans = games.filter((pkg) => pkg.game.id !== gamePkg.game.id);
    const newGames = [...gamesSans, gamePkg];
    setGames(newGames);
  };

  async function handleCancel() {
    const gamePkgs = await cancelGame(game.id);
    setSelectedGame("none");
    setGames(gamePkgs);
  };

  return (
    <div>
      <button onClick={handleStart}>Start Game</button>
      <button onClick={handleCancel}>Cancel Game</button>
    </div>
  );
};