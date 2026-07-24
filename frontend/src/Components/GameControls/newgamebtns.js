import React, { useState, useContext, useRef, useEffect } from "react";
import swal from 'sweetalert';
import { UserContext } from '../../App.js';
import createGame from '../Fetching/creategame.js';

export default function NewGameBtns({ games, setGames, setSelectedGame }) {

  const user = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const containerRef = useRef(null);

  // Dismiss the popup (without creating a game) when the user clicks off of it.
  useEffect(() => {
    if (!showForm) return;
    function handleOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowForm(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showForm]);

  async function handleSubmit(e){
    e.preventDefault();
    const requested = title.trim();
    const gamePkg = await createGame(user.id, requested);
    if (!gamePkg) return;
    // The server appends a number if the title was already taken; let the user know.
    if (gamePkg.game.title !== requested) {
      swal("Title already taken", `"${requested}" was in use, so your game was named "${gamePkg.game.title}".`);
    }
    setShowForm(false);
    setTitle("");
    setGames([...games, gamePkg]);
    setSelectedGame(gamePkg.game.id);
  };

  return (
    <div className="new_game_container" ref={containerRef}>
      <button onClick={() => setShowForm((s) => !s)}>Create New Game</button>
      {showForm &&
        <div className="new_game_card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="new_game_title">Title</label>
            <input
              id="new_game_title"
              type="text"
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <input type="submit" value="Create" />
          </form>
        </div>
      }
    </div>
  );
};