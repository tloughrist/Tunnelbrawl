class GamesController < SuperController

  before_action :authorize

  def create
    game = Game.create(game_params)
    board = game.make_board
    Player.create(user_id: game.host_id, game_id: game.id, color: "red", status: "active", queening: 0)
    if game.valid?
      CleanupJob.set(wait: 2.minutes).perform_later(game.id)
      package = game.package
      render json: package, status: :created
    else
      render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def get_public
    self.get_public_games
  end

  def update
    game = Game.find(params[:id])
    if game.players.map{|player| player.user_id.to_i}.include?(session[:user_id])
      game.update(game_params)
      if game.valid?
        package = game.package 
        render json: package, status: :accepted
      else
        render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
      end
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def initialize_game
    game = Game.find(params[:game_id])
    if game.host.id.to_i == session[:user_id]
      board = game.board
      no_players = game.players.size
      game.update({no_players: no_players})
      if no_players > 1
        board.begin_game(game.no_players)
        game.update(game_params)
        game.update({status: "in progress"})
        game.players.each {|player| player.update({queening: false, status: "active"})}
        package = game.package
        ActionCable.server.broadcast("game#{game.id}", package)
        render json: package, status: :accepted
      else
        render json: { errors: "Games require 2-4 players." }, status: :unprocessable_entity
      end
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def destroy
    game = Game.find(params[:id])
    if game.host.id.to_i == session[:user_id]
      game.destroy
      user = User.find(session[:user_id])
      games = user.games
      gamePkgs = games.map{|game| game.package}
      game_users = User.where(current_game: params[:id])
      game_users.each{|user| user.update({current_game: "none"})}
      return render json: gamePkgs, status: :accepted
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def game_params
    params.permit(:host_id, :title, :no_players, :turn, :round, :phase, :status, :email_notifications, :public)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end