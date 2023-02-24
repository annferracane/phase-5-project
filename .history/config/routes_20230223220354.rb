Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :contractor_specialties, only: [ :create, :destroy ]
  resources :contractor_profiles, only: [ :create, :update ]
  resources :job_labor_categories, only: [ :create, :destroy ]
  resources :jobs, only: [ :index, :create, :show, :update, :destroy ] do
    resources :job_comments, only: [ :index, :create, :destroy ]
  end
  resources :labor_categories, only: [ :index ]
  resources :properties, only: [ :index, :create, :show, :update ]
  resources :profiles, only: [ :create, :update ]
  resources :users, only: [ :create, :show ] do
    resources :properties, only: [ :index, :create, :show, :update ]
  end
  
  # Defines the root path route ("/")
  # root "articles#index"

  # fallback route
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

  # Add auth routes here
  post '/login', to: 'sessions#create'
  get '/authorized_user', to: 'users#show'
  delete '/logout', to:'sessions#destroy'

  # route to test your configuration
  get '/hello', to: 'application#hello_world'

end
