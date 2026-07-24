class CleanupJob < ApplicationJob
  queue_as :default

  # Destroys a game if it is still pending (never started) when this runs.
  def perform(game_id)
    game = Game.find_by(id: game_id)
    return unless game

    game.destroy if game.status == "pending"
  end
end
