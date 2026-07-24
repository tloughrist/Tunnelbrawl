import React from "react";
import Piece from '../Board/pieces.js';

function pieceConvert(string, setterBundle) {
  switch(string){
    case "rp":
      return {color: "red", type: "pawn", img: <Piece type={"red pawn"} src={"/pieces/red_pawn.png"} alt={"red pawn"} title={"Red Pawn"} setterBundle={setterBundle} />, acro: "rp" }
    case "gp":
      return {color: "green", type: "pawn", img: <Piece type={"green pawn"} src={"/pieces/green_pawn.png"} alt={"green pawn"} title={"Green Pawn"} setterBundle={setterBundle} />, acro: "gp" }
    case "bp":
      return {color: "blue", type: "pawn", img: <Piece type={"blue pawn"} src={"/pieces/blue_pawn.png"} alt={"blue pawn"} title={"Blue Pawn"} setterBundle={setterBundle} />, acro: "bp" }
    case "yp":
      return {color: "yellow", type: "pawn", img: <Piece type={"yellow pawn"} src={"/pieces/yellow_pawn.png"} alt={"yellow pawn"} title={"Yellow Pawn"} setterBundle={setterBundle} />, acro: "yp",highlight: "highlight--none"}
    case "rr":
      return {color: "red", type: "rook", img: <Piece type={"red rook"} src={"/pieces/red_rook.png"} alt={"red rook"} title={"Red Rook"} setterBundle={setterBundle} />, acro: "rr" }
    case "gr":
      return {color: "green", type: "rook", img: <Piece type={"green rook"} src={"/pieces/green_rook.png"} alt={"green rook"} title={"Green Rook"} setterBundle={setterBundle} />, acro: "gr" }
    case "br":
      return {color: "blue", type: "rook", img: <Piece type={"blue rook"} src={"/pieces/blue_rook.png"} alt={"blue rook"} title={"Blue Rook"} setterBundle={setterBundle} />, acro: "br" }
    case "yr":
      return {color: "yellow", type: "rook", img: <Piece type={"yellow rook"} src={"/pieces/yellow_rook.png"} alt={"yellow rook"} title={"Yellow Rook"} setterBundle={setterBundle} />, acro: "yr" }
    case "rn":
      return {color: "red", type: "knight", img: <Piece type={"red knight"} src={"/pieces/red_knight.png"} alt={"red knight"} title={"Red Knight"} setterBundle={setterBundle} />, acro: "rn" }
    case "gn":
      return {color: "green", type: "knight", img: <Piece type={"green knight"} src={"/pieces/green_knight.png"} alt={"green knight"} title={"Green Knight"} setterBundle={setterBundle} />, acro: "gn" }
    case "bn":
      return {color: "blue", type: "knight", img: <Piece type={"blue knight"} src={"/pieces/blue_knight.png"} alt={"blue knight"} title={"Blue Knight"} setterBundle={setterBundle} />, acro: "bn" }
    case "yn":
      return {color: "yellow", type: "knight", img: <Piece type={"yellow knight"} src={"/pieces/yellow_knight.png"} alt={"yellow knight"} title={"Yellow Knight"} setterBundle={setterBundle} />, acro: "yn" }
    case "rb":
      return {color: "red", type: "bishop", img: <Piece type={"red bishop"} src={"/pieces/red_bishop.png"} alt={"red bishop"} title={"Red Bishop"} setterBundle={setterBundle} />, acro: "rb" }
    case "gb":
      return {color: "green", type: "bishop", img: <Piece type={"green bishop"} src={"/pieces/green_bishop.png"} alt={"green bishop"} title={"Green Bishop"} setterBundle={setterBundle} />, acro: "gb" }
    case "bb":
      return {color: "blue", type: "bishop", img: <Piece type={"blue bishop"} src={"/pieces/blue_bishop.png"} alt={"blue bishop"} title={"Blue Bishop"} setterBundle={setterBundle} />, acro: "bb" }
    case "yb":
      return {color: "yellow", type: "bishop", img: <Piece type={"yellow bishop"} src={"/pieces/yellow_bishop.png"} alt={"yellow bishop"} title={"Yellow Bishop"} setterBundle={setterBundle} />, acro: "yb" }
    case "rq":
      return {color: "red", type: "queen", img: <Piece type={"red queen"} src={"/pieces/red_queen.png"} alt={"red queen"} title={"Red Queen"} setterBundle={setterBundle} />, acro: "rq" }
    case "gq":
      return {color: "green", type: "queen", img: <Piece type={"green queen"} src={"/pieces/green_queen.png"} alt={"green queen"} title={"Green Queen"} setterBundle={setterBundle} />, acro: "gq" }
    case "bq":
      return {color: "blue", type: "queen", img: <Piece type={"blue queen"} src={"/pieces/blue_queen.png"} alt={"blue queen"} title={"Blue Queen"} setterBundle={setterBundle} />, acro: "bq" }
    case "yq":
      return {color: "yellow", type: "queen", img: <Piece type={"yellow queen"} src={"/pieces/yellow_queen.png"} alt={"yellow queen"} title={"Yellow Queen"} setterBundle={setterBundle} />, acro: "yq" }
    case "rk":
      return {color: "red", type: "king", img: <Piece type={"red king"} src={"/pieces/red_king.png"} alt={"red king"} title={"Red King"} setterBundle={setterBundle} />, acro: "rk" }
    case "gk":
      return {color: "green", type: "king", img: <Piece type={"green king"} src={"/pieces/green_king.png"} alt={"green king"} title={"Green King"} setterBundle={setterBundle} />, acro: "gk" }
    case "bk":
      return {color: "blue", type: "king", img: <Piece type={"blue king"} src={"/pieces/blue_king.png"} alt={"blue king"} title={"Blue King"} setterBundle={setterBundle} />, acro: "bk" }
    case "yk":
      return {color: "yellow", type: "king", img: <Piece type={"yellow king"} src={"/pieces/yellow_king.png"} alt={"yellow king"} title={"Yellow King"} setterBundle={setterBundle} />, acro: "yk" }
    case "xx":
      return {color: "block", type: "block", img: <Piece type={"block"} src={"/tunnel_walls.png"} alt={"blocked tunnel mouth"} title={"Blocked Tunnel Mouth"}setterBundle={setterBundle} />, acro: "xx"};
    default:
      return {color: "empty", type: "empty", img: <Piece type={"empty"} setterBundle={setterBundle} />, acro: "em"};
  }
};

export function convert(boardObj, setterBundle) {
  const convertedBoard = [];
  Object.keys(boardObj).forEach((key) => {
    if (key.includes('loc')) {
      const numLoc = key.substring(3);
      const spaceObj = {loc: parseInt(numLoc), contents: {...pieceConvert(boardObj[key].substring(0,2), setterBundle), status: boardObj[key].charAt(3), highlight: boardObj[key].substring(5)}};
      convertedBoard.push(spaceObj);
    }
  });
  return convertedBoard;
};

export function unconvert(board) {
  const unconvertedBoard = {};
  const spaceObjs = board.filter((obj) => Object.keys(obj).includes('loc'));
  const nonSpaceObjs = board.filter((obj) => !Object.keys(obj).includes('loc'));
  spaceObjs.forEach((obj) => {
    const key = `loc${obj["loc"]}`;
    const contents = obj["contents"];
    const newValue = `${contents["acro"]}_${contents["status"]}_${contents["highlight"]}`;
    unconvertedBoard[key] = newValue;
  });
  nonSpaceObjs.forEach((obj) => {
    const key = Object.keys(obj)[0];
    const contents = obj[Object.keys(obj)[0]];
    unconvertedBoard[key] = contents;
  })
  return unconvertedBoard;
};