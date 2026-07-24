class PlayersController < SuperController

  before_action :authorize

  def create
    game = Game.find(params[:game_id])

    # You may only add yourself, only to a joinable (pending, not-full) game you
    # aren't already in. Colour comes from whatever is still unused.
    return render json: { error: "You can only join as yourself." }, status: :forbidden unless params[:user_id].to_i == session[:user_id]
    return render json: { errors: ["This game can no longer be joined."] }, status: :unprocessable_entity unless game.status == "pending"
    return render json: { errors: ["You are already in this game."] }, status: :unprocessable_entity if game.players.exists?(user_id: session[:user_id])
    return render json: { errors: ["This game is full."] }, status: :unprocessable_entity if game.players.count >= 4

    color = (%w[red blue green yellow] - game.players.pluck(:color)).first
    player = Player.create(user_id: session[:user_id], game_id: game.id, color: color, queening: 0, status: "active")
    if player.valid?
      # Keep no_players in sync with the actual roster (turn logic relies on it),
      # record which game the joining user is now in, and let anyone already
      # watching the game (e.g. the host) see the new player in real time.
      game.update(no_players: game.players.count)
      User.find(session[:user_id]).update(current_game: game.id)
      ActionCable.server.broadcast("game#{game.id}", game.package)
      self.get_public_games
    else
      render json: { errors: player.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    player = Player.find(params[:id])
    if player.user[:id].to_i == session[:user_id]
      player.update(player_params)
      if player.valid?
        render json: player, status: :accepted
      else
        render json: { errors: player.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def destroy
    player = Player.find(params[:id])
    user = player.user
    if user[:id].to_i == session[:user_id]
      game = player.game
      user.update(current_game: "none")
      player.destroy
      # Notify anyone still in/watching the game that this player left.
      if game.persisted?
        game.update(no_players: game.players.count)
        ActionCable.server.broadcast("game#{game.id}", game.package)
      end
      render json: user.games.map {|g| g.package}, status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def player_params
    params.permit(:user_id, :game_id, :status, :color, :queening)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end