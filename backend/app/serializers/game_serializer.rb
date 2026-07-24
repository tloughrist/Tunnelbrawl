class GameSerializer < ActiveModel::Serializer
  attributes :id, :host_id, :title, :no_players, :turn, :round, :phase, :status, :created_at, :updated_at
end