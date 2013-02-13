Startstop::Application.routes.draw do
  root :to => "home#index"

  match 'games/:id/participants' => 'games#add_participants', :via => [:post]
  match 'games/:id/invites' => 'games#handle_invitation', :via => [:post]
  resources :players
  resources :games
end
