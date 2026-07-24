class User < ApplicationRecord

  has_secure_password
  
  has_many :owner_games, class_name: 'Game', foreign_key: 'host_id', dependent: :destroy
  has_many :players, foreign_key: 'user_id', dependent: :destroy
  has_many :games, through: :players, dependent: :destroy
  has_many :sender_messages, class_name: 'Message', foreign_key: 'sender_id', dependent: :destroy
  has_many :receiver_messages, class_name: 'Message', foreign_key: 'receiver_id', dependent: :destroy
  has_many :friender_friendships, class_name: 'Friendship', foreign_key: 'friender_id', dependent: :destroy
  has_many :friendee_friendships, class_name: 'Friendship', foreign_key:  'friendee_id', dependent: :destroy
  has_many :frienders, class_name: 'User', through: :friendee_friendships
  has_many :friendees, class_name: 'User', through: :friender_friendships

  validates :username, uniqueness: true
  validates :username, length: { minimum: 5 }, allow_blank: true
  validates :email, presence: true
  validates :password, length: { minimum: 8 }, allow_blank: true

  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def friends()
    friendees = self.friendees
    frienders = self.frienders
    friends = friendees + frienders
  end

end