Rails.application.routes.draw do
  resources :collections, only: [:show, :create], :defaults => { :format => 'json' }
  root to: 'static_pages#root'
end
