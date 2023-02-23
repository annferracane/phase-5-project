Rails.application.routes.draw do
  resources :contractor_specialties
  resources :contractor_profiles
  resources :job_comments
  resources :job_labor_categories
  resources :jobs
  resources :labor_categories
  resources :properties
  resources :profiles
  resources :users, only: [:create, :show, :destroy ]
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
