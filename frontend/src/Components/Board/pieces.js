import React, { useContext } from 'react';
import swal from 'sweetalert';
import { BoardContext, BoardIdContext, ActivePieceContext, GameContext, ColorContext } from '../Games/game.js';
import { GamesContext } from '../Games/games.js';
import movepiece from '../Fetching/movepiece.js';
import showmove from '../Fetching/showmove.js';
import clearhighlights from '../Fetching/clearhighlights.js';

export default function Piece({type, src, alt, setterBundle}) {

  const games = useContext(GamesContext);
  const board = useContext(BoardContext);
  const boardId = useContext(BoardIdContext);
  const activePiece = useContext(ActivePieceContext);
  const game = useContext(GameContext);
  const color = useContext(ColorContext);
  const setActivePiece = setterBundle.setActivePiece;
  const setGames = setterBundle.setGames;

  async function handleClick(e) {
    if (game.turn === color) {
      const spaceId = parseInt(e.target.parentElement.parentElement.id);
      const spaceItself = board.find(({loc}) => loc === spaceId);
      await clear();
      if (spaceItself.contents.highlight === "highlight--move" || spaceItself.contents.highlight === "highlight--capture") {
        const res = await movepiece(boardId, activePiece, spaceId);
        if (res.ok) {
          const gamePkg = await res.json();
          const gamesSans = games.filter(game => game.game.id !== gamePkg.game.id);
          setGames([...gamesSans, gamePkg]);
        } else if (res.statusText === "Not Acceptable") {
          swal("Illegal move")
        }
        return;
      } else if (spaceItself.contents.type === "empty") {
        return;
      } else {
        setActivePiece(parseInt(e.target.parentElement.parentElement.id))
        const res = await showmove(boardId, spaceId);
        const gamePkg = await res.json();
        const gamesSans = games.filter(game => game.game.id !== gamePkg.game.id);
        setGames([...gamesSans, gamePkg]);
      }
    } else {
      swal("Sorry, it's not your turn.");
    }
  };

  async function clear() {
    const res = await clearhighlights(boardId)
    const gamePkg = await res.json();
    const gamesSans = games.filter(game => game.game.id !== gamePkg.game.id);
    setGames([...gamesSans, gamePkg])
  };

  return (
    <div className={"piece"}>
      {
        type === "empty" ?
          <div className={type} onClick={(e) => handleClick(e)} />
        : <img className={type} src={src} alt={alt} onClick={(e) => handleClick(e)} />
      }
    </div>
  );
};