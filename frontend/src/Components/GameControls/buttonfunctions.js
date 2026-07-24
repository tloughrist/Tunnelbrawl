import initialize from '../Fetching/initializegame.js';
import cancel from '../Fetching/cancelgame.js';
import leave from '../Fetching/leavegame.js';

export async function startGame(gameId) {
  const pkg = await initialize(gameId, {status: "active"});
  return pkg;
};

export async function cancelGame(gameId) {
  const pkg = await cancel(gameId);
  return pkg;
};

export async function leaveGame(gameId, userId) {
  const pkg = await leave(gameId, userId);
  return pkg;
};

export async function restartGame(gameId) {
  const pkg = await initialize(gameId, {turn: "red", phase: "move", round: 1});
  return pkg;
};