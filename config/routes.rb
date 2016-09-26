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

  scope 'customer' do
    get 'new_member' => 'customer#new_family_member', as: 'new_family_member'
    get 'remove_member' => 'customer#remove_family_member', as: 'remove_family_member'
  end
  
  resources :customer, only: [:index, :new, :create]
end