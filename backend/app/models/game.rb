class Game < ApplicationRecord

  belongs_to :host, class_name: 'User'
  has_one :board, dependent: :destroy
  has_many :players, dependent: :destroy
  has_many :users, through: :players

  validates :no_players, numericality: { less_than: 5 }, allow_blank: true

  def make_board
    game = self
    board = Board.create(game_id: game.id)
    board.empty
  end

  def package
    player_arr = self.players.map do |player|
      {id: player[:id], game_id: player[:game_id], user_id: player[:user_id], status: player[:status], color: player[:color], username: player.user[:username]}
    end
    {game: {**self.attributes, host: self.host[:username], players: player_arr}, board: self.board}
  end

  def advance
    turn = self[:turn]
    phase = self[:phase]
    round = self[:round]
    no_players = self[:no_players]
    if phase == "place"
      self[:phase] = "move"
      case no_players
      when 2
        case turn
        when "red"
          self.update({"turn" => "blue"})
          return
        else
          self.update({"turn" => "red"})
          self.update({"round" => round + 1})
        end
      when 3
        case turn
        when "red"
          self.update({"turn" => "green"})
        when "green"
          self.update({"turn" => "blue"})
        else
          self.update({"turn" => "red"})
          self.update({"round" => round + 1})
        end
      when 4
        case turn
        when "red"
          self.update({"turn" => "green"})
        when "green"
          self.update({"turn" => "blue"})
        when "blue"
          self.update({"turn" => "yellow"})
        else
          self.update({"turn" => "red"})
          self.update({"round" => round + 1})
        end
      end
      move_lock?(self[:turn]) ? self.advance : self
    else
      self.update({"phase" => "place"})
      self.board.queen_defect
      place_lock?(self[:turn]) ? self.advance : self
    end
  end

  def move_lock?(turn)
    board = self.board
    pieces = board.attributes.select {|k,v| (v.to_s[0] == turn[0]) && board.is_board?(k.to_s)}
    piece_locs = pieces.keys
    avail_moves = []
    piece_locs.each do |loc|
      legal_hsh = board.legal_moves(loc.to_s)
      legal_movement = *legal_hsh[:moves], *legal_hsh[:captures]
      avail_moves << legal_movement.size
    end
    !avail_moves.any?{|x| x > 0}
  end

  def place_lock?(turn)
    board = self.board
    camp = board.camp(turn)
    empties = camp.select {|k,v| v.to_s[0..1] == "em"}
    empties.size == 0
  end
  
end