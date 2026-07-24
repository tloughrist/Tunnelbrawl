class PlayersController < SuperController

  before_action :authorize

  def create
    game = Game.find(params[:game_id])
    last_color = game.players.last[:color]
    case last_color
      when "red"
        player = Player.create(user_id: params[:user_id], game_id: params[:game_id], color: "blue", queening: 0, status: "active")
      when "blue"
        player = Player.create(user_id: params[:user_id], game_id: params[:game_id], color: "green", queening: 0, status: "active")
      else
        player = Player.create(user_id: params[:user_id], game_id: params[:game_id], color: "yellow", queening: 0, status: "active")
      end
    if player.valid? && game.valid?
      self.get_public_games
    else
      render json: { errors: player.errors.full_players }, status: :unprocessable_entity
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
      user.update(current_game: "none")
      player.destroy
      games = user.games
      if games.size > 0
        gamePackages = games.map {|game| game.package}
        render json: gamePackages, status: :ok
      else
        render json: [], status: :ok
      end
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