Rails.application.routes.draw do
  
  get 'policies/index'

  get 'policies/edit'

  get 'policies/show'

  get 'policies/new'

  devise_for :users, controllers: {
    registrations: 'registrations'
  }

  devise_scope :user do
    root 'devise/sessions#new'
  end

  scope 'agent' do
    get '/' => 'agent#dashboard', as: 'agent_dashboard' 
  end
end