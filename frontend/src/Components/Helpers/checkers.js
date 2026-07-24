export function isHand(spaceId, color) {
  switch(color) {
    case "red":
      return spaceId > 100 && spaceId < 105;
    case "blue":
      return spaceId > 200 && spaceId < 205;
    case "green":
      return spaceId > 300 && spaceId < 305;
    case "yellow":
      return spaceId > 400 && spaceId < 405;
    default:
      return false;
  }
};

export function isCamp(spaceId, color) {
  switch(color) {
    case "red":
      return spaceId < 100 && spaceId % 10 === 1;
    case "blue":
      return spaceId < 100 && spaceId % 10 === 6;
    case "green":
      return spaceId > 11 && spaceId < 16;
    case "yellow":
      return spaceId > 61 && spaceId < 66;
    default:
      return false;
  }
};

export function isBoard(spaceId) {
  return spaceId > 11 && spaceId < 66
};

export function isDeck(spaceId, color) {
  switch(color) {
    case "red":
      return spaceId > 110 && spaceId < 119;
    case "blue":
      return spaceId > 210 && spaceId < 219;
    case "green":
      return spaceId > 310 && spaceId < 319;
    case "yellow":
      return spaceId > 410 && spaceId < 419;
    default:
      return false;
  }
};

export function handSpaces(color) {
  switch(color) {
    case "red":
      return [101, 102, 103, 104];
    case "blue":
      return [201, 202, 203, 204];
    case "green":
      return [301, 302, 303, 304];
    case "yellow":
      return [401, 402, 403, 404];
    default:
      return false;
  }
};

export function campSpaces(color) {
  switch(color) {
    case "red":
      return [21, 31, 41, 51];
    case "blue":
      return [26, 36, 46, 56];
    case "green":
      return [12, 13, 14, 15];
    case "yellow":
      return [62, 63, 64, 65];
    default:
      return false;
  }
};

export function deckSpaces(color) {
  switch(color) {
    case "red":
      return [111, 112, 113, 114, 115, 116, 117, 118];
    case "blue":
      return [211, 212, 213, 214, 215, 216, 217, 218];
    case "green":
      return [311, 312, 313, 314, 315, 316, 317, 318];
    case "yellow":
      return [411, 412, 413, 414, 415, 416, 417, 418];
    default:
      return false;
  }
};

export function isLocked(game, board) {
  const color = game.turn;
  const boardSpaces = board.filter(({loc}) => isBoard(loc));
  const hasPiece = boardSpaces.filter(({contents}) => contents.color === color);
  const campSpaces = board.filter(({loc}) => isCamp(loc));
  const hasRoom = campSpaces.filter(({contents}) => contents.type === "empty");
  if (hasPiece.length > 0 || hasRoom > 0) {
    return false;
  } else {
    return true;
  }
};