import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import swal from 'sweetalert';
import HostButtonsMid from '../GameControls/hostbtnsmid.js';
import HostButtonsBegin from '../GameControls/hostbtnsbegin.js';
import GuestButtons from '../GameControls/guestbtns.js';
import PlayingField from '../Board/playingfield.js';
import { UserContext } from '../../App.js';
import { GamesContext } from './games.js';
import { convert } from '../Helpers/converters.js';

export const GameContext = createContext();
export const BoardContext = createContext();
export const ColorContext = createContext();
export const BoardIdContext = createContext();
export const ActivePieceContext = createContext();

export default function Game({ gamePkg, setGamePkg, setGames, setSelectedGame }) {
  
  const [boardId, setBoardId] = useState(gamePkg.board.id);
  const user = useContext(UserContext);
  const games = useContext(GamesContext);
  const setterBundle = {setGames: setGames, setActivePiece: setActivePiece};
  const [game, _setGame] = useState(gamePkg.game);
  const [board, _setBoard] = useState(convert(gamePkg.board, setterBundle));
  const [color, _setColor] = useState(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
  const [activePiece, _setActivePiece] = useState();
  const [moveAcknowledged, setMoveAcknowledged] = useState(false);
  const isHost = gamePkg.game.host_id === user.id;
  const gameRef = useRef(game);
  const boardRef = useRef(board);
  const colorRef = useRef(color);
  const activeRef = useRef(activePiece);

  function setGame(data) {
    _setGame(data);
    gameRef.current = data;
  };

  function setBoard(data) {
    _setBoard(data);
    boardRef.current = data;
  };

  function setColor(data) {
    _setColor(data);
    colorRef.current = data;
  };

  function setActivePiece(data) {
    _setActivePiece(data);
    activeRef.current = data;
  };

  function announceGameWinner() {
    const winner = gamePkg.game.players.find((player) => {
      return player.status === "winner";
    });
    return swal("Game Over", `${winner.username} Wins!`);
  };

  function announceMove() {
    if (game.round === 1) {
      return swal("It's your move.", "After your move, don't forget to place a new piece from your hand onto one of the four squares of your tunnel.");
    } else {
      return swal("It's your move.");
    }
  };

  useEffect(() => {
    if (Object.keys(gamePkg).length > 0) {
      setGame(gamePkg.game);
      setBoard(convert(gamePkg.board, setterBundle));
      setBoardId(gamePkg.board.id)
      setColor(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
      //Dev only
      //setColor(gamePkg.game.turn)
    }
  }, [gamePkg])

  useEffect(() => {
    if (gamePkg.game.status === "complete") {
      announceGameWinner();
    } else if (gamePkg.game.status === "canceled") {
      swal(`${gamePkg.game.title} canceled by ${gamePkg.game.host}.`);
      setSelectedGame("none");
      const gamePkgProxy = gamePkg;
      gamePkgProxy.game.status = "pending";
      setGamePkg(gamePkgProxy);
    }
  }, [gamePkg]);

  useEffect(() => {
    if (game.turn !== colorRef.current) {
      setMoveAcknowledged(false);
    }
    if (game.turn === colorRef.current && !moveAcknowledged  && game.status === "in progress") {
      announceMove()
      .then((value) => {
        if (value) {
          setMoveAcknowledged(true);
        }
      });
    }
  }, [game]);
  
  return (
    <GameContext.Provider value={gameRef.current}>
      <BoardContext.Provider value={boardRef.current}>
        <ColorContext.Provider value={colorRef.current}>
          <BoardIdContext.Provider value={boardId}>
            <ActivePieceContext.Provider value={activeRef.current}>
              <div>
                {
                  isHost ?
                    game.status === "pending" ?
                      <HostButtonsBegin
                        games={games}
                        setGames={setGames}
                        setSelectedGame={setSelectedGame}
                      />
                    : <HostButtonsMid
                        games={games}
                        setGames={setGames}
                        setSelectedGame={setSelectedGame}
                      />
                  : <GuestButtons
                      game={gameRef.current}
                      setGames={setGames}
                      setSelectedGame={setSelectedGame}
                    />
                }
                <PlayingField setterBundle={setterBundle} />
              </div>
            </ActivePieceContext.Provider>
          </BoardIdContext.Provider>
        </ColorContext.Provider>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
};