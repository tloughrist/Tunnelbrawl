games = Game.create!([
  { host_id: 1, title: "Game 1", no_players: 4, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 1, title: "Game 2", no_players: 4, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 1, title: "Game 3", no_players: 4, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 2, title: "Game 4", no_players: 4, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 2, title: "Game 5", no_players: 4, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 2, title: "Game 6", no_players: 4, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 3, title: "Game 7", no_players: 3, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 3, title: "Game 8", no_players: 3, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 4, title: "Game 9", no_players: 2, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 4, title: "Game 10", no_players: 2, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 4, title: "Game 11", no_players: 2, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 4, title: "Game 12", no_players: 2, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 1, title: "Game 13", no_players: 2, turn: "red", round: 1, phase: "move", status: "pending" },
  { host_id: 1, title: "Game 14", no_players: 3, turn: "red", round: 1, phase: "move", status: "pending" }
]);

boards = games.map {|game| game.make_board };