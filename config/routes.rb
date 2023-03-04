Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :contractor_specialties, only: [ :create, :destroy ]
  resources :contractor_profiles, only: [ :create, :update ] do
    resources :jobs, only: [ :index ]
  end
  resources :job_labor_categories, only: [ :create, :destroy ]
  resources :jobs, only: [ :index, :show, :destroy, :update ] do
    resources :job_comments, only: [ :index, :create, :destroy ] # may modify to only create or destroy with nested user
  end
  resources :labor_categories, only: [ :index ]
  resources :properties, only: [ :create, :update, :show ] do
    resources :jobs, only: [ :create, :index ]
  end
  resources :profiles, only: [ :create, :update ]
  resources :users, only: [ :create, :show ] do
    resources :profiles, only: [ :index ]
    resources :contractor_profiles, only: [ :index ]
    resources :properties, only: [ :index ]
    resources :jobs, only: [ :index ]
    resources :job_comments, only: [ :destroy ] # may modify to only create or destroy with nested user
  end
  
  # labor category look up
  get '/labor-category-lookup/:labor_category', to: 'labor_categories#labor_category_lookup'
  delete '/delete-labor-categories/:job_id', to: 'labor_categories#delete_labor_categories'

  # fallback route
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
  
  get '/sample-jobs', to: 'jobs#sample_job_index'

  # Profile routes
  post '/profile', to: 'profiles#create'
  patch '/profile', to: 'profiles#update'
  # get '/users/:user_id/profile', to: 'profiles#show'

  # Contractor Profile routes
  post '/contractor-profile', to: 'contractor_profiles#create'
  patch '/contractor-profile', to: 'contractor_profiles#update'
  # get '/users/:user_id/contractor-profile', to: 'contractor_profiles#show'

   # Add auth routes here
  post '/login', to: 'sessions#create'
  get '/authorized_user', to: 'users#show'
  delete '/logout', to:'sessions#destroy'

end
