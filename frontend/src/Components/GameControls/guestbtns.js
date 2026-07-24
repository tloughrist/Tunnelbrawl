import React, {useContext} from "react";
import {leaveGame} from "./buttonfunctions.js";
import { UserContext } from '../../App.js';

export default function GuestButtons({ game, setGames, setSelectedGame }) {

  const user = useContext(UserContext);

  const player = game.players.find((player) => player.user_id === user.id);

  async function handleClick() {
    if (!player) return;
    const gamesPkg = await leaveGame(player.id);
    if (!gamesPkg) return;
    setGames(gamesPkg);
    setSelectedGame("none");
  };

  return (
    <div>
      {
        game.status === "pending" ?
          <button onClick={handleClick}>Leave Game</button>
        : <></>
      }
        </div>
  );
};