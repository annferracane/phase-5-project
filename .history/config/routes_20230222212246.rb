Rails.application.routes.draw do
  resources :contractor_specialties, only: [ :create, :destroy ]
  resources :contractor_profiles, only: [ :index, :create, :update ]
  resources :job_comments, only: []
  resources :job_labor_categories, only: [ :create, :destroy ]
  resources :jobs, only: [ :index, :create, :show, :update, :destroy ]
  resources :labor_categories, only: [ :index ]
  resources :properties, only: [ :index, :create, :show, :update ]
  resources :profiles, only: [ :create, :update ]
  resources :users, only: [ :create, :show ]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # route to test your configuration
  get '/hello', to: 'application#hello_world'

  # fallback route
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
