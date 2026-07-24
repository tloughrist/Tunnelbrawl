import React from "react";
import dayjs from 'dayjs';

export default function GameOptions({ game }) {

  return (
    <option value={game.id}>
      {game.title} created by {game.host} on {dayjs(game.created_at.substring(0,7)).format("MM/DD/YY")}
    </option>
  );
};