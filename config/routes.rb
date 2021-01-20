Rails.application.routes.draw do
  # resources :votes
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # resources :polls, only: [:new, :create, :index, :show]

  get "/api/v1/polls", to: "polls#index"
  post "/api/v1/polls", to: "polls#create"
  get "/api/v1/polls/new", to: "polls#new"
  get "/api/v1/polls/:id", to: "polls#show"

  post "/api/v1/votes", to: "votes#create"


  resource :session, only: [:new, :create, :destroy]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
