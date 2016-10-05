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
    collection do
      get 'find_policy_list'
      get 'category' =>  'policies#category_fields'
      get 'customer_list' => 'policies#customer_list'
    end  
    # get 'policies/start_date_sorting'
  end

  resources :nominees
  resources :companies
  resources :plans
  resources :customers, only: [:index, :new, :create]
  get :policy_reminder, to: 'policies#policy_reminder'
end