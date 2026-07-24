class FriendshipsController < ApplicationController

  before_action :authorize
  
  def create
    friendship = Friendship.create(friendship_params)
    if friendship.valid?
      render json: friendship, status: :created
    else
      render json: { errors: friendship.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    friendship = Friendship.find(params[:id])
    if [friendship.friendee_id.to_i, friendship.friender_id.to_i].include?(session[:user_id])
      friendship.update(friendship_params)
      if friendship.valid?
        render json: friendship, status: :accepted
      else
        render json: { errors: friendship.errors.full_messages }, status: :unprocessable_entity
      end
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def destroy
    friendship = Friendship.find(params[:id])
    if [friendship.friendee_id.to_i, friendship.friender_id.to_i].include?(session[:user_id])
      friendship.destroy
      head :no_content
    else
      return render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def friendship_params
    params.permit(:friender_id, :friendee_id, :status)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end