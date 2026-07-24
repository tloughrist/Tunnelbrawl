class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :status, :color
end