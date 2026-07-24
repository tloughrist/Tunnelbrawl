class SuperController < ApplicationController

  def get_public_games
    games = Game.where(status: "pending")
    vacancy_games = games.where("no_players < ?", 4)
    current_user = User.find(params[:user_id])
    no_user_vacancy_games = vacancy_games.select {|game| !game.users.include?(current_user)}
    game_pkgs = no_user_vacancy_games.map do |game|
      players = game.players.map {|player| player.user[:username]}
      host = game.host[:username]
      {**game.attributes, players: players, host: host}
    end
    render json: game_pkgs, status: :ok
  end

end