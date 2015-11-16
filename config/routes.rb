Rails.application.routes.draw do
  resources :collections, only: [:index, :show, :new, :create]
  root to: 'static_pages#root'
end
