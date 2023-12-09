Rails.application.routes.draw do
  
  resources :notes
  resources :doors
  resources :jobs
  resources :admins
  resources :admin_jobs
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  post "/login", to: "sessions#create"
  get "/me", to: "admins#show"
  delete "/logout", to: "sessions#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
