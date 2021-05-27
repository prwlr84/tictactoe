Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :games do
    resources :moves, only: :create
  end
  get '*path', to: 'pages#home'
end
