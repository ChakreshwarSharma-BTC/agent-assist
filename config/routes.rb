Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'registrations'
  }

  devise_scope :user do
    root 'devise/sessions#new'
  end

  scope 'agent' do
    get '/' => 'agent#dashboard', as: 'agent_dashboard' 
  end

  resources :policies do
    resources :nominees
  end
  resources :companies
  resources :plans
  resources :customer, only: [:index, :new, :create]
end