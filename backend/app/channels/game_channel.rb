class GameChannel < ApplicationCable::Channel

  def subscribed
    game = Game.find_by(id: params[:id])
    return reject unless game

    stream_from "game#{game.id}"
    ActionCable.server.broadcast("game#{game.id}", game.package)
  end

end