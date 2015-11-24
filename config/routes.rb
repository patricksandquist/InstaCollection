Rails.application.routes.draw do
  resources :collections, only: [:show, :create], :defaults => { :format => 'json' }
  resources :submissions, only: [:index, :create], :defaults => { :format => 'json' }
  root to: 'static_pages#root'
end
