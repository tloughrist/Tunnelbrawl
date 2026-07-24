require "test_helper"

class CleanupJobTest < ActiveJob::TestCase
  setup do
    @host = users(:one)
  end

  test "destroys a game that is still pending" do
    game = Game.create!(host: @host, status: "pending", no_players: 2)
    CleanupJob.perform_now(game.id)
    assert_nil Game.find_by(id: game.id), "expected the pending game to be destroyed"
  end

  test "keeps a game that has already started" do
    game = Game.create!(host: @host, status: "active", no_players: 2)
    CleanupJob.perform_now(game.id)
    assert Game.exists?(game.id), "expected a started game to be left alone"
  end

  test "is a no-op when the game no longer exists" do
    assert_nothing_raised { CleanupJob.perform_now(-1) }
  end
end
