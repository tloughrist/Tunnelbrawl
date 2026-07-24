import React, { useState, useEffect, useContext, useRef, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createConsumer } from "@rails/actioncable";
import Game from './game.js';
import GameOptions from './gameoptions.js';
import NewGame from './newgame.js';
import fetchGames from '../Fetching/fetchgames.js';
import submitUser from '../Fetching/updateuser.js';
import { LoggedInContext, UserContext } from '../../App.js';
import { API_BASE } from '../../config.js';

export const GamesContext = createContext();

function Games({ }) {
  
  const isLoggedIn = useContext(LoggedInContext);
  const user = useContext(UserContext);
  const [games, _setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("none");
  const [gamePkg, _setGamePkg] = useState({});
  const [cable, setCable] = useState(() => createConsumer(`${API_BASE}/cable`));
  const [subscript, setSubscript] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const gamesRef = useRef(games);
  const gamePkgRef = useRef(gamePkg);

  function setGames(data) {
    gamesRef.current = data;
    _setGames(data);
  };

  function setGamePkg(data) {
    gamePkgRef.current = data;
    _setGamePkg(data);
  };

  function subscribe() {
    const sub = cable.subscriptions.create({
      channel: 'GameChannel',
      id: selectedGame
    }, {
      connected: () => {
        const identifier = JSON.parse(sub.identifier);
        console.log(`Connected to the channel: GameChannel ${identifier.id}`);
      },
      disconnected: () => {
        const identifier = JSON.parse(sub.identifier);
        console.log(`Disconnected from the channel: GameChannel ${identifier.id}`);
      },
      received: async (data) => {
        const identifier = JSON.parse(sub.identifier);
        console.log(`Receiving data from channel: GameChannel ${identifier.id}`);
        setGamePkg(data);
      }
    });
    setSubscript(sub);
    return sub;
  };

  useEffect(() => {
    async function gameProvider(userId) {
      const gamePkgs = await fetchGames(userId);
      setGames(gamePkgs);
    }
    if (Object.keys(user).length > 0) {
      gameProvider(user.id);
      // A game id passed via navigation (e.g. just joined from the Taproom) wins,
      // then the user's saved current_game, otherwise nothing selected.
      setSelectedGame(location.state?.gameId || user.current_game || "none");
    }
  }, [user]);

  useEffect(() => {
    function sendHome(logStatus) {
      if (logStatus === false) {
        navigate("/home");
      }
    }
    sendHome(isLoggedIn);
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Clear the previous game's board so it doesn't flash while the new
    // subscription's first payload is in flight.
    setGamePkg({});
    cable.subscriptions.remove(subscript);
    const sub = selectedGame !== "none" ? subscribe() : null;
    return () => {
      if (sub) {
        cable.subscriptions.remove(sub);
      }
    };
  }, [selectedGame]);

  useEffect(() => () => cable.disconnect(), []);

  async function handleSelect(value) {
    setSelectedGame(value);
    const updatedUser = await submitUser(user.id, {...user, current_game: value});
  };

  return (
    <div>
      <GamesContext.Provider value={gamesRef.current}>
        <div>
          <select
            onChange={(e) => handleSelect(e.target.value)}
            value={selectedGame}
          >
            <option value={"none"}>New Game</option>
            {
              gamesRef.current.length > 0 ?
              gamesRef.current.map((game) =>
                  <GameOptions
                    key={`game${game.game.id}`}
                    game={game.game}
                  />
                )
              : <option value={"none"}>No games available</option>
            }
          </select>
        </div>
        <div>
          {
            selectedGame !== "none" && Object.keys(gamePkgRef.current).length > 0 ?
              <Game
                gamePkg={gamePkgRef.current}
                setGamePkg={setGamePkg}
                setGames={setGames}
                selectedGame={selectedGame}
                setSelectedGame = {setSelectedGame}
              />
            : <NewGame
                games={gamesRef.current}
                setGames={setGames}
                setSelectedGame={setSelectedGame}
              />
          }
        </div>
      </GamesContext.Provider>
    </div>
  );
};

export default Games;