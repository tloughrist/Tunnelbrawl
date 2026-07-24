import React, { useContext } from 'react';
import { GameContext } from '../Games/game.js';

export default function Status() {

  const game = useContext(GameContext);

  function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='text_block'>
      <h3>Game Info</h3>
      <p><b>Title:</b> {game.title} </p>
      <p><b>Status:</b> {game.status} </p>
      <p><b>Round:</b> {game.round} </p>
      <p><b>Turn:</b> {capFirst(game.turn)} </p>
      <p><b>Phase:</b> {capFirst(game.phase)} </p>
      <p><b>Players:</b></p>
      <div>
        {game.players.map((player) =>
          <div key={`player${player.username}`}>
            <p>{player.color} - {player.username} - {player.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};