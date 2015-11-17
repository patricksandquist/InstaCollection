Rails.application.routes.draw do
  resources :collections, only: [:index, :show, :new, :create]
  get '/oath/connect', to: 'oath#create'
  get '/oath/callback', to: 'oath#index'
  root to: 'static_pages#root'
end
