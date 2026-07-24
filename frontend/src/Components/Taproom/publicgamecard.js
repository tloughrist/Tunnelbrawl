import React, { useContext } from "react";
import joinGame from "../Fetching/joingame.js";
import { UserContext } from '../../App.js';

function PublicGameCard({ game, setPublicGames }) {

  const user = useContext(UserContext);

  async function handleClick() {
    const publicGames = await joinGame(game.id, user.id);
    setPublicGames(publicGames);
  };

  return (
    <div className="game_card">
      <p><b>{game.title}</b></p>
      <p><b>Players:</b></p>
      {game.players.map((player) => <p>{player}</p>)}
      <button onClick={(e) => handleClick()}>Join</button>
    </div>
  );
};

export default PublicGameCard;