import React from "react";
import Hand from './hand.js';
import Board from './board.js';
import Status from './status.js';

export default function PlayingField() {

  return (
      <div id="playing_field">
        <div className="hand_div">
          <Hand />
        </div>
        <div className="board_div">
          <Board />
        </div>
        <div className="status_div">
          <Status />
        </div>
      </div>
  );
};