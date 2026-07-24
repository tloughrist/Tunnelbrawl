class BoardsController < ApplicationController

  before_action :authorize

  def show_moves
    board = Board.find(params[:board_id])
    game = board.game
    players = game.players
    if players.map{|player| player.user_id.to_i}.include?(session[:user_id])
      board.show_legal(params[:active_piece])
      package = game.package
      ActionCable.server.broadcast("game#{game.id}", package)
      render json: package, status: :accepted
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def clear_highlights
    board = Board.find(params[:board_id])
    game = board.game
    players = game.players
    if players.map{|player| player.user_id.to_i}.include?(session[:user_id])
      board.clear
      package = game.package
      ActionCable.server.broadcast("game#{game.id}", package)
      render json: package, status: :accepted
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def move_piece
    board = Board.find(params[:board_id])
    game = board.game
    players = game.players
    if players.map{|player| player.user_id.to_i}.include?(session[:user_id])
      legal = board.move_piece(params[:start_loc], params[:end_loc], session[:user_id])
      if legal
        new_game = Board.find(params[:board_id]).game
        board.fill_camp
        # Don't rotate turns on a game that a capture just ended.
        new_game.advance unless new_game.status == "complete"
        package = new_game.package
        ActionCable.server.broadcast("game#{game.id}", package)
        render json: package, status: :accepted
      else
        return render json: { error: "Illegal move." }, status: :not_acceptable
      end
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
