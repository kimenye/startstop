Startstop::Application.routes.draw do
  root :to => "home#index"

  resources :players
end
