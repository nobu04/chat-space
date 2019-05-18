Rails.application.routes.draw do
  root 'groups#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:edit, :update, :create]
  resources :groups, only: [:new, :index, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end