class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :pic_url, :current_game
end