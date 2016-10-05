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
      get 'company' =>  'policies#company_fields'
      get 'plan' => 'policies#plan_fields'
      get 'search' => 'policies#search'
    end
  end

  resources :nominees
  resources :companies
  resources :plans

  resources :customers do
    member do
      get 'family_member/new' => 'customers#new_member', as: 'new_family_member'
      post 'family_member/create' => 'customers#create_member', as: 'create_family_member'
      get 'family_member/:member_id/edit' => 'customers#edit_member', as: 'edit_family_member'
      patch 'family_member/update/:member_id' => 'customers#update_member', as: 'update_family_member'
      get 'family_member/show/:member_id' => 'customers#show_member', as: 'show_family_member'
      delete 'family_member/destroy/:member_id' => 'customers#destroy_member', as: 'destroy_family_member'
    end
  end

  get :policy_reminder, to: 'policies#policy_reminder'
end