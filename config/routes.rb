Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'registrations',
    passwords: 'passwords'
  }

  devise_scope :user do
    root 'devise/sessions#new'
  end

  get '/dashboard' => 'agent#dashboard', as: 'agent_dashboard'  

  resources :policies do
    resources :nominees
    collection do
      get 'customers' => 'policies#customers'
      get 'categories' => 'policies#categories'
      get 'customer_list' => 'policies#customer_list'
      get 'companies' =>  'policies#companies'
      get 'plans' => 'policies#plans'
      get 'filter_policies' => 'policies#filter_policies', as: 'filter'
      get 'update_notification' => 'policies#update_notification'
      get 'policy_number' => 'policies#policy_number'
    end
  end

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
    collection do
      get 'existing_member/members' => 'customers#existing_member'
      get 'existing_member/family_members' => 'customers#family_members'
      get 'existing_member/member' => 'customers#member'
      get 'filter_customers' => 'customers#filter_customers', as: 'filter'
      get 'check_email' => 'customers#check_email'
    end
  end

  get :policy_reminder, to: 'policies#policy_reminder'
end