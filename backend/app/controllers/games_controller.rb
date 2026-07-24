class GamesController < SuperController

  before_action :authorize

  def create
    game = Game.new(game_params)
    game.host_id = session[:user_id]  # never trust a client-supplied host
    if game.save
      # Only build the board + host player once the game itself persisted,
      # otherwise an invalid game leaves orphaned Board/Player rows.
      game.make_board
      Player.create(user_id: game.host_id, game_id: game.id, color: "red", status: "active", queening: 0)
      User.find(game.host_id).update(current_game: game.id)
      CleanupJob.set(wait: 2.minutes).perform_later(game.id)
      render json: game.package, status: :created
    else
      render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def get_public
    self.get_public_games
  end

  def initialize_game
    game = Game.find(params[:game_id])
    if game.host.id.to_i == session[:user_id]
      board = game.board
      no_players = game.players.size
      game.update({no_players: no_players})   # authoritative — from the actual roster
      if no_players > 1
        board.begin_game(no_players)
        # Only turn/phase/round are client-adjustable (used by "restart");
        # no_players/status/host are set by the server, never the client.
        game.update(initialize_params)
        game.update({status: "in progress"})
        game.players.each {|player| player.update({queening: 0, status: "active"})}
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
      # Notify anyone watching the game that it's gone, then tear it down.
      game.update(status: "cancelled")
      ActionCable.server.broadcast("game#{game.id}", game.package)
      User.where(current_game: params[:id]).each {|user| user.update({current_game: "none"})}
      game.destroy
      user = User.find(session[:user_id])
      gamePkgs = user.games.map {|g| g.package}
      return render json: gamePkgs, status: :accepted
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def game_params
    params.permit(:title, :no_players, :turn, :round, :phase, :status, :email_notifications, :public)
  end

  # "Restart" resets the turn cursor; the client may set only these.
  def initialize_params
    params.permit(:turn, :round, :phase)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end