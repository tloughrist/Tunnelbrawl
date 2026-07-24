import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import joinGame from "../Fetching/joingame.js";
import { UserContext } from '../../App.js';

function PublicGameCard({ game, setPublicGames }) {

  const user = useContext(UserContext);
  const navigate = useNavigate();

  async function handleClick() {
    const publicGames = await joinGame(game.id, user.id);
    if (!publicGames) return;
    setPublicGames(publicGames);
    // You're now a player in this game — jump to the board (auto-selected) to wait for the host to start.
    navigate("/games", { state: { gameId: game.id } });
  };

  return (
    <div className="game_card">
      <p><b>{game.title || "Untitled Game"}</b></p>
      <p><b>Players:</b></p>
      {game.players.map((player, i) => <p key={i}>{player}</p>)}
      <button onClick={(e) => handleClick()}>Join</button>
    </div>
  );
};

export default PublicGameCard;