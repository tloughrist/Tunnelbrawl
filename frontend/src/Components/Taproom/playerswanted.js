import React, { useState, useContext, useEffect } from "react";
import fetchPublic from "../Fetching/fetchpublic.js";
import PublicGameCard from "./publicgamecard.js";
import { UserContext } from '../../App.js';

function PlayersWanted() {

  const user = useContext(UserContext);
  const [publicGames, setPublicGames] = useState([]);

  useEffect(() => {
    async function publicGamesProvider() {
      const gamePkgs = await fetchPublic(user.id);
      setPublicGames(gamePkgs);
    }
    if (user.id) {
      publicGamesProvider();
    }
  }, [user]);

  return (
    <div className="text_block">
        {
          publicGames.length > 0 ?
            <div className="card_container" id="public_games">
              {publicGames.map((game) =>
                <PublicGameCard
                  key={`game${game.id}`}
                  game={game}
                  setPublicGames={setPublicGames}
                />
              )}
            </div>
          : <div>       
              <p>No games available at this time.</p>
            </div>
        }
    </div>
  );
};

export default PlayersWanted;