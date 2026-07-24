class UsersController < ApplicationController

  before_action :authorize
  skip_before_action :authorize, only: [:create]

  def index
    # Don't leak every user's email to any logged-in account.
    render json: User.all.map {|u| { id: u.id, username: u.username, pic_url: u.pic_url }}, status: :ok
  end

  def create
    user = User.create(user_params)
    if user.valid?
      reset_session  # rotate the session id on privilege change (anti session-fixation)
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def self
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      reset_session
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def get_friends
    user = User.find(params[:user_id])
    # An empty friends list is a valid result, not a 404.
    render json: user.friends, status: :ok
  end

  def get_games
    user = User.find(params[:user_id])
    gamePackages = user.games.map { |game| game.package }
    render json: gamePackages, status: :ok
  end

  def update
    if params[:id].to_i == session[:user_id]
      user = User.find(params[:id])
      user.update(user_params)
      if user.valid?
        render json: user, status: :accepted
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def destroy
    if params[:id].to_i == session[:user_id]
      user = User.find(params[:id])
      user.destroy
      reset_session  # don't leave a cookie authorizing a now-deleted account
      head :no_content
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:username, :password, :email, :pic_url, :current_game)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end