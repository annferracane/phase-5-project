Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :contractor_specialties, only: [ :create, :destroy ]
  resources :contractor_profiles, only: [ :create, :update ]
  resources :job_labor_categories, only: [ :create, :destroy ]
  resources :jobs, only: [ :index, :show, :destroy ] do
    resources :job_comments, only: [ :index, :create, :destroy ] # may modify to only create or destroy with nested user
  end
  resources :labor_categories, only: [ :index ]
  resources :properties, only: [ :create, :update, :show ] do
    resources :jobs, only: [ :create, :update, :index ]
  end
  resources :profiles, only: [ :create, :update ]
  resources :users, only: [ :create, :show ] do
    resources :properties, only: [ :index ]
    resources :jobs, only: [ :index ]
  end
  
  # labor category look up
  get '/labor-category-lookup/:labor_category', to: 'labor_categories#labor_category_lookup'

  # fallback route
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

   # route to test your configuration
   get '/hello', to: 'application#hello_world'

   # Add auth routes here
  post '/login', to: 'sessions#create'
  get '/authorized_user', to: 'users#show'
  delete '/logout', to:'sessions#destroy'

end
