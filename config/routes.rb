Rails.application.routes.draw do
  get 'policies/index'

  get 'policies/new'

  get 'policies/show'

  get 'policies/edit'

  resources :policies do
    collection do
      get 'type_of_categories' => 'policies#type_of_categories', as: 'type_of_categories'
    end
  end
  
  devise_for :users, controllers: {
    registrations: 'registrations'
  }

  devise_scope :user do
    root 'devise/sessions#new'
  end

  scope 'agent' do
    get '/' => 'agent#dashboard', as: 'agent_dashboard' 
  end

  resources :customer do
    collection do
      get 'new_member' => 'customer#new_family_member', as: 'new_family_member'
    end
  end
  resources :nominees
  resources :companies
end