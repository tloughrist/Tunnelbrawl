import React from "react";
import BlankBoard from '../Board/blankboard.js';
import NewGameButtons from '../GameControls/newgamebtns.js';

export default function NewGame({ games, setGames, setSelectedGame }) {

  return (
    <div>
      <div>
        <NewGameButtons  games={games} setGames={setGames} setSelectedGame={setSelectedGame} />
      </div>
      <div>
        <BlankBoard />
      </div>
    </div> 
  );
};