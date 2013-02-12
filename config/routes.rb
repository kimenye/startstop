Startstop::Application.routes.draw do
  root :to => "home#index"

  match 'games/:id/participants' => 'games#add_participants', :via => [:post]
  resources :players
  resources :games
end
