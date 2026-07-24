Rails.application.routes.draw do
  
  #logging and authentication routes
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  get "/me", to: "users#self"
  delete "/logout", to: "sessions#destroy"

  #standard routes
  resources :games, only: [:create, :destroy]
  resources :users, only: [:index, :update, :destroy]
  resources :players, only: [:create, :update, :destroy]
  #This is for future development:
  #resources :friendships, only: [:create, :update, :destroy]

  #custom routes
  get "users/:user_id/friends", to: "users#get_friends"
  get "users/:user_id/games", to: "users#get_games"
  get "users/self", to: "users#self" 
  put "boards/show_moves/:board_id", to: "boards#show_moves"
  put "boards/clear_highlights/:board_id", to: "boards#clear_highlights"
  put "boards/move_piece/:board_id", to: "boards#move_piece"
  get "games/public/:user_id", to: "games#get_public"
  put "games/initialize/:game_id", to: "games#initialize_game"

  #actioncable routing
  mount ActionCable.server => '/cable'

  # Health check endpoint for load balancers / uptime checks.
  get "up", to: "rails/health#show", as: :rails_health_check

end